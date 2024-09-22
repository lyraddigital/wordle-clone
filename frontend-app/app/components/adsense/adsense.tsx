import Script from "next/script";

type AdsenseProps = {
  pId?: string;
};

export default function Adsense({ pId }: AdsenseProps) {
  if (!pId) {
    return null;
  }

  return (
    <Script
      async
      src={`pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}