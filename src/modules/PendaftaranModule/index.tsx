"use client";

import {
  SearchIcon,
  ArrowUpDown,
  DiamondIcon,
  XIcon,
  Check,
} from "lucide-react";
import FilterCard from "./components/FilterCard";
import EventCard from "./components/EventCard";
import { BackgroundDecoration } from "./components/BackgroundDecoration";
import { useEventFiltering, TabType } from "./hooks/useEventFiltering";
import { filterCategory } from "./const";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Event } from "@/types/event";
import { transformEventsToEventTypes } from "@/lib/utils/event-transformer";

type PendaftaranModuleProps = {
  events: Event[];
};

const PendaftaranModule = ({ events }: PendaftaranModuleProps) => {
  const transformedEvents = transformEventsToEventTypes(events);

  const {
    inputValue,
    setInputValue,
    activeTab,
    setActiveTab,
    sortOrder,
    setSortOrder,
    currentPage,
    setCurrentPage,
    selectedCategories,
    setSelectedCategories,
    handleSearch,
    clearFilters,
    removeCategory,
    paginatedEvents,
    totalPages,
  } = useEventFiltering({ events: transformedEvents });

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

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
      <BackgroundDecoration />

      <div className="px-5 py-10 md:px-20 text-center gap-5 justify-center text-white flex flex-col">
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
            selectedCategory={selectedCategories}
            setSelectedCategory={setSelectedCategories}
          />

          <div className="flex flex-col w-full">
            <Tabs
              value={activeTab}
              onValueChange={(val) => {
                setActiveTab(val as TabType);
                setCurrentPage(1);
              }}
              className="gap-5 w-full"
            >
              <TabsList className="w-full max-md:h-12 h-14">
                <TabsTrigger className="h-14 max-md:h-12" value="semua">
                  Semua
                </TabsTrigger>
                <TabsTrigger className="h-14 max-md:h-12" value="dibuka">
                  Dibuka
                </TabsTrigger>
                <TabsTrigger className="h-14 max-md:h-12" value="akan datang">
                  Akan Datang
                </TabsTrigger>
              </TabsList>

              {/* Search & Sort Bar */}
              <div className="flex w-full gap-2.5">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="grow min-w-0"
                  onKeyDown={handleKeyEnter}
                  placeholder="Cari posisi..."
                />
                <Button
                  onClick={handleSearch}
                  variant="secondary"
                  className="rounded-xl w-16 font-bold text-primary-400 md:w-28"
                >
                  <p className="max-md:hidden">Cari</p>
                  <SearchIcon className="size-6" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <ArrowUpDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="start">
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

              {/* Active Filters */}
              <div className="flex text-center items-center flex-wrap gap-2.5">
                <h4 className="text-h4">Filter Terpasang: </h4>
                {Object.keys(selectedCategories)
                  .filter((k) => selectedCategories[k])
                  .map((k) => (
                    <Button
                      className="rounded-full"
                      key={k}
                      size="md"
                      variant="ghost"
                      onClick={() => removeCategory(k)}
                    >
                      <DiamondIcon /> {k}
                    </Button>
                  ))}

                <XIcon
                  onClick={clearFilters}
                  className={`cursor-pointer ${
                    Object.keys(selectedCategories).filter(
                      (k) => selectedCategories[k]
                    ).length === 0 && "hidden"
                  }`}
                />
              </div>

              {/* Event Cards */}
              <div className="space-y-5 mt-5">
                {paginatedEvents.length > 0 ? (
                  paginatedEvents.map((e) => <EventCard event={e} key={e.id} />)
                ) : (
                  <p className="text-neutral-400 mt-10">
                    Tidak ada lowongan yang cocok.
                  </p>
                )}
              </div>

              {/* Pagination */}
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
