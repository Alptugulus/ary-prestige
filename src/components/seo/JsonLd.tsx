import { siteConfig, seoKeywords } from "@/lib/data";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: siteConfig.name,
    description:
      "185 m² net 4+1 lüks rezidans daireler, panoramik Ankara manzarası ve ayrıcalıklı sosyal yaşam konseptiyle Yenibağlıca'da yükselen prestijli konut projesi.",
    url: "https://aryprestige.com",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yenibağlıca",
      addressRegion: "Ankara",
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
    name: "ARY Prestige",
    description:
      "Ankara Yenibağlıca'da 185 m² net 4+1 lüks daireler, 16 katlı 3 blok, panoramik Ankara manzarası.",
    numberOfAccommodationUnits: "Multiple",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yenibağlıca",
      addressRegion: "Ankara",
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
