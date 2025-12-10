import Hero from "./sections/Hero";
import Timeline from "./sections/Timeline";
import Divisi from "./sections/Divisi";
import Testimoni from "./sections/Testimoni";
import Dokumentasi from "./sections/Dokumentasi";
import FAQ from "./sections/FAQ";
const EventModule = () => {
  return (
    <main className="min-h-screen overflow-hidden">
      <Hero />
      <Timeline />
      <Divisi />
      <Testimoni />
      <Dokumentasi />
      <FAQ />
    </main>
  );
};

export default EventModule;
