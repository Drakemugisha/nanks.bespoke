import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({ title, description, keywords, ogImage, pathname }) => {
  const siteUrl = 'https://www.nanksbespoke.com'; 
  const defaultTitle = 'tailored suits kampala, nanks bespoke';
  const defaultDescription = 'Premium tailored suits and accessories for men and women in kampala and rest of uganda with over 10 years of experience. Custom tailoring and bespoke clothing made to measure.';
  const defaultKeywords = 'suits in kampala , tailored clothing, custom suits, men suits, women suits, accessories, Nanks Bespoke, kampala, Uganda, suits Uganda';
  const defaultImage = '/logo2.png'; 
  
  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    image: `${siteUrl}${ogImage || defaultImage}`,
    url: `${siteUrl}${pathname || ''}`
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seo.url} />
    </Helmet>
  );
};

export default SEO;