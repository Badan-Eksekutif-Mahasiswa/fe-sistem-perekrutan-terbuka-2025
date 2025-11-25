"use client";
import { useEffect, useState } from "react";
import FilterCard from "./components/FilterCard";
import { filterCategory, eventsData } from "./const";
import Image from "next/image";
import { AirBalloon } from "../../../public/svgs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SearchIcon,
  ArrowUpDown,
  DiamondIcon,
  XIcon,
  Check,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import EventCard from "./components/EventCard";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import type { EventType } from "./type";

const PendaftaranModule = () => {
  const [selectedCategoties, setSelectedCategories] = useState<
    Record<string, boolean>
  >({});
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvent, setFilteredEvent] =
    useState<readonly EventType[]>(eventsData);

  const [activeTab, setActiveTab] = useState("semua");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  const handleSearchQuery = () => {
    setSearchQuery(inputValue);
    setActiveTab("semua");
    setCurrentPage(1);
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

    const results = eventsData.filter((e) => {
      const isCategoryMatch =
        activeCategories.length === 0 ||
        e.categories.some((c) => activeCategories.includes(c));

      const isSearchMatch = e.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return isCategoryMatch && isSearchMatch;
    });

    const sortedResults = [...results].sort((a, b) => {
      const dateA = new Date(a.startedAt).getTime();
      const dateB = new Date(b.startedAt).getTime();

      const validDateA = isNaN(dateA) ? 0 : dateA;
      const validDateB = isNaN(dateB) ? 0 : dateB;

      if (sortOrder === "newest") {
        return validDateB - validDateA;
      } else {
        return validDateA - validDateB;
      }
    });

    setFilteredEvent(sortedResults);
    setCurrentPage(1);
  }, [selectedCategoties, searchQuery, sortOrder]);

  const getActiveTabList = () => {
    switch (activeTab) {
      case "dibuka":
        return filteredEvent.filter((e) => e.status === "Dibuka");
      case "akan datang":
        return filteredEvent.filter((e) => e.status === "Akan Datang");
      default:
        return filteredEvent;
    }
  };

  const activeList = getActiveTabList();
  const totalPages = Math.ceil(activeList.length / ITEMS_PER_PAGE);

  const displayEvents = activeList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const renderPaginationItems = () => {
    const items = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      items.push(1);

      if (currentPage <= 3) {
        items.push(2, 3);
        items.push("...");
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push("...");
        items.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        items.push("...");
        items.push(currentPage);
        items.push("...");
        items.push(totalPages);
      }
    }

    return items.map((item, index) => {
      if (item === "...") {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const pageNumber = item as number;
      return (
        <PaginationItem key={pageNumber}>
          <PaginationLink
            isActive={currentPage === pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className="cursor-pointer"
          >
            {pageNumber}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  return (
    <main className="min-h-screen relative mt-32">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>

      {/* Desktop Mist */}
      <div className="absolute max-md:hidden h-[800px] bottom-60 w-full  rounded-lg">
        <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-[120px] scale-y-50 translate-y-1/4"></div>
      </div>

      {/* Mobile Mist */}
      <div className="absolute md:hidden h-[800px] bottom-96 w-full  rounded-lg">
        <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-[120px] scale-y-50 translate-y-1/4"></div>
      </div>

      <div className="absolute md:hidden h-[800px] bottom-[750px] w-full  rounded-lg">
        <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-[120px] scale-y-50 translate-y-1/4"></div>
      </div>

      {/* Balloon Desktop */}
      <div
        className=" w-60 max-md:hidden absolute -z-20 bottom-30 left-12 h-82"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <AirBalloon />
      </div>
      <div
        className="w-25 max-md:hidden absolute top-0 -z-20 left-80 "
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <AirBalloon />
      </div>

      <div
        className="w-32 h-40 max-md:hidden absolute top-60 -z-20 right-20 "
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <AirBalloon />
      </div>

      {/* Balloon Mobile */}
      <div
        className="w-32 h-40 md:hidden absolute top-0 -z-20 right-0 "
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <AirBalloon />
      </div>

      <div
        className="w-14 h-24 md:hidden absolute top-30 -z-20 left-4 "
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <AirBalloon />
      </div>

      <div
        className="w-30 h-42 md:hidden absolute top-[750px] -z-20 right-0"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <AirBalloon />
      </div>

      <div
        className="w-30 h-42 md:hidden absolute top-[1200px] -z-20 left-0"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <AirBalloon />
      </div>

      <div
        className="w-30 h-42 md:hidden absolute top-[1550px] -z-20 right-10"
        style={{ animation: "float 4s ease-in-out infinite" }}
      >
        <AirBalloon />
      </div>

      <div className=" px-5 py-10 md:px-20 text-center gap-5 justify-center text-white flex flex-col">
        <h1 className="text-h3 md:text-h1">Cari Lowongan</h1>
        <p className="text-p4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid
          dicta vero dolorem eligendi sunt vitae facilis, maxime quae
          exercitationem praesentium incidunt quia illo nisi, voluptates
          aspernatur fugiat culpa repellendus non.
        </p>
        <div className="flex flex-col relative max-md:justify-center max-md:items-center lg:flex-row gap-5 w-full">
          <FilterCard
            filterCategory={filterCategory}
            selectedCategory={selectedCategoties}
            setSelectedCategory={setSelectedCategories}
          />
          <div className="flex flex-col w-full">
            <Tabs
              value={activeTab}
              onValueChange={(val) => {
                setActiveTab(val);
                setCurrentPage(1);
              }}
              className="gap-5 w-full"
            >
              <TabsList className="w-full max-md:h-12  h-14 ">
                <TabsTrigger className="h-14 max-md:h-12 " value="semua">
                  Semua
                </TabsTrigger>
                <TabsTrigger className="h-14 max-md:h-12 " value="dibuka">
                  Dibuka
                </TabsTrigger>
                <TabsTrigger className="h-14 max-md:h-12" value="akan datang">
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
                  className="rounded-xl w-16 font-bold text-primary-400 md:w-28"
                >
                  <p className={`max-md:hidden `}>Cari</p>

                  <SearchIcon className="size-6" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className=" ">
                      <ArrowUpDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 " align="start">
                    <DropdownMenuItem onClick={() => setSortOrder("newest")}>
                      Sort by Newest
                      {sortOrder === "newest" && <Check size={16} />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortOrder("oldest")}>
                      Sort by Oldest
                      {sortOrder === "oldest" && <Check size={16} />}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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

              <div className="space-y-5 mt-5">
                {displayEvents.length > 0 ? (
                  displayEvents.map((e) => (
                    <EventCard event={e} key={e.title} />
                  ))
                ) : (
                  <p className="text-neutral-400 mt-10">
                    Tidak ada lowongan yang cocok.
                  </p>
                )}
              </div>

              {totalPages > 1 && (
                <Pagination className="mt-2">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        className="cursor-pointer"
                        onClick={() =>
                          setCurrentPage((p) => Math.max(1, p - 1))
                        }
                        aria-disabled={currentPage === 1}
                      />
                    </PaginationItem>

                    {renderPaginationItems()}

                    <PaginationItem>
                      <PaginationNext
                        className="cursor-pointer"
                        onClick={() =>
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                        }
                        aria-disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PendaftaranModule;
