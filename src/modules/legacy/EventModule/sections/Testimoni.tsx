import CarouselElement from "@/components/elements/CarouselElement";
import { Event } from "@/types/event";

type TestimoniProps = {
  event: Event;
};

const Testimoni = ({ event }: TestimoniProps) => {
  const testimonies = event.testimonials || [];

  if (testimonies.length === 0) return null;

  // Map API format to CarouselElement format
  const formattedTestimonies = testimonies.map((t) => ({
    name: t.name,
    profilePicture: t.photoUrl || "/assets/logo-bem-ui.png",
    desc: t.message,
    jabatan: t.role,
  }));

  return (
    <main className="lg:px-20 gap-8 px-6 justify-center py-10 flex overflow-hidden text-white flex-col text-center lg:items-center">
      <h1 className="mb-4 text-h1">Testimoni</h1>
      <CarouselElement testimonyData={formattedTestimonies} />
    </main>
  );
};

export default Testimoni;
