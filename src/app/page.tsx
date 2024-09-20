import React from "react";
import Categorries from "../components/Categorries";
import CreateCagetoryAndAnimalModalOpenButton from "@/components/CreateCagetoryAndAnimalModalOpenButton";
import Image from "next/image";
type TParmas = { searchParams: { category?: string } };
const HomePage = async ({ searchParams }: TParmas) => {
  const prams = new URLSearchParams(searchParams).toString();
  console.log(prams);
  const categoryResponse = await fetch(
    "https://animal-server-beta.vercel.app/api/v1/categories",
    {
      next: {
        tags: ["category"],
      },
    }
  );
  const categories = await categoryResponse.json();
  const animalResponse = await fetch(
    `https://animal-server-beta.vercel.app/api/v1/animals?${prams}`,
    {
      next: {
        tags: ["animals"],
      },
    }
  );
  const animals = await animalResponse.json();

  return (
    <div className="bg-black min-h-screen ">
      <div className="mx-auto px-20 pt-10">
        <div className=" grid grid-cols-2 lg:justify-between lg:items-center gap-6">
          <Categorries
            activeCategoryName={searchParams?.category || ""}
            categories={categories?.data}
          />
          <CreateCagetoryAndAnimalModalOpenButton
            categories={categories?.data || []}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 mt-14">
          {animals?.data.map((animal: any) => (
            <div key={animal?._id}>
              <div className="bg-[#050505] border-[2px] h-[191px] min-w-[160px] border-[#141414] flex justify-center items-center rounded-[8px]">
                <Image
                  height={191}
                  width={160}
                  src={animal.image}
                  alt={animal?.name}
                />
              </div>
              <h3 className="text-lg text-[#FFFFFF] text-center uppercase mt-2">
                {animal?.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
