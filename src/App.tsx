import { MotionConfig } from "framer-motion";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Preloader } from "@/components/Preloader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Collections } from "@/components/Collections";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { Philosophy } from "@/components/Philosophy";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user" transition={{ ease: [0.16, 1, 0.3, 1] }}>
      <Preloader />
      <SmoothScroll>
        <div className="grain-overlay" aria-hidden />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />

        <main id="main">
          <Hero />
          <About />
          <Collections />
          <Services />
          <Process />
          <Philosophy />
          <Testimonials />
          <Contact />
        </main>

        <Footer />
      </SmoothScroll>
    </MotionConfig>
  );
}
