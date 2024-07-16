import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document()
{
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="wefinallyplayedit" />
        <meta property="og:image" content="/public/images/prev-sharing.png" />
        {/* Facebook */}
        <meta property="og:image" content="/public/images/prev-sharing.png" />
        <meta property="og:title" content="wefinallyplayedit" />
        <meta property="og:description" content="wefinallyplayedit" />
        {/* Twitter */}
        <meta name="twitter:image" content="/public/images/prev-sharing.png" />
        <meta name="twitter:title" content="wefinallyplayedit" />
        <meta name="twitter:description" content="wefinallyplayedit" />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-N3ZT2NVW');
          `}
        </Script>
      </Head>
      <body>
        <noscript>
          <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N3ZT2NVW"
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
