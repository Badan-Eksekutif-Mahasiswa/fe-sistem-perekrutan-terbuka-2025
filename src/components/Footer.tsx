import Image from "next/image";

const Footer = () => {
  return (
    <>
      <div className="w-screen flex justify-between flex-row px-5 py-2 text-white bg-gradient-to-br from-primary-300 to-primary-400">
        <div>
          <div className="relative h-28 w-28 md:w-42">
            <Image
              src={"/logo/logo-text.png"}
              alt="Logo SPT"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-neutral-100 text-sm md:text-md">
            @2025 - Badan Eksekutif Mahasiswa Universitas Indonesia
          </p>
        </div>
        <div className="relative h-28 w-60 md:w-68">
          <Image
            src={"/mulmed-logo.png"}
            alt="Logo SPT"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
