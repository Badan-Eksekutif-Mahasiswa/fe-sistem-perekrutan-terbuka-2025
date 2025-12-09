import CarouselElement from "@/components/elements/CarouselElement";
import { testimoniData } from "../const";

const Testimoni = () => {
  return (
    <main className="lg:px-20 gap-8 px-6 justify-center py-10 flex overflow-hidden text-white flex-col text-center lg:items-center">
      <h1 className="mb-20 text-h1">Testimoni</h1>
      <CarouselElement testimonyData={testimoniData} />
    </main>
  );
};

export default Testimoni;
