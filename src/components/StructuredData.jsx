import React from 'react';
import { Helmet } from "react-helmet";

const StructuredData = () => {
  // Local Business Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "GoBig Agencia de Marketing Médico",
    "image": [
      "https://gobigagencia.com/hero-image.jpg"
    ],
    "@id": "https://gobigagencia.com/#localbusiness",
    "url": "https://gobigagencia.com/",
    "telephone": "+1-800-GOBIG-MD",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. de los Próceres 123",
      "addressLocality": "Ciudad de Guatemala",
      "postalCode": "01001",
      "addressCountry": "GT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 14.6349,
      "longitude": -90.5069
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-GOBIG-MD",
      "contactType": "Customer Service",
      "language": "es"
    },
    "sameAs": [
      "https://www.facebook.com/gobigagencia",
      "https://www.instagram.com/gobigagencia",
      "https://www.linkedin.com/company/gobig-agencia"
    ]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es GoBig y qué servicios ofrecen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "GoBig es una agencia especializada en marketing médico para clínicas estéticas. Ofrecemos un sistema completo que incluye captación de pacientes, embudos de conversión, seguimiento automatizado y estrategias de publicidad en Meta Ads diseñadas específicamente para el sector médico."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo funciona su garantía de +30 agendas calificadas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nuestra garantía establece que trabajamos contigo 1 a 1 hasta lograr el objetivo de +30 agendas calificadas. Si no lo alcanzamos en el tiempo estipulado, seguimos trabajando sin costo adicional hasta conseguirlo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Necesito tener experiencia en marketing digital para trabajar con ustedes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No es necesario. Nuestro modelo 1 a 1 incluye capacitación completa y acompañamiento personalizado desde la selección de mercado hasta la optimización de campañas, sin importar tu nivel de experiencia previa."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué tipos de clínicas trabajan con GoBig?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Trabajamos exclusivamente con clínicas estéticas, cirujanos plásticos, dentistas estéticos, dermatólogos y otros profesionales de la salud que ofrecen procedimientos de alto valor o 'High Ticket'."
        }
      }
    ]
  };

  // Testimonials Schema
  const testimonialSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Testimonios de Clínicas que Trabajan con GoBig",
    "description": "Historias de éxito de clínicas médicas que han logrado crecer con nuestro sistema de marketing especializado.",
    "author": {
      "@type": "Organization",
      "name": "GoBig Agencia de Marketing Médico"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GoBig Agencia de Marketing Médico",
      "logo": {
        "@type": "ImageObject",
        "url": "https://gobigagencia.com/logo.png"
      }
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(testimonialSchema)}
        </script>
      </Helmet>
    </>
  );
};

export default StructuredData;