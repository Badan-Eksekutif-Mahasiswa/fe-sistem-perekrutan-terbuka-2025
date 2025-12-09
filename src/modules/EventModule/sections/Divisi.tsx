"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { divisiData } from "../const";
import type { DivisiDataType } from "../type";
import { DiamondIcon, ClipboardListIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const Divisi = () => {
  const [indexDivisi, setIndexDivisi] = useState(0);
  const divisiDipilih = divisiData[indexDivisi];

  return (
    <main className="min-h-screen flex px-20 py-10 gap-10 flex-col items-center">
      <h1 className="text-h1 text-white">Divisi-Divisi Kami</h1>
      <div className="flex flex-row gap-6">
        {/* List Divisi */}
        <div className="flex w-fit flex-col gap-5 ">
          {divisiData.map((item: DivisiDataType, i) => (
            <Button
              key={i}
              className={`w-full md:w-55 hover:from-primary-200 active:to-primary-300 ${
                indexDivisi === i ? "from-primary-200" : "from-primary-300"
              } cursor-pointer to-primary-400 justify-start items-center`}
              onClick={() => setIndexDivisi(i)}
            >
              <DiamondIcon className="size-4" />
              <p className="text-p2">{item.nama}</p>
            </Button>
          ))}
        </div>

        {/* Details Divisi Desktop */}
        <div className="flex gap-5 max-md:hidden flex-col">
          <div className="flex flex-row gap-5">
            <div className="flex gap-5 flex-col w-fit">
              <Card className="text-center w-fit rounded-3xl z-20 justify-center flex flex-col">
                <CardContent className="gap-2 px-3 py-3">
                  <div className="w-72 h-72 relative rounded-lg overflow-hidden">
                    <Image
                      src={"/placeholder-1.webp"}
                      alt="Gambar PIC"
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-h3 ">
                    PIC & VPIC <br /> {divisiDipilih.nama}
                  </h3>
                  <p className="text-p3">
                    {divisiDipilih.bphName[0]} & Kak {divisiDipilih.bphName[1]}
                  </p>
                </CardContent>
              </Card>
              <div className="flex flex-row gap-3 justify-between">
                <Button variant={"stroke"} className="flex-1">
                  <DiamondIcon className="size-6" />{" "}
                  <p className="text-m2">PIC</p>
                </Button>
                <Button variant={"stroke"} className="flex-1">
                  <DiamondIcon className="size-6" />{" "}
                  <p className="text-m2">VPIC</p>
                </Button>
              </div>
            </div>
            <div className="flex flex-col h-full w-full justify-start text-white gap-5 ">
              <div className="bg-gradient-card border-1 rounded-3xl flex-1 border-primary-300 p-6 gap-4 flex flex-col ">
                <h2 className="text-h2">Deskripsi Divisi</h2>
                <p className="text-p3 mb">{divisiDipilih.desc}</p>
              </div>
              <div className="bg-gradient-card border-1 rounded-3xl flex-1 border-primary-300 p-6 gap-4 flex flex-col ">
                <h2 className="text-h2">Jobdesk</h2>
                <p className="text-p3 mb">{divisiDipilih.jobdesc}</p>
              </div>
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="text-primary-500 items-center text-center"
          >
            <ClipboardListIcon className="size-6" />
            <p className="text-m2">Daftar</p>
          </Button>
        </div>

        {/* Details Divisi Mobile */}
      </div>
    </main>
  );
};

export default Divisi;
