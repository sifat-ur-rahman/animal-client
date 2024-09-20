"use client";
import { TCategory } from "@/type/type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const Categorries = ({
  categories,
  activeCategoryName,
}: {
  categories: TCategory[];
  activeCategoryName: string;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const [activeCategory, setActiveCategory] = useState(activeCategoryName);
  const handleActive = (categoryName: string) => {
    setActiveCategory((prev) => (prev = categoryName));
    params.set("category", categoryName);

    router.replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className="">
      {categories?.map((category, index) => (
        <button
          key={index}
          onClick={() => handleActive(category._id)}
          className={`btn-outline m-2 ${
            category._id === activeCategory
              ? "border-[#058F34] text-[#058F34]"
              : "border-[#EF0D0D] text-[#EF0D0D]"
          }`}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
};

export default Categorries;
