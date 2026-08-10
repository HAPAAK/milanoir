import "@/index.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";

const routeTitles: Record<string, string> = {
  "/": "Teej Dhamaka 2083 — Milanoir Events",
  "/about-us": "About Us | Milanoir Events",
  "/contact": "Contact | Milanoir Events",
  "/waitlist": "Waitlist | Milanoir Events",
  "/privacy-policy": "Privacy Policy | Milanoir Events",
  "/terms": "Terms & Conditions | Milanoir Events",
  "/404": "Page Not Found | Milanoir Events",
};

const DEFAULT_DESCRIPTION =
  "Teej Dhamaka 2083 — Samikshya Adhikari, Durgesh Thapa and Badri Pangeni live at The Royal Regency, London. Friday 11 September 2026.";

const routeDescriptions: Record<string, string> = {
  "/": DEFAULT_DESCRIPTION,
};

// TODO(Teej): replace with the Teej Dhamaka banner once the designer supplies it.
// This is the image that shows up when the site is shared on WhatsApp/Facebook.
const OG_IMAGE = "https://milanoir-events.com/og-teej-dhamaka-2083.png";

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const title = routeTitles[pathname] ?? "Milanoir Events";
  const description = routeDescriptions[pathname] ?? DEFAULT_DESCRIPTION;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph — WhatsApp, Facebook, LinkedIn share cards */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Milanoir Events" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={OG_IMAGE} />

        {/* Twitter/X share card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Head>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Component {...pageProps} />
        </TooltipProvider>
      </LanguageProvider>
    </>
  );
};

export default App;
