import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui-legacy/card";
import Countdown from "@/components/elements/Countdown";
import { Button } from "@/components/ui-legacy/button";
import { Event } from "@/types/event";
import { getEventStatus } from "@/lib/utils/event-transformer";
import { Awan, BalonUdara } from "@/design-system";

type HeroProps = {
  event: Event;
};

const Hero = ({ event }: HeroProps) => {
  const eventPath = event.eventCode;
  const isRegistrationClosed = getEventStatus(event) === "Ditutup";
  const isRegistrationUnavailable = isRegistrationClosed || !eventPath;
  const registrationButtonLabel = !eventPath ? "Slug belum tersedia" : "Pendaftaran Ditutup";

  return (
    <main
      id="hero-section"
      className="relative w-screen overflow-x-hidden"
      style={{ backgroundImage: 'linear-gradient(90deg, #0B102D -50%, #9CB3D3 50%, #0B102D 150%)' }}
    >
      {/* Left Cloud */}
      <Awan
        variant="1"
        width={400}
        className="max-md:hidden absolute top-10 left-10 z-10"
      />
      
      {/* Middle Cloud */}
      <Awan
        variant="2"
        className="max-md:hidden absolute top-30 left-1/2 -translate-x-1/2 z-10"
      />

      {/* Right Cloud */}
      <Awan
        variant="1"
        className="max-md:hidden absolute top-16 right-20 z-0"
      />

      <div className="absolute max-md:hidden w-xl h-[900px] bottom-0 left-60 rounded-lg pointer-events-none">
        <div className="absolute inset-0 bg-white opacity-80 rounded-full blur-[120px] scale-y-50 translate-y-1/4"></div>
      </div>

      <BalonUdara
        width={74}
        height={109}
        className="absolute max-md:hidden z-0 animate-float left-20 bottom-84 blur-[2px]"
      />

      <BalonUdara
        width={74}
        height={109}
        className="absolute max-md:hidden animate-float right-1/2 top-20 blur-[2px]"
      />

      {/* Child Hill */}
      <div className="w-full h-full max-md:bottom-[600px] absolute md:bottom-30">
        <Image
          src={"/assets-legacy/hill.webp"}
          layout="fill"
          alt="hill"
          className="object-contain object-bottom"
        />
      </div>

      {/* Main Hill */}
      <div className="w-[105%] h-full max-md:hidden absolute bottom-0 -translate-x-1/2 left-1/2">
        <Image
          src={"/assets/hill-main.svg"}
          layout="fill"
          alt="hill"
          className="object-contain object-bottom "
        />
      </div>

      <div className="absolute md:hidden bottom-0 w-full h-[560px] bg-primary-500 z-10"></div>
      <div className="w-[105%] md:hidden h-full absolute bottom-[530px] -translate-x-1/2 left-1/2 z-20">
        <Image
          src={"/assets/hill-main.svg"}
          layout="fill"
          alt="hill"
          className="object-contain object-bottom"
        />
      </div>

      {/* Main Content */}
      <div className="flex px-5 pt-32 pb-14 max-lg:mt-20 md:px-20 md:pt-36 lg:px-36 lg:pt-44 lg:pb-20 lg:gap-40 z-50 w-full min-h-screen max-lg:flex-col flex-row gap-12 lg:justify-between items-center">
        <div
          className="flex flex-col text-center z-50 items-center gap-5
         lg:gap-15 text-white"
        >
          <h1 className="max-w-3xl font-extrabold font-jakarta text-h1 tracking-wide leading-tight text-shadow-lg text-shadow-black">
            {event.title}
          </h1>
          <div className="relative w-32 h-32 md:w-72 md:h-72">
            <img
              src={event.logo || "/assets/logo-bem-ui.png"}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-p5 lg:text-p4">{event.description}</p>
        </div>
        <Card className="text-center w-full z-20 justify-center flex flex-col p-6 gap-6 bg-gradient-card-blue border-none text-white shadow-glass backdrop-blur-md">
          <CardHeader>
            <CardTitle>
              Pendaftaran Ditutup <br /> dalam
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Countdown
              targetDate={new Date(event.registrationClose)}
              displayDate={true}
            />
          </CardContent>
          <CardFooter className="flex items-center z-20 justify-center">
            {isRegistrationUnavailable ? (
              <Button className="w-full bg-marun/50 text-white cursor-not-allowed" style={{ boxShadow: 'var(--shadow-glass)' }} disabled>
                {registrationButtonLabel}
              </Button>
            ) : (
              <Link href={`/${eventPath}/form`} className="w-full">
                <Button className="w-full bg-marun text-white hover:bg-marun-light border-none" style={{ boxShadow: 'var(--shadow-glass)' }}>
                  Daftar Sekarang!
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default Hero;
