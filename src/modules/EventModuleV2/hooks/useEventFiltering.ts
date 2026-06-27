import { useState, useMemo } from "react";
import { EventType } from "../type";

type SortOrder = "newest" | "oldest";
export type TabType = "semua" | "dibuka" | "akan datang";

type UseEventFilteringProps = {
  events: EventType[];
};

export const useEventFiltering = ({ events }: UseEventFilteringProps) => {
  const [selectedCategories, setSelectedCategories] = useState<
    Record<string, boolean>
  >({});
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("semua");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  const handleSearch = () => {
    setSearchQuery(inputValue);
    setActiveTab("semua");
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedCategories({});
    setSearchQuery("");
    setInputValue("");
    setCurrentPage(1);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
    setCurrentPage(1);
  };

  const removeCategory = (category: string) => {
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: false,
    }));
    setCurrentPage(1);
  };

  const filteredEvents = useMemo(() => {
    const activeCategoryList = Object.keys(selectedCategories).filter(
      (key) => selectedCategories[key]
    );

    return events
      .filter((event) => {
        // Category Filter
        const isCategoryMatch =
          activeCategoryList.length === 0 ||
          event.categories.some((c) => activeCategoryList.includes(c));

        // Search Filter
        const isSearchMatch = event.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        // Tab Status Filter
        const isStatusMatch =
          activeTab === "semua" ||
          (activeTab === "dibuka" && event.status === "Dibuka") ||
          (activeTab === "akan datang" && event.status === "Akan Datang");

        return isCategoryMatch && isSearchMatch && isStatusMatch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.startedAt).getTime();
        const dateB = new Date(b.startedAt).getTime();
        const validDateA = isNaN(dateA) ? 0 : dateA;
        const validDateB = isNaN(dateB) ? 0 : dateB;

        return sortOrder === "newest"
          ? validDateB - validDateA
          : validDateA - validDateB;
      });
  }, [events, selectedCategories, searchQuery, activeTab, sortOrder]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);

  return {
    // State
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

    // Actions
    handleSearch,
    clearFilters,
    toggleCategory,
    removeCategory,

    // Data
    filteredEvents,
    paginatedEvents,
    totalPages,
  };
};
