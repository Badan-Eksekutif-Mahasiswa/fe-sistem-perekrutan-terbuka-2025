import Hero from "./sections/Hero";
import Timeline from "./sections/Timeline";
import Divisi from "./sections/Divisi";
import Testimoni from "./sections/Testimoni";
const EventModule = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Timeline />
      <Divisi />
      <Testimoni />
    </main>
  );
};

export default EventModule;
