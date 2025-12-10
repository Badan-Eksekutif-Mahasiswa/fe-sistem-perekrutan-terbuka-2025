"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DiamondIcon, ClipboardListIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Event } from "@/types/event";

type DivisiProps = {
  event: Event;
};

const Divisi = ({ event }: DivisiProps) => {
  const [indexDivisi, setIndexDivisi] = useState(0);
  const divisiData = event.divisions;
  const divisiDipilih = divisiData[indexDivisi];

  // Get PIC names from PIC array/object
  let picData: Array<{ name: string; contact: string }> = [];

  if (Array.isArray(divisiDipilih?.PIC)) {
    picData = divisiDipilih.PIC as Array<{ name: string; contact: string }>;
  } else if (divisiDipilih?.PIC && typeof divisiDipilih.PIC === "object") {
    // If PIC is an object, try to extract data
    const picObj = divisiDipilih.PIC as Record<string, unknown>;
    if (picObj.name && picObj.contact) {
      picData = [
        {
          name: picObj.name as string,
          contact: picObj.contact as string,
        },
      ];
    }
  }

  const bphNames =
    picData.length > 0 ? picData.map((p) => p.name).join(" dan ") : "PIC Name";

  return (
    <main className=" min-h-screen justify-center flex px-5 py-2.5 gap-5 md:px-20 md:py-10 md:gap-10 flex-col items-center">
      <h1 className="text-h3 md:text-h1 text-white">Divisi-Divisi Kami</h1>
      {/*  Details Divisi Desktop */}
      <div className="flex max-md:hidden flex-col lg:flex-row gap-6">
        {/* List Divisi */}
        <div className="flex w-fit max-lg:hidden flex-col  gap-5 ">
          {divisiData.map((item, i) => (
            <Button
              key={item.id}
              className={`w-full md:w-55 hover:from-primary-200 overflow-hidden active:to-primary-300 ${
                indexDivisi === i ? "from-primary-200" : "from-primary-300"
              } cursor-pointer to-primary-400 justify-start items-center`}
              onClick={() => setIndexDivisi(i)}
            >
              <DiamondIcon className="size-4" />
              <p className="text-p4">{item.name}</p>
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
                {divisiData.map((item, i) => (
                  <SelectItem
                    onClick={() => setIndexDivisi(i)}
                    key={item.id}
                    value={item.name.toLowerCase()}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Divisi Content */}
        <div className="flex gap-5 flex-col">
          <div className="flex flex-col items-center lg:flex-row gap-5">
            <div className="flex gap-5 flex-col w-fit">
              <Card className="text-center w-fit rounded-3xl z-20 justify-center flex flex-col">
                <CardContent className="gap-2 px-3 py-3">
                  <div className="max-lg:w-[72vw] w-96 h-72 relative rounded-lg overflow-hidden">
                    <Image
                      src={"/placeholder-1.webp"}
                      alt="Gambar PIC"
                      layout="fill"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-h4 ">
                    PIC <br /> {divisiDipilih.name}
                  </h3>
                  <p className="text-p3">{bphNames}</p>
                </CardContent>
              </Card>
              <div className="flex flex-row gap-3 justify-between">
                {picData.map((pic, idx) => (
                  <Button key={idx} variant={"stroke"} className="flex-1">
                    <DiamondIcon className="size-6" />{" "}
                    <p className="text-m2">{pic.contact}</p>
                  </Button>
                ))}
                {picData.length === 0 && (
                  <Button variant={"stroke"} className="flex-1">
                    <DiamondIcon className="size-6" />{" "}
                    <p className="text-m2">PIC</p>
                  </Button>
                )}
              </div>
            </div>
            <div className="flex flex-col h-full w-full justify-start text-white gap-5 ">
              <div className="bg-gradient-card border-1 rounded-3xl flex-1 border-primary-300 p-6 gap-4 flex flex-col ">
                <h2 className="text-h3">Deskripsi Divisi</h2>
                <p className="text-p4 ">
                  {divisiDipilih.description || "Tidak ada deskripsi"}
                </p>
              </div>
              <div className="bg-gradient-card border-1 rounded-3xl flex-1 border-primary-300 p-6 gap-4 flex flex-col ">
                <h2 className="text-h3">Jobdesk</h2>
                <p className="text-p4 ">
                  {divisiDipilih.jobdesc || "Tidak ada jobdesk"}
                </p>
              </div>
            </div>
          </div>
          <Link href={`/${event.id}/form`}>
            <Button
              variant={"secondary"}
              className="text-primary-500 items-center text-center w-full"
            >
              <ClipboardListIcon className="size-6" />
              <p className="text-m2">Daftar</p>
            </Button>
          </Link>
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
              {divisiData.map((item, i) => (
                <SelectItem
                  onClick={() => setIndexDivisi(i)}
                  key={item.id}
                  value={item.name.toLowerCase()}
                >
                  {item.name}
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
              <p className="text-p4 ">
                {divisiDipilih.description || "Tidak ada deskripsi"}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="jobdesk" className="mt-4 text-white ">
            <div className="bg-gradient-card border-1 rounded-3xl flex-1 border-primary-300 p-6 gap-4 flex flex-col ">
              <h2 className="text-h2">Jobdesk</h2>
              <p className="text-p4 ">
                {divisiDipilih.jobdesc || "Tidak ada jobdesk"}
              </p>
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
                    PIC <br /> {divisiDipilih.name}
                  </h3>
                  <p className="text-p3">{bphNames}</p>
                </CardContent>
              </Card>
              <div className="flex w-full flex-row gap-3 justify-between">
                {picData.map((pic, idx) => (
                  <Button key={idx} variant={"stroke"} className="flex-1">
                    <DiamondIcon className="size-6" />{" "}
                    <p className="text-m2">{pic.contact}</p>
                  </Button>
                ))}
                {picData.length === 0 && (
                  <Button variant={"stroke"} className="flex-1">
                    <DiamondIcon className="size-6" />{" "}
                    <p className="text-m2">PIC</p>
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <Link href={`/${event.id}/form`} className="w-full">
          <Button
            variant={"secondary"}
            className="text-primary-500 items-center w-full text-center"
          >
            <ClipboardListIcon className="size-6" />
            <p className="text-m2">Daftar</p>
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default Divisi;
