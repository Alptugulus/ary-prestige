export const siteConfig = {
  name: "ARY Prestige",
  company: "ARY Grup",
  location: "Ankara Yenibağlıca",
  phone: "0312 123 45 67",
  phoneRaw: "+903121234567",
  email: "info@aryprestige.com",
  whatsapp: "903121234567",
  address: "Yenibağlıca, Ankara",
};

export const navLinks = [
  { href: "#anasayfa", label: "Anasayfa" },
  { href: "#proje", label: "Proje" },
  { href: "#dis-gorunumler", label: "Dış Görünümler" },
  { href: "#daireler", label: "Daireler" },
  { href: "#sosyal-yasam", label: "Sosyal Yaşam" },
  { href: "#lokasyon", label: "Lokasyon" },
  { href: "#odeme-plani", label: "Ödeme Planı" },
  { href: "#kurumsal", label: "Kurumsal" },
  { href: "#iletisim", label: "İletişim" },
];

export const heroSlides = [
  {
    id: "day",
    label: "Gündüz",
    image: "/images/hero/day.png",
  },
  {
    id: "sunset",
    label: "Gün Batımı",
    image: "/images/hero/sunset.png",
  },
  {
    id: "panorama",
    label: "Panorama",
    image: "/images/hero/panorama.png",
  },
];

export type ExteriorCategory = "all" | "day" | "sunset";

export const exteriorViews = [
  {
    id: "01",
    src: "/images/exterior/01-on-cephe.png",
    alt: "ARY Prestige ön cephe görünümü",
    title: "Ön Cephe",
    category: "day" as const,
  },
  {
    id: "02",
    src: "/images/exterior/02-panorama.png",
    alt: "ARY Prestige panoramik görünüm",
    title: "Panoramik Görünüm",
    category: "day" as const,
  },
  {
    id: "03",
    src: "/images/exterior/03-gun-batimi.png",
    alt: "ARY Prestige gün batımı perspektifi",
    title: "Gün Batımı",
    category: "sunset" as const,
  },
  {
    id: "04",
    src: "/images/exterior/04-havuz-sosyal-alan.png",
    alt: "ARY Prestige havuz ve sosyal alan",
    title: "Havuz ve Sosyal Alan",
    category: "day" as const,
  },
  {
    id: "05",
    src: "/images/exterior/05-otopark-oyun-alani.png",
    alt: "ARY Prestige otopark ve oyun alanı",
    title: "Otopark ve Oyun Alanı",
    category: "day" as const,
  },
  {
    id: "06",
    src: "/images/exterior/06-giris-kapisi.png",
    alt: "ARY Prestige giriş kapısı ve güvenlik",
    title: "Giriş Kapısı",
    category: "day" as const,
  },
  {
    id: "07",
    src: "/images/exterior/07-acik-hava-spor.png",
    alt: "ARY Prestige açık hava spor ve oyun alanı",
    title: "Açık Hava Spor Alanı",
    category: "day" as const,
  },
];

export const exteriorCategories = [
  { id: "all" as const, label: "Tümü" },
  { id: "day" as const, label: "Gündüz" },
  { id: "sunset" as const, label: "Gün Batımı" },
];

export const heroFeatures = [
  { icon: "panorama", label: "Panoramik Ankara Manzarası" },
  { icon: "building", label: "16 Kat 3 Blok" },
  { icon: "apartment", label: "4+1 Daireler" },
  { icon: "area", label: "185 m² Net Alan" },
  { icon: "villa", label: "6 Ticari Villa" },
];

export const projectStats = [
  {
    value: 11500,
    suffix: " m²",
    label: "Arsa Alanı",
    icon: "land",
  },
  {
    value: 53400,
    suffix: " m²",
    label: "Kapalı Alan",
    icon: "area",
  },
  {
    value: 3,
    suffix: "",
    label: "Blok",
    icon: "building",
  },
  {
    value: 6,
    suffix: "",
    label: "Ticari Villa",
    icon: "villa",
  },
  {
    value: 185,
    suffix: " m²",
    label: "Net Daireler",
    icon: "apartment",
  },
];

