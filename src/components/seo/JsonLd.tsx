import { siteConfig, seoKeywords } from "@/lib/data";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    description: `${siteConfig.name}, ${siteConfig.slogan}. Bağlıca'da 185 m² net 4+1 lüks rezidans daireler.`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.contactEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: "1248. Sk 2F, Kapı No:17",
      addressLocality: "Bağlıca",
      addressRegion: "Etimesgut, Ankara",
      postalCode: "06790",
      addressCountry: "TR",
    },
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.company,
    },
    keywords: seoKeywords.join(", "),
  };

  const apartmentData = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: siteConfig.name,
    description:
      "Ankara Bağlıca'da 185 m² net 4+1 lüks daireler, 16 katlı 3 blok, panoramik Ankara manzarası.",
    numberOfAccommodationUnits: "Multiple",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1248. Sk 2F, Kapı No:17",
      addressLocality: "Bağlıca",
      addressRegion: "Etimesgut, Ankara",
      postalCode: "06790",
      addressCountry: "TR",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Açık Yüzme Havuzu" },
      { "@type": "LocationFeatureSpecification", name: "Fitness Merkezi" },
      { "@type": "LocationFeatureSpecification", name: "Tenis Kortu" },
      { "@type": "LocationFeatureSpecification", name: "7/24 Güvenlik" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(apartmentData) }}
      />
    </>
  );
}
