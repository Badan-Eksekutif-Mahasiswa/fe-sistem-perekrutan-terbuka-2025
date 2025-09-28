import Image from "next/image";

const WhatIsSpt = () => {
  return (
    <>
      <div className="min-h-screen px-5 md:px-20">
        <div className="flex relative flex-col border-4 overflow-hidden items-center max-md:gap-5 gap-20 border-primary-400 rounded-xl px-4 sm:px-20 py-10">
          <div className="max-sm:w-32 max-sm:h-32 max-sm:-left-6 max-lg:w-48 max-lg:h-48 w-72 h-72 absolute top-0 -left-13">
            <Image src={"/assets/asset-3.svg"} alt="aset" fill />
          </div>
          <div className="max-sm:w-32 max-sm:h-32 max-sm:-right-6 max-lg:w-48 max-lg:h-48  w-72 h-72 absolute top-0 -right-13">
            <Image src={"/assets/asset-2.svg"} alt="aset" fill />
          </div>
          <div className="max-lg:w-48 max-lg:h-48 w-72 h-72 relative md:pr-72">
            <Image
              src={"/logo/logo-color.png"}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="items-center flex flex-col text-center">
            <p className="text-xl md:text-5xl mb-5 text-primary-400 font-bold ">
              Apa itu Sistem Perekrutan Terbuka?
            </p>
            <p className="text-sm md:text-lg ">
              Sistem Perekrutan Terbuka (SPT) adalah sebuah wadah terintegrasi
              untuk kamu yang sedang membutuhkan tim untuk bergabung dengan
              suatu kegiatan atau organisasi, dan untuk kamu yang sedang mencari
              kegiatan atau organisasi untuk kamu ikuti. SPT memfasilitasi
              mahasiswa khususnya mahasiswa UI untuk mempermudah proses
              perekrutan dan pendaftaran.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIsSpt;
