import Hero from "./sections/Hero";
import Timeline from "./sections/Timeline";
import Divisi from "./sections/Divisi";
import Testimoni from "./sections/Testimoni";
import Dokumentasi from "./sections/Dokumentasi";
const EventModule = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Timeline />
      <Divisi />
      <Testimoni />
      <Dokumentasi />
    </main>
  );
};

export default EventModule;
