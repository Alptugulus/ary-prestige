import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description: `${siteConfig.company} kişisel verilerin korunması (KVKK) aydınlatma metni.`,
  robots: { index: true, follow: true },
};

const sections = [
  {
    title: "1. Veri Sorumlusu",
    content: (
      <>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca,
          kişisel verileriniz; veri sorumlusu sıfatıyla{" "}
          <strong className="text-white font-medium">{siteConfig.company}</strong>{" "}
          (“Şirket”) tarafından aşağıda açıklanan kapsamda işlenmektedir.
        </p>
        <ul className="mt-4 space-y-2 text-silver/70">
          <li>
            <span className="text-silver/50">Unvan:</span> {siteConfig.company}
          </li>
          <li>
            <span className="text-silver/50">Proje:</span> {siteConfig.name}
          </li>
          <li>
            <span className="text-silver/50">Adres:</span> {siteConfig.address}
          </li>
          <li>
            <span className="text-silver/50">Telefon:</span>{" "}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="text-bronze hover:text-bronze/80 transition-colors"
            >
              {siteConfig.phone}
            </a>
          </li>
          <li>
            <span className="text-silver/50">E-posta:</span>{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-bronze hover:text-bronze/80 transition-colors"
            >
              {siteConfig.email}
            </a>
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "2. İşlenen Kişisel Veriler",
    content: (
      <>
        <p>
          Web sitemiz üzerinden iletişim formu, telefon, e-posta veya WhatsApp
          kanallarıyla bizimle iletişime geçmeniz halinde aşağıdaki kişisel
          verileriniz işlenebilir:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-silver/70">
          <li>Kimlik bilgileri (ad, soyad)</li>
          <li>İletişim bilgileri (telefon numarası, e-posta adresi)</li>
          <li>
            Mesaj / talep içeriği (iletişim formuna yazdığınız metin ve proje
            hakkında ilettiğiniz bilgiler)
          </li>
          <li>
            İşlem güvenliği verileri (IP adresi, tarayıcı bilgisi, erişim
            zamanı — teknik altyapı ve güvenlik amaçlı)
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Kişisel Verilerin İşlenme Amaçları",
    content: (
      <>
        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-silver/70">
          <li>
            {siteConfig.name} projesi hakkında bilgilendirme taleplerinizin
            karşılanması
          </li>
          <li>
            Satış, ön satış ve ödeme planı konularında size geri dönüş
            yapılması
          </li>
          <li>İletişim taleplerinin kayıt altına alınması ve yönetilmesi</li>
          <li>
            Yasal yükümlülüklerin yerine getirilmesi ve olası uyuşmazlıklarda
            delil teşkil etmesi
          </li>
          <li>
            Web sitesi güvenliğinin sağlanması ve kötüye kullanımın önlenmesi
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Hukuki Sebepler",
    content: (
      <>
        <p>
          Kişisel verileriniz, KVKK’nın 5. maddesinde belirtilen aşağıdaki hukuki
          sebeplere dayanılarak işlenmektedir:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-silver/70">
          <li>
            Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması
            kaydıyla, sözleşmenin taraflarına ait kişisel verilerin işlenmesinin
            gerekli olması
          </li>
          <li>
            Veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için
            zorunlu olması
          </li>
          <li>
            İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla,
            veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu
            olması
          </li>
          <li>
            Açık rızanızın bulunması (gerekli olduğu hallerde)
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Kişisel Verilerin Aktarılması",
    content: (
      <>
        <p>
          Kişisel verileriniz; yukarıda belirtilen amaçların gerçekleştirilmesi
          kapsamında, KVKK’nın 8. ve 9. maddelerine uygun olarak ve gerekli
          güvenlik tedbirleri alınmak suretiyle;
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-silver/70">
          <li>
            Yetkili kamu kurum ve kuruluşlarına (yasal zorunluluk halinde)
          </li>
          <li>
            Hizmet aldığımız tedarikçilere (örneğin barındırma / e-posta
            altyapısı sağlayıcıları) — yalnızca hizmetin ifası için gerekli
            ölçüde
          </li>
        </ul>
        <p className="mt-4">
          Kişisel verileriniz, açık rızanız olmaksızın yurt dışına
          aktarılmamaktadır; yurt dışı aktarımının söz konusu olması halinde
          ilgili yasal şartlara uyulur.
        </p>
      </>
    ),
  },
  {
    title: "6. Saklama Süresi",
    content: (
      <p>
        Kişisel verileriniz, işlendikleri amaç için gerekli olan süre boyunca ve
        ilgili mevzuatta öngörülen zamanaşımı / saklama süreleri saklı kalmak
        kaydıyla muhafaza edilir. Sürenin sona ermesi veya işleme amacının
        ortadan kalkması halinde verileriniz silinir, yok edilir veya anonim
        hale getirilir.
      </p>
    ),
  },
  {
    title: "7. İlgili Kişi Olarak Haklarınız",
    content: (
      <>
        <p>
          KVKK’nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-silver/70">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>
            İşlenme amacını ve bunların amacına uygun kullanılıp
            kullanılmadığını öğrenme
          </li>
          <li>
            Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme
          </li>
          <li>
            Eksik veya yanlış işlenmişse düzeltilmesini isteme
          </li>
          <li>
            KVKK’nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini
            veya yok edilmesini isteme
          </li>
          <li>
            Düzeltme, silme veya yok etme işlemlerinin, kişisel verilerin
            aktarıldığı üçüncü kişilere bildirilmesini isteme
          </li>
          <li>
            İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz
            edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya
            çıkmasına itiraz etme
          </li>
          <li>
            Kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde
            zararın giderilmesini talep etme
          </li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Başvuru Yöntemi",
    content: (
      <>
        <p>
          Yukarıda sayılan haklarınıza ilişkin taleplerinizi, KVKK ve ilgili
          mevzuata uygun olarak aşağıdaki kanallardan bize iletebilirsiniz:
        </p>
        <ul className="mt-4 space-y-2 text-silver/70">
          <li>
            <span className="text-silver/50">E-posta:</span>{" "}
            <a
              href={`mailto:${siteConfig.email}?subject=KVKK%20Ba%C5%9Fvurusu`}
              className="text-bronze hover:text-bronze/80 transition-colors"
            >
              {siteConfig.email}
            </a>
          </li>
          <li>
            <span className="text-silver/50">Posta:</span> {siteConfig.address}
          </li>
          <li>
            <span className="text-silver/50">Telefon:</span>{" "}
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="text-bronze hover:text-bronze/80 transition-colors"
            >
              {siteConfig.phone}
            </a>
          </li>
        </ul>
        <p className="mt-4">
          Başvurularınız, kimliğinizi tespit etmeye elverişli bilgilerle
          birlikte iletilmeli; talebiniz en geç otuz gün içinde
          sonuçlandırılacaktır. İşlemin ayrıca bir maliyeti gerektirmesi
          hâlinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki
          ücret alınabilir.
        </p>
      </>
    ),
  },
  {
    title: "9. Güncellemeler",
    content: (
      <p>
        Bu aydınlatma metni, yasal düzenlemelerdeki değişiklikler veya işleme
        faaliyetlerimizdeki güncellemeler doğrultusunda revize edilebilir.
        Güncel metin her zaman bu sayfada yayımlanır.
      </p>
    ),
  },
];

export default function KvkkPage() {
  return (
    <section className="min-h-screen bg-background pt-28 pb-24 md:pt-36 md:pb-32 lg:pb-40">
      <div className="container mx-auto max-w-3xl px-6 lg:px-12">
        <Link
          href="/#anasayfa"
          className="mb-10 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-silver/50 transition-colors hover:text-bronze"
        >
          <span aria-hidden>←</span> Ana Sayfa
        </Link>

        <span className="mb-4 block text-xs tracking-[0.3em] uppercase text-bronze">
          Yasal
        </span>
        <h1 className="mb-4 font-display text-4xl font-light text-white md:text-5xl">
          KVKK Aydınlatma Metni
        </h1>
        <p className="mb-12 max-w-2xl text-sm leading-relaxed text-silver/60 md:text-base">
          6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında{" "}
          {siteConfig.company} / {siteConfig.name} web sitesi ziyaretçileri ve
          iletişim talebinde bulunan kişiler için bilgilendirme metnidir.
        </p>

        <p className="mb-16 text-xs text-silver/40">
          Son güncelleme: 17 Temmuz 2026
        </p>

        <div className="space-y-12">
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="mb-4 font-display text-xl font-light text-white md:text-2xl">
                {section.title}
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-silver/80 md:text-[15px]">
                {section.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
