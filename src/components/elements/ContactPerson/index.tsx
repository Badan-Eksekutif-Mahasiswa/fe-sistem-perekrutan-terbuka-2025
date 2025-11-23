import AnimatedPuzzle from "../AnimatedPuzzle";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import Link from "next/link";

const ContactPerson = ({
  title,
  description,
  contact,
}: {
  title: string;
  description: string;
  contact: { name: string; method: string; link: string }[];
}) => {
  return (
    <div className="w-full max-lg:text-center relative font-jakarta rounded-2xl gap-6 flex flex-wrap items-center overflow-hidden justify-between bg-gradient-card px-24 max-lg:px-12 max-md:px-8 py-14 max-lg:py-12">
      <div className="space-y-2">
        <h2 className="text-h1">{title}</h2>
        <p className="text-p2">{description}</p>
      </div>
      <div className="absolute z-0 inset-0 flex justify-end max-md:-bottom-72 max-md:-right-40 right-0 items-center pointer-events-none">
        <AnimatedPuzzle
          width={800}
          height={700}
          className="opacity-40 rotate-45 "
        />
      </div>
      <div className="flex relative z-10 max-md:w-full justify-center flex-wrap gap-3 md:gap-6 h-fit ">
        {contact.map((person) => (
          <Button
            key={person.name}
            variant={"secondary"}
            className="max-md:w-full"
            asChild
          >
            <Link href={person.link} target="_blank">
              <UserCircle />
              <span className="text-primary-500 text-m3">
                {person.name} ({person.method})
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ContactPerson;
