"use client";
import { useState } from "react";
import { SquareIcon, SquareCheckBigIcon } from "lucide-react";
import AnimatedPuzzle from "@/components/elements/AnimatedPuzzle";

type FilterCategoryType = {
  type: string;
  categories: string[];
};

type FilterCardProps = {
  filterCategory: FilterCategoryType[];
  selectedCategory: Record<string, boolean>;
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
};

const FilterCard = ({
  filterCategory,
  selectedCategory,
  setSelectedCategory,
}: FilterCardProps) => {
  const toggleSelected = (name: string) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="text-white w-md overflow-hidden p-6 border-1 h-fit bg-gradient-card relative text-start border-primary-300 flex flex-col rounded-xl gap-5">
      <h2 className="text-h2">Filter</h2>
      <div className="flex flex-col p-2 gap-4">
        {filterCategory.map((category, i) => (
          <div key={i} className="space-y-2">
            <h4 className="text-h4">{category.type}</h4>
            <div className="space-y-3 p-2">
              {category.categories.map((c, i) => {
                return (
                  <p
                    className="text-p3 flex gap-2 text-center items-center"
                    key={i}
                  >
                    {" "}
                    <span
                      className="cursor-pointer"
                      onClick={() => toggleSelected(c)}
                    >
                      {selectedCategory[c] ? (
                        <SquareCheckBigIcon />
                      ) : (
                        <SquareIcon />
                      )}
                    </span>{" "}
                    {c}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute z-0 inset-0 flex justify-end -bottom-96 -right-60 items-center pointer-events-none">
        <AnimatedPuzzle
          width={800}
          height={700}
          className="opacity-40 rotate-45 "
        />
      </div>
    </div>
  );
};

export default FilterCard;
