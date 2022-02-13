import { AppProps } from "next/app";
import Head from "next/head";
import { existsGaId, GA_ID } from "../lib/gtag";
import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* Google Analytics */}
        {existsGaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
              }}
            />
          </>
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}
