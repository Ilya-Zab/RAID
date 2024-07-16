import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document()
{
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="https://wefinallyplayedit.plarium.com/" />
        {/* Facebook */}
        <meta property="og:title" content="wefinallyplayedit.plarium.com" />
        <meta property="og:description" content="https://wefinallyplayedit.plarium.com/" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="wefinallyplayedit.plarium.com" />
        <meta name="twitter:description" content="https://wefinallyplayedit.plarium.com/" />
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
