"use client";
import { useEffect, useState } from "react";
import FilterCard from "./components/FilterCard";
import { FilterCategory, Events } from "./const";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, ArrowUpDown, DiamondIcon, XIcon } from "lucide-react";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import EventCard from "./components/EventCard";

import type { EventType } from "./type";

const PendaftaranModule = () => {
  const [selectedCategoties, setSelectedCategories] = useState<
    Record<string, boolean>
  >({});

  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredEvent, setFilteredEvent] =
    useState<readonly EventType[]>(Events);
  const [activeTab, setActiveTab] = useState("semua");

  const handleSearchQuery = () => {
    setSearchQuery(inputValue);
    setActiveTab("semua");
  };

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchQuery();
    }
  };

  useEffect(() => {
    const activeCategories = Object.keys(selectedCategoties).filter(
      (key) => selectedCategoties[key]
    );

    const results = Events.filter((e) => {
      const isCategoryMatch =
        activeCategories.length === 0 ||
        e.categories.some((cat) => activeCategories.includes(cat));

      const isSearchMatch = e.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return isCategoryMatch && isSearchMatch;
    });

    setFilteredEvent(results);
  }, [selectedCategoties, searchQuery]);

  const eventDibuka = filteredEvent.filter((e) => e.status === "Dibuka");
  const eventAkanDatang = filteredEvent.filter(
    (e) => e.status === "Akan Datang"
  );

  return (
    <main className="min-h-screen mt-32">
      <div className="py-10 px-20 text-center gap-5 justify-center text-white flex flex-col">
        <h1 className="text-h1">Cari Lowongan</h1>
        <p className="text-p4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
          dicta vero dolorem eligendi sunt vitae facilis, maxime quae
          exercitationem praesentium incidunt quia illo nisi, voluptates
          aspernatur fugiat culpa repellendus non.
        </p>
        <div className="flex flex-col relative max-md:justify-center max-md:items-center md:flex-row gap-5 w-full">
          <FilterCard
            filterCategory={FilterCategory}
            selectedCategory={selectedCategoties}
            setSelectedCategory={setSelectedCategories}
          />
          <div className="flex flex-col w-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="gap-5 w-full"
            >
              <TabsList className="w-full md:h-14">
                <TabsTrigger className="md:h-14 w-full" value="semua">
                  Semua
                </TabsTrigger>
                <TabsTrigger className="md:h-14" value="dibuka">
                  Dibuka
                </TabsTrigger>
                <TabsTrigger className="md:h-14" value="akan datang">
                  Akan Datang
                </TabsTrigger>
              </TabsList>
              <div className="flex w-full gap-2.5">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="grow min-w-0"
                  onKeyDown={handleKeyEnter}
                  placeholder="Cari posisi..."
                />
                <Button
                  onClick={handleSearchQuery}
                  variant="secondary"
                  className="rounded-xl w-28"
                >
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
                    <Button
                      className="rounded-full"
                      key={k}
                      size={"md"}
                      variant="ghost"
                      onClick={() =>
                        setSelectedCategories((prev) => ({
                          ...prev,
                          [k]: false,
                        }))
                      }
                    >
                      <DiamondIcon /> {k}
                    </Button>
                  ))}

                <XIcon
                  onClick={() => {
                    setSelectedCategories({});
                    setSearchQuery("");
                    setInputValue("");
                  }}
                  className={`cursor-pointer ${
                    Object.keys(selectedCategoties).filter(
                      (k) => selectedCategoties[k]
                    ).length === 0 && "hidden"
                  }`}
                />
              </div>

              {/* TABS CONTENT */}
              <TabsContent value="semua" className="space-y-5">
                {filteredEvent.length > 0 ? (
                  filteredEvent.map((e, i) => <EventCard event={e} key={i} />)
                ) : (
                  <p className="text-neutral-400 mt-10">Tidak ditemukan.</p>
                )}
              </TabsContent>
              <TabsContent value="dibuka" className="space-y-5">
                {eventDibuka.length > 0 ? (
                  eventDibuka.map((e, i) => <EventCard event={e} key={i} />)
                ) : (
                  <p className="text-neutral-400 mt-10">
                    Tidak ada lowongan dibuka yang cocok.
                  </p>
                )}
              </TabsContent>
              <TabsContent value="akan datang" className="space-y-5">
                {eventAkanDatang.length > 0 ? (
                  eventAkanDatang.map((e, i) => <EventCard event={e} key={i} />)
                ) : (
                  <p className="text-neutral-400 mt-10">
                    Tidak ada lowongan akan datang yang cocok.
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PendaftaranModule;
