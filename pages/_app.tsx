import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import { existsGaId, pageview } from "../lib/gtag";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (!existsGaId) {
      return;
    }

    const handleRouteChange = (path) => {
      pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
