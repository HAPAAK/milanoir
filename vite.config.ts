import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import type { IncomingMessage, ServerResponse } from "node:http";
import contactHandler from "./api/contact";
import waitlistHandler from "./api/waitlist";

type ApiHandler = (
  req: { method?: string; body?: unknown },
  res: {
    status: (statusCode: number) => {
      json: (payload: unknown) => void;
    };
  },
) => Promise<unknown>;

const readRequestBody = async (req: IncomingMessage): Promise<string> =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

const runApiHandler = async (
  handler: ApiHandler,
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const body = await readRequestBody(req);
  let responseSent = false;

  await handler(
    { method: req.method, body },
    {
      status(statusCode: number) {
        res.statusCode = statusCode;
        return {
          json(payload: unknown) {
            if (responseSent || res.writableEnded) return;
            responseSent = true;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(payload));
          },
        };
      },
    },
  );

  if (!responseSent && !res.writableEnded) {
    res.statusCode = 204;
    res.end();
  }
};

const apiDevBridge = () => ({
  name: "api-dev-bridge",
  configureServer(server: {
    middlewares: { use: (fn: (req: IncomingMessage, res: ServerResponse, next: () => void) => void | Promise<void>) => void };
  }) {
    server.middlewares.use(async (req, res, next) => {
      const pathname = req.url?.split("?")[0];
      if (!pathname) return next();

      if (pathname === "/api/contact") {
        await runApiHandler(contactHandler, req, res);
        return;
      }

      if (pathname === "/api/waitlist") {
        await runApiHandler(waitlistHandler, req, res);
        return;
      }

      next();
    });
  },
  configurePreviewServer(server: {
    middlewares: { use: (fn: (req: IncomingMessage, res: ServerResponse, next: () => void) => void | Promise<void>) => void };
  }) {
    server.middlewares.use(async (req, res, next) => {
      const pathname = req.url?.split("?")[0];
      if (!pathname) return next();

      if (pathname === "/api/contact") {
        await runApiHandler(contactHandler, req, res);
        return;
      }

      if (pathname === "/api/waitlist") {
        await runApiHandler(waitlistHandler, req, res);
        return;
      }

      next();
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Ensure local API handlers can read non-VITE secrets from .env during dev/preview.
  const env = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [apiDevBridge(), react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
