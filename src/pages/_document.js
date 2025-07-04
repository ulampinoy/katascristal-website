import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="es" className="scroll-smooth">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/your-font.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://katascristal.com/" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* PWA Support */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="KatasCristal" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              'name': 'KatasCristal',
              'image': 'https://katascristal.com/images/vangie-01.jpeg',
              '@id': 'https://katascristal.com',
              'url': 'https://katascristal.com',
              'telephone': '+34611311905',
              'priceRange': '€€',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Calle Ejemplo, 123',
                'addressLocality': 'Madrid',
                'postalCode': '28001',
                'addressCountry': 'ES'
              },
              'geo': {
                '@type': 'GeoCoordinates',
                'latitude': '40.416775',
                'longitude': '-3.703790'
              },
              'openingHoursSpecification': {
                '@type': 'OpeningHoursSpecification',
                'dayOfWeek': [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday'
                ],
                'opens': '08:00',
                'closes': '20:00'
              },
              'sameAs': [
                'https://www.facebook.com/katascristal',
                'https://www.instagram.com/katascristal',
                'https://www.linkedin.com/company/katascristal'
              ]
            })
          }}
        />
      </Head>
      <body className="bg-white text-gray-900 antialiased">
        <Main />
        <NextScript />
        
        {/* Schema.org structured data for LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              'name': 'KatasCristal',
              'image': 'https://katascristal.com/images/vangie-01.jpeg',
              'description': 'Empresa líder en servicios de limpieza profesional en Madrid desde 2015. Especialistas en limpieza de oficinas, comunidades, restaurantes, cristales y hogares.',
              'address': {
                '@type': 'PostalAddress',
                'streetAddress': 'Calle Ejemplo, 123',
                'addressLocality': 'Madrid',
                'postalCode': '28001',
                'addressCountry': 'ES'
              },
              'geo': {
                '@type': 'GeoCoordinates',
                'latitude': '40.416775',
                'longitude': '-3.703790'
              },
              'url': 'https://katascristal.com',
              'telephone': '+34611311905',
              'openingHours': 'Mo-Fr 08:00-20:00, Sa 09:00-14:00',
              'priceRange': '€€',
              'sameAs': [
                'https://www.facebook.com/katascristal',
                'https://www.instagram.com/katascristal',
                'https://www.linkedin.com/company/katascristal'
              ]
            })
          }}
        />
      </body>
    </Html>
  );
}
