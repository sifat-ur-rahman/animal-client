"use client";
import React, { useState } from "react";
import CreateCategoryModal from "./CreateCategoryModal";
import { TCategory } from "@/type/type";
import CreateAnimalModal from "./CreateAnimalModal";

const CreateCagetoryAndAnimalModalOpenButton = ({
  categories,
}: {
  categories: TCategory[];
}) => {
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const handleCreateCategoryModalOpen = () => {
    setIsCreateCategoryModalOpen((prev) => !prev);
  };

  const [isCreateAnimalModalOpen, setIsCreateAnimalModalOpen] = useState(false);
  const handleCreateAnimalModalOpen = () => {
    setIsCreateAnimalModalOpen((prev) => !prev);
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={handleCreateAnimalModalOpen}
        className={`btn-outline text-white`}
      >
        Add Animal
      </button>
      <button
        onClick={handleCreateCategoryModalOpen}
        className={`btn-outline text-white  ml-3 md:ml-6 `}
      >
        Add Category
      </button>
      {isCreateCategoryModalOpen && (
        <CreateCategoryModal
          isOpen={isCreateCategoryModalOpen}
          setIsOpen={setIsCreateCategoryModalOpen}
        />
      )}
      {isCreateAnimalModalOpen && (
        <CreateAnimalModal
          isOpen={isCreateAnimalModalOpen}
          setIsOpen={setIsCreateAnimalModalOpen}
          categories={categories}
        />
      )}
    </div>
  );
};

export default CreateCagetoryAndAnimalModalOpenButton;
