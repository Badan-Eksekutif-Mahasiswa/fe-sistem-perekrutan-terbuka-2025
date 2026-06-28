import Button from "@/design-system/components/atoms/Button";
import { UserCircle } from "lucide-react";

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
    <div
      className="w-full text-white max-lg:text-center relative font-jakarta rounded-2xl gap-6 flex flex-wrap max-lg:justify-center items-center overflow-hidden justify-between bg-gradient-card-blue backdrop-blur-sm px-24 max-lg:px-12 max-md:px-8 py-14 max-lg:py-12"
      style={{ boxShadow: 'var(--shadow-glass)' }}
    >
      <div className="space-y-2">
        <h2 className="text-h1">{title}</h2>
        <p className="text-p2">{description}</p>
      </div>
      <div className="flex relative z-10 max-lg:w-full justify-center flex-wrap gap-3 md:gap-6 h-fit">
        {contact.map((person) => (
          <Button
            key={person.name}
            variant="secondary"
            leftIcon={<UserCircle size={16} />}
            href={person.link}
            className="max-lg:w-full"
          >
            {person.name} ({person.method})
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ContactPerson;
