import { AppProps } from "next/app";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import usePageView from "../hooks/usePageView";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  usePageView();

  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