export const corporatePartners = [
  {
    name: "ARY Grup",
    role: "Ana geliştirici",
    description:
      "Ankara'nın seçkin projelerinde uzmanlaşmış, kalite ve güven odaklı inşaat geliştiricisi.",
  },
  {
    name: "Okursoy",
    role: "Arsa sahibi ve iş ortağı",
    description: "40 yıllık ticari geçmişiyle güçlü bir iş ortaklığı sunmaktadır.",
  },
  {
    name: "Köroğlu Kardeşler Yatırım ve Sanayi Ltd.",
    role: "Yatırımcı ve iş ortağı",
    description:
      "Stratejik yatırım vizyonuyla projenin finansal gücünü desteklemektedir.",
  },
];

export const projectFeatures = [
  "16 katlı 3 blok",
  "6 ticari villa",
  "4+1 daireler",
  "185 m² net",
  "203 m² kullanım alanı",
  "Panoramik Ankara manzarası",
  "3 cepheli yaşam alanı",
];

export const apartmentFeatures = [
  { label: "Tavan Yüksekliği", value: "3.20 m" },
  { label: "Mutfak", value: "22.96 m²" },
  { label: "Salon", value: "35.88 m²" },
  { label: "Balkon", value: "20.16 m²" },
  { label: "Giyinme Odası", value: "6.48 m²" },
  { label: "Banyo", value: "3 adet" },
];

export const bathroomTypes = [
  "Ebeveyn banyosu (3.78 m²)",
  "Genel banyo (5.04 m²)",
  "Misafir banyosu (3.22 m²)",
];

export const extraFeatures = [
  "Çamaşır odası (2.52 m²)",
  "Antre ve vestiyer (8.46 m²)",
  "Çocuk odalarında gömme dolap",
];

export const floorPlanTypes = [
  {
    id: "tip-a",
    label: "Tip A",
    subtitle: "Sol Cephe",
    image: "/images/floor-plan/daire-tip-a-sol.png",
    netArea: "185 m²",
    rooms: [
      { label: "Salon", area: "35.88 m²" },
      { label: "Mutfak", area: "22.96 m²" },
      { label: "Balkon", area: "20.16 m²" },
      { label: "Ebeveyn Yatak Odası", area: "22.32 m²" },
      { label: "Giyinme Odası", area: "6.48 m²" },
      { label: "Ebeveyn Banyosu", area: "3.78 m²" },
      { label: "Yatak Odası 1", area: "12.94 m²" },
      { label: "Yatak Odası 2", area: "12.94 m²" },
      { label: "Yatak Odası 3", area: "16.72 m²" },
      { label: "Genel Banyo", area: "5.04 m²" },
      { label: "Misafir Banyosu", area: "3.22 m²" },
      { label: "Antre", area: "8.46 m²" },
      { label: "Koridor", area: "8.88 m²" },
      { label: "Çamaşır Odası", area: "2.52 m²" },
    ],
  },
  {
    id: "tip-b",
    label: "Tip B",
    subtitle: "Sağ Cephe",
    image: "/images/floor-plan/daire-tip-b-sag.png",
    netArea: "185 m²",
    rooms: [
      { label: "Salon", area: "35.88 m²" },
      { label: "Mutfak", area: "22.96 m²" },
      { label: "Balkon", area: "20.16 m²" },
      { label: "Ebeveyn Yatak Odası", area: "22.32 m²" },
      { label: "Giyinme Odası", area: "6.48 m²" },
      { label: "Ebeveyn Banyosu", area: "3.78 m²" },
      { label: "Yatak Odası 1", area: "12.94 m²" },
      { label: "Yatak Odası 2", area: "12.94 m²" },
      { label: "Yatak Odası 3", area: "16.72 m²" },
      { label: "Genel Banyo", area: "5.04 m²" },
      { label: "Misafir Banyosu", area: "3.22 m²" },
      { label: "Antre", area: "8.46 m²" },
      { label: "Koridor", area: "8.88 m²" },
      { label: "Çamaşır Odası", area: "2.52 m²" },
    ],
  },
  {
    id: "full",
    label: "Normal Kat",
    subtitle: "Kat Planı",
    image: "/images/floor-plan/kat-plani.png",
    netArea: "3 Daire / Kat",
    rooms: [
      { label: "Kat Holü", area: "30.81 m²" },
      { label: "2 Asansör", area: "—" },
      { label: "2 Merdiven", area: "—" },
      { label: "Tip A Daire", area: "185 m² net" },
      { label: "Tip B Daire", area: "185 m² net" },
      { label: "Tip C Daire", area: "Üst cephe" },
    ],
  },
];

