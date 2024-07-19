import axios from "axios";
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document()
{
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="wefinallyplayedit" />
        <meta property="og:image" content="/public/images/sharing-preview.jpg" />
        {/* Facebook */}
        <meta property="og:image" content="/public/images/sharing-preview.jpg" />
        <meta property="og:title" content="wefinallyplayedit" />
        <meta property="og:description" content="wefinallyplayedit" />
        {/* Twitter */}
        <meta name="twitter:image" content="/public/images/sharing-preview.jpg" />
        <meta name="twitter:title" content="wefinallyplayedit" />
        <meta name="twitter:description" content="wefinallyplayedit" />
        <Script
          id="google-tag-manager"
          src="https://www.googletagmanager.com/gtag/js?id=G-R0XBSWWZGF"
          strategy="afterInteractive"
        />
        <Script id="google-tag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R0XBSWWZGF');
          `}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
