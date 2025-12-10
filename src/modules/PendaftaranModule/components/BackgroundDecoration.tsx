import { AirBalloon } from "../../../../public/svgs/AirBaloon";

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
      <div className="w-60 max-md:hidden absolute -z-20 bottom-30 left-12 h-82 animate-float pointer-events-none">
        <AirBalloon />
      </div>
      <div className="w-25 max-md:hidden absolute top-0 -z-20 left-80 animate-float pointer-events-none">
        <AirBalloon />
      </div>
      <div className="w-32 h-40 max-md:hidden absolute top-60 -z-20 right-20 animate-float pointer-events-none">
        <AirBalloon />
      </div>

      {/* Balloon Mobile */}
      <div className="w-32 h-40 md:hidden absolute top-0 -z-20 right-0 animate-float pointer-events-none">
        <AirBalloon />
      </div>
      <div className="w-14 h-24 md:hidden absolute top-30 -z-20 left-4 animate-float pointer-events-none">
        <AirBalloon />
      </div>
      <div className="w-30 h-42 md:hidden absolute top-[750px] -z-20 right-0 animate-float pointer-events-none">
        <AirBalloon />
      </div>
      <div className="w-30 h-42 md:hidden absolute top-[1200px] -z-20 left-0 animate-float pointer-events-none">
        <AirBalloon />
      </div>
      <div className="w-30 h-42 md:hidden absolute top-[1550px] -z-20 right-10 animate-float pointer-events-none">
        <AirBalloon />
      </div>
    </>
  );
};
