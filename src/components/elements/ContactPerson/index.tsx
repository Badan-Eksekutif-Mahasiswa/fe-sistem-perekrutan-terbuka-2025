import AnimatedPuzzle from "../AnimatedPuzzle";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

const ContactPerson = () => {
  return (
    <div className="w-full relative rounded-2xl gap-6 flex flex-wrap items-center overflow-hidden justify-between bg-gradient-card px-24 py-14 ">
      <div className="space-y-2">
        <h2 className="text-h1">Apakah kamu butuh bantuan?</h2>
        <p className="text-p2">Hubungi contact person kami</p>
      </div>
      <div className="absolute inset-0 flex justify-end max-md:-bottom-72 max-md:-right-40 right-60 items-center pointer-events-none">
        <AnimatedPuzzle
          width={800}
          height={700}
          className="opacity-40 rotate-45 "
        />
      </div>
      <div className="flex max-md:w-full justify-center flex-wrap gap-3 md:gap-6 h-fit ">
        <Button variant={"secondary"} className="max-md:w-full">
          <UserCircle />
          <span className="text-primary-500 text-m3">Nama 1 (Line)</span>
        </Button>
        <Button variant={"secondary"} className="max-md:w-full">
          <UserCircle />
          <span className="text-primary-500 text-m3">Nama 2 (Whatsapp)</span>
        </Button>
      </div>
    </div>
  );
};

export default ContactPerson;