export const floorPlanPdf = "/images/floor-plan/kat-plani.pdf";

export const socialAmenities = [
  { icon: "pool", title: "Açık Yüzme Havuzu" },
  { icon: "fitness", title: "Fitness Merkezi" },
  { icon: "sauna", title: "Sauna" },
  { icon: "hamam", title: "Hamam" },
  { icon: "basketball", title: "Basketbol Sahası" },
  { icon: "tennis", title: "Tenis Kortu" },
  { icon: "volleyball", title: "Voleybol Sahası" },
  { icon: "playground", title: "Çocuk Oyun Alanı" },
  { icon: "walk", title: "Yürüyüş Yolları" },
  { icon: "gazebo", title: "Kamelyalar" },
  { icon: "landscape", title: "Peyzaj Alanları" },
];

export const technicalFeatures = [
  "Merkezi Isıtma",
  "Yerden Isıtma",
  "Ses Yalıtımı",
  "Isı Yalıtımı",
  "Klima Altyapısı",
  "Galvaniz Havalandırma Sistemi",
  "Jeneratör",
  "Yedek Su Deposu",
  "Hidrofor Sistemi",
  "Elektrikli Araç Şarj İstasyonu",
  "Otomatik Yangın Söndürme Sistemi",
  "Yangın Çıkışları",
  "Sığınaklar",
  "Güvenli Alanlar",
  "Yük Asansörü",
  "Yolcu Asansörü",
  "7/24 Güvenlik",
];

export const locationDistances = [
  { destination: "Eskişehir Yoluna", time: "1 Dakika" },
  { destination: "Otobana", time: "3 Dakika" },
  { destination: "Bağlıca Merkeze", time: "5 Dakika" },
  { destination: "Yaşamkent'e", time: "Komşu" },
  {
    destination: "Başkent Üniversitesi Hastanesi'ne",
    time: "2 Dakika",
  },
];

export const deliveryTimeline = [
  { block: "1. Blok", months: 24, label: "Aralık Başlangıç" },
  { block: "2. Blok", months: 30, label: "Aralık Başlangıç" },
  { block: "3. Blok", months: 36, label: "Aralık Başlangıç" },
];

export const paymentPlans = [
  {
    title: "24 Ay Vade",
    description: "Hızlı teslimat planı ile erken sahiplik avantajı",
    highlight: false,
  },
  {
    title: "36 Ay Vade",
    description: "Dengeli ödeme seçeneği ile esnek finansman",
    highlight: true,
  },
  {
    title: "48 Ay Vade",
    description: "Uzun vadeli ödeme kolaylığı ile yatırım fırsatı",
    highlight: false,
  },
  {
    title: "Kişiye Özel Ödeme Planı",
    description: "Size özel tasarlanmış finansman çözümleri",
    highlight: false,
  },
];

export const seoKeywords = [
  "Ankara lüks konut",
  "Bağlıca konut projesi",
  "Yenibağlıca daire",
  "Ankara yatırım fırsatı",
  "4+1 lüks daire Ankara",
  "Panoramik Ankara manzaralı daire",
];
