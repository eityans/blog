import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import styles from "./layout.module.css";

const name = "eityansメモ";
export const siteTitle = "eityansメモ";
const profileImagePath = "/images/profile.jpg";
const profileImageUrl = `https://blog-eityans.vercel.app${profileImagePath}`;

export default function Layout({ children, home }: { children: React.ReactNode; home?: boolean }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="google-site-verification" content="IuZbbvDv3HyDnzHRsTBVjkUVBSo7d-lhNPwV9T4TyHk" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="I'm eityans who the representative of eityan" />
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
        <meta property="og:type" content="website" />
        <meta name="og:title" content={siteTitle} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:image" content={profileImageUrl} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="eityans" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src={profileImagePath}
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            {/* <Link href="/">
              <a>
                <Image
                  priority
                  src="/images/profile.jpg"
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2> */}
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
