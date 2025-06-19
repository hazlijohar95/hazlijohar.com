
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

export const SEOHead: React.FC<SEOProps> = ({
  title = "HJC - Leading Chartered Accountants in Malaysia",
  description = "HJC is a premier chartered accountancy firm in Malaysia, providing expert financial services, tax consulting, and business advisory to help companies grow with clarity and confidence.",
  keywords = "chartered accountants malaysia, accounting services malaysia, tax consultancy, business advisory, financial services, bookkeeping, payroll services, company secretary, audit services, business registration malaysia",
  image = "/og-image-main.jpg",
  url = "https://hjc-malaysia.com",
  type = "website",
  author = "HJC Chartered Accountants",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  canonical
}) => {
  const fullTitle = title.includes('HJC') ? title : `${title} | HJC - Chartered Accountants Malaysia`;
  const fullUrl = url.startsWith('http') ? url : `https://hjc-malaysia.com${url}`;
  const fullImageUrl = image.startsWith('http') ? image : `https://hjc-malaysia.com${image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://hjc-malaysia.com/#organization",
        "name": "HJC Chartered Accountants",
        "alternateName": "HJC",
        "url": "https://hjc-malaysia.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hjc-malaysia.com/logo.png",
          "width": 300,
          "height": 100
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+6016-3889123",
          "email": "hazli@hazlijohar.my",
          "contactType": "customer service",
          "areaServed": "MY",
          "availableLanguage": ["en", "ms"]
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "No G-6-1A Jalan prima saujana 2/D, Taman Prima Saujana",
          "addressLocality": "Kajang",
          "addressRegion": "Selangor",
          "postalCode": "43000",
          "addressCountry": "MY"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 2.9922,
          "longitude": 101.7879
        },
        "sameAs": [
          "https://www.linkedin.com/company/hjc-malaysia",
          "https://www.facebook.com/hjc.malaysia"
        ],
        "foundingDate": "2020",
        "numberOfEmployees": "10-50",
        "vatID": "MY123456789",
        "serviceArea": {
          "@type": "Country",
          "name": "Malaysia"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://hjc-malaysia.com/#service",
        "name": "Chartered Accountancy Services",
        "provider": {
          "@id": "https://hjc-malaysia.com/#organization"
        },
        "serviceType": "Accounting and Financial Services",
        "areaServed": {
          "@type": "Country",
          "name": "Malaysia"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Accounting Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Bookkeeping & Accounting",
                "description": "Professional bookkeeping and accounting services for businesses of all sizes"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Tax Advisory & Compliance",
                "description": "Expert tax consultation and compliance services including SST and corporate tax"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service", 
                "name": "Business Process Automation",
                "description": "Cloud-based automation solutions for streamlined business operations"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://hjc-malaysia.com/#website",
        "url": "https://hjc-malaysia.com",
        "name": "HJC Chartered Accountants Malaysia",
        "description": description,
        "publisher": {
          "@id": "https://hjc-malaysia.com/#organization"
        },
        "inLanguage": "en-US",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://hjc-malaysia.com/?s={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      {canonical && <link rel="canonical" href={canonical} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Geographic Targeting */}
      <meta name="geo.region" content="MY-10" />
      <meta name="geo.placename" content="Kajang, Selangor, Malaysia" />
      <meta name="geo.position" content="2.9922;101.7879" />
      <meta name="ICBM" content="2.9922, 101.7879" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={`${title} - HJC Chartered Accountants Malaysia`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="HJC Chartered Accountants" />
      <meta property="og:locale" content="en_MY" />
      <meta property="og:locale:alternate" content="ms_MY" />
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hjc_malaysia" />
      <meta name="twitter:creator" content="@hjc_malaysia" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={`${title} - HJC Chartered Accountants Malaysia`} />

      {/* LinkedIn */}
      <meta property="linkedin:owner" content="hjc-malaysia" />

      {/* WhatsApp */}
      <meta property="whatsapp:title" content={fullTitle} />
      <meta property="whatsapp:description" content={description} />
      <meta property="whatsapp:image" content={fullImageUrl} />

      {/* Telegram */}
      <meta property="telegram:channel" content="@hjc_malaysia" />

      {/* Business Information */}
      <meta name="DC.title" content={fullTitle} />
      <meta name="DC.description" content={description} />
      <meta name="DC.creator" content={author} />
      <meta name="DC.subject" content="Chartered Accountants, Malaysia, Accounting Services" />
      <meta name="DC.language" content="en" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
