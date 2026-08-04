import { CinematicScroll } from '@/features/landing/CinematicScroll';
import { Hero } from '@/features/landing/Hero';
import { Process } from '@/features/landing/Process';
import { WhyCharis } from '@/features/landing/WhyCharis';
import { Testimonials } from '@/features/landing/Testimonials';
import { FAQ } from '@/features/landing/FAQ';

export default function LandingPage() {
  return (
    <div>
      <CinematicScroll />
      <div className="space-y-12">
        <Hero />
        <Process />
        <WhyCharis />
        <Testimonials />
        <FAQ />
      </div>
    </div>
  );
}
