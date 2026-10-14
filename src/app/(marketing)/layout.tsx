import { MotionConfig } from "framer-motion";
import { SableNavbar } from "@/components/sable-navbar";
import MobileNav from "@/components/mobile-nav";
import Footer from "@/components/footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <MobileNav />
      <SableNavbar />
      {children}
      <Footer />
    </MotionConfig>
  );
}
