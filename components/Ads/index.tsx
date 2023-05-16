import {useEffect} from 'react';

export const ResponsiveAd = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{display: 'block'}}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
      data-ad-slot="3097820838"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
};

export const InArticleAd = () => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <ins className="adsbygoogle"
      style={{display: 'block', textAlign: 'center'}}
      data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
      data-ad-layout="in-article"
     data-ad-format="fluid"
     data-ad-slot="8472957514"></ins>
  );
};