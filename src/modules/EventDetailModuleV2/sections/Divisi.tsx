"use client";
import { useState } from "react";
import { Button } from "@/components/ui-legacy/button";
import { DiamondIcon, ClipboardListIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui-legacy/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-v2";
import { Event } from "@/types/event";
import { getEventStatus } from "@/lib/utils/event-transformer";

type DivisiProps = {
  event: Event;
};

const Divisi = ({ event }: DivisiProps) => {
  const [indexDivisi, setIndexDivisi] = useState(0);
  const divisiData = event.divisions || [];
  const divisiDipilih = divisiData[indexDivisi];
  const eventPath = event.eventCode;
  const isRegistrationClosed = getEventStatus(event) === "Ditutup";
  const isRegistrationUnavailable = isRegistrationClosed || !eventPath;
  const registrationButtonLabel = !eventPath ? "Slug belum tersedia" : "Pendaftaran Ditutup";

  if (!divisiData || divisiData.length === 0 || !divisiDipilih) {
    return (
      <main className="min-h-screen justify-center flex px-5 py-2.5 gap-5 md:px-20 md:py-10 md:gap-10 flex-col items-center text-center text-white">
        <h1 className="text-h3 md:text-h1">Divisi-Divisi Kami</h1>
        <p className="text-p4 text-neutral-300">Event ini belum memiliki divisi yang terdaftar.</p>
      </main>
    );
  }

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
              className={`w-full md:w-55 hover:brightness-110 overflow-hidden cursor-pointer justify-start items-center border-none ${
                indexDivisi === i 
                  ? "backdrop-blur-md text-white" 
                  : "bg-gradient-card-blue text-white/70 backdrop-blur-sm"
              }`}
              style={{
                backgroundImage: indexDivisi === i ? 'var(--gradient-card-blue)' : undefined,
                boxShadow: 'var(--shadow-glass)'
              }}
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
              <Card className="text-center w-fit rounded-3xl z-20 justify-center flex flex-col bg-gradient-card-blue border-none text-white shadow-glass backdrop-blur-md">
                <CardContent className="gap-2 px-3 py-3">
                  <div className="max-lg:w-[72vw] w-96 h-72 relative rounded-lg overflow-hidden">
                    <Image
                      src={divisiDipilih.cover || "/assets/logo-bem-ui.png"}
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
              <div className="bg-gradient-card-blue shadow-glass backdrop-blur-md rounded-3xl flex-1 border-none p-6 gap-4 flex flex-col text-white">
                <h2 className="text-h3">Deskripsi Divisi</h2>
                <p className="text-p4 ">
                  {divisiDipilih.description || "Tidak ada deskripsi"}
                </p>
              </div>
              <div className="bg-gradient-card-blue shadow-glass backdrop-blur-md rounded-3xl flex-1 border-none p-6 gap-4 flex flex-col text-white">
                <h2 className="text-h3">Jobdesk</h2>
                <p className="text-p4 ">
                  {divisiDipilih.jobdesc || "Tidak ada jobdesk"}
                </p>
              </div>
            </div>
          </div>
          {isRegistrationUnavailable ? (
            <Button
              className="w-full bg-marun/50 text-white cursor-not-allowed items-center text-center"
              style={{ boxShadow: 'var(--shadow-glass)' }}
              disabled
            >
              <ClipboardListIcon className="size-6" />
              <p className="text-m2">{registrationButtonLabel}</p>
            </Button>
          ) : (
            <Link href={`/${eventPath}/form`}>
              <Button
                className="w-full bg-marun text-white hover:bg-marun-light border-none items-center text-center"
                style={{ boxShadow: 'var(--shadow-glass)' }}
              >
                <ClipboardListIcon className="size-6" />
                <p className="text-m2">Daftar</p>
              </Button>
            </Link>
          )}
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
        <Tabs defaultValue="deskripsi" className="w-full flex flex-col items-center">
          <TabsList className="w-full h-14 max-md:h-12 max-w-md">
            <TabsTrigger className="h-14 max-md:h-12" value="deskripsi">Deskripsi</TabsTrigger>
            <TabsTrigger className="h-14 max-md:h-12" value="jobdesk">Jobdesk</TabsTrigger>
            <TabsTrigger className="h-14 max-md:h-12" value="kontak">Kontak</TabsTrigger>
          </TabsList>
          <TabsContent value="deskripsi" className="mt-4 text-white w-full">
            <div className="bg-gradient-card-blue shadow-glass backdrop-blur-md rounded-3xl flex-1 border-none p-6 gap-4 flex flex-col text-white">
              <h2 className="text-h2">Deskripsi Divisi</h2>
              <p className="text-p4 ">
                {divisiDipilih.description || "Tidak ada deskripsi"}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="jobdesk" className="mt-4 text-white w-full">
            <div className="bg-gradient-card-blue shadow-glass backdrop-blur-md rounded-3xl flex-1 border-none p-6 gap-4 flex flex-col text-white">
              <h2 className="text-h2">Jobdesk</h2>
              <p className="text-p4 ">
                {divisiDipilih.jobdesc || "Tidak ada jobdesk"}
              </p>
            </div>
          </TabsContent>
          <TabsContent value="kontak" className="mt-4 text-white w-full">
            <div className="flex gap-5 flex-col w-full items-center">
              <Card className="text-center w-full rounded-3xl z-20 justify-center items-center flex flex-col bg-gradient-card-blue border-none text-white shadow-glass backdrop-blur-md">
                <CardContent className="gap-2 px-3 py-3">
                  <div className="w-64 h-42 relative rounded-lg overflow-hidden">
                    <Image
                      src={divisiDipilih.cover || "/assets/logo-bem-ui.png"}
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
        {isRegistrationUnavailable ? (
          <Button
            className="w-full bg-marun/50 text-white cursor-not-allowed items-center text-center"
            style={{ boxShadow: 'var(--shadow-glass)' }}
            disabled
          >
            <ClipboardListIcon className="size-6" />
            <p className="text-m2">{registrationButtonLabel}</p>
          </Button>
        ) : (
          <Link href={`/${eventPath}/form`} className="w-full">
            <Button
              className="w-full bg-marun text-white hover:bg-marun-light border-none items-center text-center"
              style={{ boxShadow: 'var(--shadow-glass)' }}
            >
              <ClipboardListIcon className="size-6" />
              <p className="text-m2">Daftar</p>
            </Button>
          </Link>
        )}
      </div>
    </main>
  );
};

export default Divisi;
