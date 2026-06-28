"use client";
import { SquareIcon, SquareCheckBigIcon } from "lucide-react";
import Image from "next/image";
import type { FilterCategoryType } from "../type";

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
    <div className="text-white min-w-0 w-full lg:max-w-sm overflow-hidden p-6 border-1 h-fit bg-gradient-card-glass backdrop-blur-sm relative text-start border-primary-300 flex flex-col rounded-xl gap-5">
      <h2 className="text-h2 max-md:text-center">Filter</h2>
      <div className="flex lg:flex-col flex-wrap justify-between p-2 gap-4">
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
      <div className="absolute z-0 -bottom-20 -right-20 w-60 h-60 opacity-15 pointer-events-none rotate-45" aria-hidden="true">
        <Image src="/assets/spt-pattern.png" alt="" fill className="object-contain" />
      </div>
    </div>
  );
};

export default FilterCard;
