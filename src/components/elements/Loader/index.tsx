import Image from "next/legacy/image";

const Loader = () => {
  return (
    <div className="min-h-screen animate-pulse text-neutral-50 font-jakarta flex flex-col justify-center items-center">
      <div className="relative w-48 h-48">
        <Image
          src="/logo-clean.webp"
          alt="loader"
          layout="fill"
          className="object-contain"
        />
      </div>
      <p className="text-m2 ml-5">Loading...</p>
    </div>
  );
};
export default Loader;
