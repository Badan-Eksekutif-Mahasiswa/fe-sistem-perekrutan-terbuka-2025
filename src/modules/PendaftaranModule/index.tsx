"use client";
import { useState } from "react";
import FilterCard from "./components/FilterCard";
import { FilterCategory } from "./const";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, ArrowUpDown, DiamondIcon, XIcon } from "lucide-react";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

const PendaftaranModule = () => {
  const [selectedCategoties, setSelectedCategories] = useState<
    Record<string, boolean>
  >({});

  return (
    <main className="min-h-screen mt-32">
      <div className="py-10 px-20 text-center gap-5 justify-center text-white flex flex-col">
        <h1 className="text-h1">Cari Lowongan</h1>
        <p className="text-p6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
          dicta vero dolorem eligendi sunt vitae facilis, maxime quae
          exercitationem praesentium incidunt quia illo nisi, voluptates
          aspernatur fugiat culpa repellendus non.
        </p>
        <div className="flex flex-col max-md:justify-center max-md:items-center md:flex-row gap-5 w-full">
          <FilterCard
            filterCategory={FilterCategory}
            selectedCategory={selectedCategoties}
            setSelectedCategory={setSelectedCategories}
          />
          <div className="flex flex-col w-full">
            <Tabs defaultValue="overview" className="gap-5 w-full">
              <TabsList className="w-full ">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>
              <div className="flex w-full gap-2.5">
                <Input className="grow min-w-0" />
                <Button variant="secondary" className="rounded-xl w-28">
                  Cari <SearchIcon />
                </Button>
                <Button variant="ghost" className=" ">
                  <ArrowUpDown />
                </Button>
              </div>
              <div className="flex text-center items-center flex-wrap gap-2.5">
                <h4 className="text-h4">Filter Terpasang: </h4>
                {Object.keys(selectedCategoties)
                  .filter((k) => selectedCategoties[k])
                  .map((k) => (
                    <Button key={k} variant="ghost">
                      <DiamondIcon /> {k}
                    </Button>
                  ))}
                <XIcon
                  onClick={() => setSelectedCategories({})}
                  className={`cursor-pointer ${
                    Object.keys(selectedCategoties).length === 0 && "hidden"
                  }`}
                />
              </div>
              <TabsContent
                value="overview"
                className="mt-4 p-4 bg-neutral-100/5 rounded-lg"
              >
                <p className="text-p4 text-neutral-200">
                  Overview content goes here.
                </p>
              </TabsContent>
              <TabsContent
                value="features"
                className="mt-4 p-4 bg-neutral-100/5 rounded-lg"
              >
                <p className="text-p4 text-neutral-200">
                  Features content goes here.
                </p>
              </TabsContent>
              <TabsContent
                value="pricing"
                className="mt-4 p-4 bg-neutral-100/5 rounded-lg"
              >
                <p className="text-p4 text-neutral-200">
                  Pricing content goes here.
                </p>
              </TabsContent>
              <TabsContent
                value="support"
                className="mt-4 p-4 bg-neutral-100/5 rounded-lg"
              >
                <p className="text-p4 text-neutral-200">
                  Support content goes here.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PendaftaranModule;
