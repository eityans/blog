import { AppProps } from "next/app";
import { GoogleAnalytics } from "../components/GoogleAnalytics";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
