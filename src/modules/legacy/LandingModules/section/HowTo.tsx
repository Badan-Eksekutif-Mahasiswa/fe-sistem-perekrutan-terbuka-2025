import Image from "next/image";
import BalonUdara from "@/design-system/components/atoms/BalonUdara";

const step = [
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta at tortor id placerat. ",
    image: "/placeholder-1.webp",
  },
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta at tortor id placerat. ",
    image: "/placeholder-1.webp",
  },
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta at tortor id placerat. ",
    image: "/placeholder-1.webp",
  },
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta at tortor id placerat. ",
    image: "/placeholder-1.webp",
  },
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta at tortor id placerat. ",
    image: "/placeholder-1.webp",
  },
  {
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porta at tortor id placerat. ",
    image: "/placeholder-1.webp",
  },
];

const HowTo = () => {
  return (
    <section className="relative overflow-hidden flex flex-col text-white font-jakarta gap-4 px-12 max-lg:px-10 max-md:px-8">
      <BalonUdara width={130} height={192} className="absolute -z-10 -left-6 top-1/3 opacity-70 max-lg:hidden animate-float [animation-delay:2s]" />
      <h1 className="text-center text-h1">Cara menggunakan SPT</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {step.map((item, index) => (
          <div
            key={index}
            className="flex flex-col rounded-2xl bg-gradient-card-blue backdrop-blur-sm items-center gap-2 p-6 h-60 w-50"
            style={{ boxShadow: 'var(--shadow-glass)' }}
          >
            <div className="relative aspect-video w-full">
              <Image
                src={item.image}
                alt={`Step ${index + 1}`}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute rounded-full bg-primary-500 w-7 h-7 text-h4 flex justify-center items-center left-0 top-0 -translate-x-1/2 -translate-y-1/2">
                <span>{index + 1}</span>
              </div>
            </div>
            <p className="text-justify text-p6"> {item.desc} </p>
          </div>
        ))}
      </div>
    </section>
  );
};
export default HowTo;
