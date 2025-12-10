import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Countdown from "@/components/elements/Countdown";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/event";

type HeroProps = {
  event: Event;
};

const Hero = ({ event }: HeroProps) => {
  return (
    <main
      id="hero-section"
      className="relative w-screen overflow-x-hidden bg-primary-500 bg-linear-to-b from-secondary-300 to-secondary-100"
    >
      <div className="w-7xl max-md:hidden absolute top-16 right-20 h-[139px] z-10">
        <Image src={"/events/sky-assets.webp"} layout="fill" alt="Sky Assets" />
      </div>

      <div className="absolute max-md:hidden w-xl h-[900px] bottom-0 left-60 rounded-lg pointer-events-none">
        <div className="absolute inset-0 bg-white opacity-80 rounded-full blur-[120px] scale-y-50 translate-y-1/4"></div>
      </div>

      <Image
        src={"/events/balloon-blur.webp"}
        width={74}
        height={109}
        alt="hill"
        className="absolute max-md:hidden z-0 animate-float left-40 bottom-96"
      />

      <Image
        src={"/events/balloon-blur.webp"}
        width={74}
        height={109}
        alt="hill"
        className="absolute max-md:hidden animate-float right-1/2 top-40"
      />

      {/* Child Hill */}
      <div className="w-full h-full max-md:bottom-[600px] absolute md:bottom-30">
        <Image
          src={"/events/hill.webp"}
          layout="fill"
          alt="hill"
          className="object-contain object-bottom"
        />
      </div>

      {/* Main Hill */}
      <div className="w-[105%] h-full max-md:hidden absolute bottom-0 -translate-x-1/2 left-1/2">
        <Image
          src={"/events/hill-main.webp"}
          layout="fill"
          alt="hill"
          className="object-contain object-bottom "
        />
      </div>

      <div className="absolute md:hidden bottom-0 w-full h-[560px] bg-primary-500 z-10"></div>
      <div className="w-[105%] md:hidden h-full absolute bottom-[530px] -translate-x-1/2 left-1/2 z-20">
        <Image
          src={"/events/hill-main-mobile.webp"}
          layout="fill"
          alt="hill"
          className="object-contain object-bottom"
        />
      </div>

      {/* Main Content */}
      <div className="flex px-5 py-10 max-lg:mt-20 md:px-20 lg:px-36 lg:py-0 lg:gap-40 z-50 w-full min-h-screen max-lg:flex-col flex-row gap-12 lg:justify-between items-center">
        <div
          className="flex flex-col text-center z-50 items-center gap-5
         lg:gap-15 text-white"
        >
          <h1 className="font-extrabold font-jakarta text-h2 lg:text-6xl tracking-wide leading-normal  text-shadow-lg text-shadow-black">
            {event.title}
          </h1>
          <div className="relative w-32 h-32 md:w-72 md:h-72">
            <Image
              src={event.logo || "/placeholders/logo-event.webp"}
              alt="Logo"
              layout="fill"
            />
          </div>
          <p className="text-p4 lg:text-p3">{event.description}</p>
        </div>
        <Card className="text-center w-full z-20 justify-center flex flex-col p-6 gap-6">
          <CardHeader>
            <CardTitle>
              Pendaftaran Ditutup <br /> dalam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Countdown
              targetDate={new Date(event.closeRegistration)}
              displayDate={true}
            />
          </CardContent>
          <CardFooter className="flex items-center z-20 justify-center">
            <Link href={`/${event.id}/form`} className="w-full">
              <Button variant={"secondary"} className="w-full">
                Daftar Sekarang!
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Hero;
