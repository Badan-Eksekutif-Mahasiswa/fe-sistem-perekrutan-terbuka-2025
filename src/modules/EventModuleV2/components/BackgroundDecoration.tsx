import { BalonUdara } from "@/design-system";

export const BackgroundDecoration = () => {
  return (
    <>
      {/* Desktop Mist */}
      <div className="absolute max-md:hidden h-[800px] bottom-60 w-full rounded-lg pointer-events-none">
        <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-[120px] scale-y-50 translate-y-1/4"></div>
      </div>

      {/* Mobile Mist */}
      <div className="absolute md:hidden h-[800px] bottom-96 w-full rounded-lg pointer-events-none">
        <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-[120px] scale-y-50 translate-y-1/4"></div>
      </div>

      <div className="absolute md:hidden h-[800px] bottom-[750px] w-full rounded-lg pointer-events-none">
        <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-[120px] scale-y-50 translate-y-1/4"></div>
      </div>

      {/* Balloon Desktop */}
      <BalonUdara width={240} height={328} className="max-md:hidden absolute -z-20 bottom-30 left-12 animate-float pointer-events-none" />
      <BalonUdara width={100} height={130} className="max-md:hidden absolute top-0 -z-20 left-80 animate-float pointer-events-none" />
      <BalonUdara width={128} height={160} className="max-md:hidden absolute top-60 -z-20 right-20 animate-float pointer-events-none" />

      {/* Balloon Mobile */}
      <BalonUdara width={128} height={160} className="md:hidden absolute top-0 -z-20 right-0 animate-float pointer-events-none" />
      <BalonUdara width={56} height={96} className="md:hidden absolute top-30 -z-20 left-4 animate-float pointer-events-none" />
      <BalonUdara width={120} height={168} className="md:hidden absolute top-[750px] -z-20 right-0 animate-float pointer-events-none" />
      <BalonUdara width={120} height={168} className="md:hidden absolute top-[1200px] -z-20 left-0 animate-float pointer-events-none" />
      <BalonUdara width={120} height={168} className="md:hidden absolute top-[1550px] -z-20 right-10 animate-float pointer-events-none" />
    </>
  );
};
