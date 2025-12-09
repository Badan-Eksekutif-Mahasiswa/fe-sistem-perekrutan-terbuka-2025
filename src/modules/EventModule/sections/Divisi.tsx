"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { divisiData } from "../const";
import type { DivisiDataType } from "../type";
import { DiamondIcon, ClipboardListIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Divisi = () => {
  const [indexDivisi, setIndexDivisi] = useState(0);
  const divisiDipilih = divisiData[indexDivisi];

  return (
    <main className="min-h-screen flex px-5 py-2.5 gap-5 md:px-20 md:py-10 md:gap-10 flex-col items-center">
      <h1 className="text-h3 md:text-h1 text-white">Divisi-Divisi Kami</h1>
      {/*  Details Divisi Desktop */}
      <div className="flex max-md:hidden flex-col lg:flex-row gap-6">
        {/* List Divisi */}
        <div className="flex w-fit max-lg:hidden flex-col  justify-center gap-5 ">
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

        <div className="lg:hidden">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder="Multimedia"
                defaultValue={"multimedia"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {divisiData.map((item: DivisiDataType, i) => (
                  <SelectItem
                    onClick={() => setIndexDivisi(i)}
                    key={i}
                    value={item.nama.toLowerCase()}
                  >
                    {item.nama}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Divisi Content */}
        <div className="flex gap-5 flex-col">
          <div className="flex flex-col lg:flex-row gap-5">
            <div className="flex gap-5 flex-col w-fit">
              <Card className="text-center w-fit rounded-3xl z-20 justify-center flex flex-col">
                <CardContent className="gap-2 px-3 py-3">
                  <div className="max-lg:w-[72vw] w-72 h-72 relative rounded-lg overflow-hidden">
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
                    {divisiDipilih.bphName[0]}, {divisiDipilih.bphName[1]}
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
                <p className="text-p3 ">{divisiDipilih.desc}</p>
              </div>
              <div className="bg-gradient-card border-1 rounded-3xl flex-1 border-primary-300 p-6 gap-4 flex flex-col ">
                <h2 className="text-h2">Jobdesk</h2>
                <p className="text-p3 ">{divisiDipilih.jobdesc}</p>
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
      </div>

      {/* Details Divisi Mobile */}
      <div className="md:hidden flex flex-col items-center gap-5 w-full">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Multimedia" defaultValue={"multimedia"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {divisiData.map((item: DivisiDataType, i) => (
                <SelectItem
                  onClick={() => setIndexDivisi(i)}
                  key={i}
                  value={item.nama.toLowerCase()}
                >
                  {item.nama}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Tabs defaultValue="deskripsi" className="w-full flex items-center">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="deskripsi">Deskripsi</TabsTrigger>
            <TabsTrigger value="jobdesk">Jobdesk</TabsTrigger>
            <TabsTrigger value="kontak">Kontak</TabsTrigger>
          </TabsList>
          <TabsContent value="deskripsi" className="mt-4 text-white">
            <div className="bg-gradient-card border-1 rounded-3xl flex-1 border-primary-300 p-6 gap-4 flex flex-col ">
              <h2 className="text-h2">Deskripsi Divisi</h2>
              <p className="text-p3 ">{divisiDipilih.desc}</p>
            </div>
          </TabsContent>
          <TabsContent value="jobdesk" className="mt-4 text-white ">
            <div className="bg-gradient-card border-1 rounded-3xl flex-1 border-primary-300 p-6 gap-4 flex flex-col ">
              <h2 className="text-h2">Jobdesk</h2>
              <p className="text-p3 ">{divisiDipilih.jobdesc}</p>
            </div>
          </TabsContent>
          <TabsContent value="kontak" className="mt-4 text-white">
            <div className="flex gap-5 flex-col w-full items-center">
              <Card className="text-center w-full rounded-3xl z-20 justify-center items-center flex flex-col">
                <CardContent className="gap-2 px-3 py-3">
                  <div className="w-64 h-42 relative rounded-lg overflow-hidden">
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
              <div className="flex w-full flex-row gap-3 justify-between">
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
          </TabsContent>
        </Tabs>
        <Button
          variant={"secondary"}
          className="text-primary-500 items-center w-full text-center"
        >
          <ClipboardListIcon className="size-6" />
          <p className="text-m2">Daftar</p>
        </Button>
      </div>
    </main>
  );
};

export default Divisi;
