import Calendar from "@/components/elements/Calendar";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

const OnGoing = () => {
  return (
    <section className="grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-12 max-lg:gap-8 py-20 px-12 max-lg:px-10 max-md:px-8">
      <div className="w-full h-100 bg-primary-300"></div>
      <div className="w-full flex flex-col gap-2">
        <p className="text-m1 text-white text-center">Calender</p>
        <Calendar />
        <Button variant={'secondary'}>
          <SquarePen />
          Lihat Selengkapnya
        </Button>
      </div>
    </section>
  );
};
export default OnGoing;
