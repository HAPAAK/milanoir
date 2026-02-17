import "@/index.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";

const routeTitles: Record<string, string> = {
  "/": "Milanoir Events",
  "/about-us": "About Us | Milanoir Events",
  "/contact": "Contact | Milanoir Events",
  "/waitlist": "Waitlist | Milanoir Events",
  "/privacy-policy": "Privacy Policy | Milanoir Events",
  "/terms": "Terms & Conditions | Milanoir Events",
  "/404": "Page Not Found | Milanoir Events",
};

const App = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const title = routeTitles[pathname] ?? "Milanoir Events";

  return (
    <>
      <Head>
        <title>{title}</title>
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
