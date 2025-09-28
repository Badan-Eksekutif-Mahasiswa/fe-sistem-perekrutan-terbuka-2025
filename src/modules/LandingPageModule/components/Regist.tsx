import { UserRound, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const regists: { title: string; desc: string }[] = [
  {
    title: "DAFTAR SEBAGAI PESERTA?",
    desc: "Ayo berkontribusi dan temukan kegiatan yang menarik untuk kamu ikuti!",
  },
  {
    title: "DAFTAR SEBAGAI PANITIA?",
    desc: "Buat kegiatan dan temukan tim terbaikmu!",
  },
];

const Regist = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col  text-center px-10 ">
        <p className="text-5xl max-md:text-2xl font-bold text-primary-400 mb-20">
          Registration
        </p>
        <div className="flex max-md:flex-col flex-row justify-center gap-3 md:gap-20 ">
          {regists.map((regist, index) => (
            <div
              key={index}
              className="bg-gradient-to-br h-96 md:w-xl flex flex-col items-center justify-center rounded-xl  from-primary-300 to-primary-400  text-white px-8 py-12 text-center"
            >
              <p className="max-md:text-lg text-3xl font-bold md:mb-6">
                {regist.title}
              </p>
              <p className="max-md:text-sm text-xl">{regist.desc}</p>
              <div className="flex w-full items-end justify-center md:mt-12">
                <Button variant={"primary"} className="max-md:text-sm w-full">
                  Daftar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Regist;
