import LandingModules from "@/modules/legacy/LandingModules";
import { getPartnerLogos } from "@/lib/partners";

export default function Home() {
  // Dibaca di server saat build. Semua gambar di `public/partners` otomatis
  // ikut, tanpa perlu menulis nama file satu per satu.
  const partnerLogos = getPartnerLogos();

  return <LandingModules partnerLogos={partnerLogos} />;
}
