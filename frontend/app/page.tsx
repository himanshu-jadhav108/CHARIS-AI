import { CinematicScroll } from '@/features/landing/CinematicScroll';
import { WhyCharis } from '@/features/landing/WhyCharis';
import { Process } from '@/features/landing/Process';
import { Testimonials } from '@/features/landing/Testimonials';
import { FAQ } from '@/features/landing/FAQ';

export default function LandingPage() {
  return (
    <div>
      <CinematicScroll />
      <div className="space-y-12">
        <WhyCharis />
        <Process />
        <Testimonials />
        <FAQ />
      </div>
    </div>
  );
}

