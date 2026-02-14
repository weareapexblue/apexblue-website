import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <Html lang="en-US">
      <Head>
        {plausibleDomain ? (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        ) : null}
      </Head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to main content
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
