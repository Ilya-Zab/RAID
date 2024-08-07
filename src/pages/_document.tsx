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
          id="tiktok-pixel"
          strategy="beforeInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;
              var ttq=w[t]=w[t]||[];
              ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],
              ttq.setAndDefer=function(t,e){
                t[e]=function(){
                  t.push([e].concat(Array.prototype.slice.call(arguments,0)))
                }
              };
              for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
              ttq.instance=function(t){
                for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);
                return e
              },
              ttq.load=function(e,n){
                var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
                ttq._i=ttq._i||{},
                ttq._i[e]=[],
                ttq._i[e]._u=r,
                ttq._t=ttq._t||{},
                ttq._t[e]=+new Date,
                ttq._o=ttq._o||{},
                ttq._o[e]=n||{};
                n=document.createElement("script")
                n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;
                e=document.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(n,e)
              };
              ttq.load('CQOETRRC77U5M191F1P0');
              ttq.page();
            }(window, document, 'ttq');
            `}
        </Script>
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
