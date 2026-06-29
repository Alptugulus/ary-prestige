import { Hero } from "@/components/sections/Hero";
import { ProjectStats } from "@/components/sections/ProjectStats";
import { ProjectSection, CorporateSection } from "@/components/sections/ProjectSection";
import { ExteriorViewsSection } from "@/components/sections/ExteriorViewsSection";
import { ApartmentSection } from "@/components/sections/ApartmentSection";
import {
  SocialLifeSection,
  TechnicalSection,
  ParkingSection,
} from "@/components/sections/AmenitiesSection";
import {
  LocationSection,
  InvestmentSection,
} from "@/components/sections/LocationSection";
import {
  DeliveryTimeline,
  PaymentPlans,
} from "@/components/sections/PaymentSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProjectStats />
      <ProjectSection />
      <ExteriorViewsSection />
      <ApartmentSection />
      <SocialLifeSection />
      <TechnicalSection />
      <ParkingSection />
      <LocationSection />
      <InvestmentSection />
      <DeliveryTimeline />
      <PaymentPlans />
      <CorporateSection />
      <ContactSection />
      <WhatsAppButton />
    </>
  );
}
