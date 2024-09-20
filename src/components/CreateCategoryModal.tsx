"use client";
import React, { ChangeEvent, useState } from "react";
import MyModal, { TModalOpenProps } from "./MyModal";
import { toast } from "sonner";
import { createCategory } from "@/actions/createCategory";

type TCreateCategoryModalProps = Pick<TModalOpenProps, "isOpen" | "setIsOpen">;

const CreateCategoryModal = ({
  isOpen,
  setIsOpen,
}: TCreateCategoryModalProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const onSubmit = async () => {
    if (!inputValue) {
      return toast.error("Please write a category name");
    }
    try {
      const response = await createCategory({ categoryName: inputValue });
      console.log(response);

      if (response?.success) {
        toast.success(response?.message);
        setIsOpen(false);
      } else {
        toast.error(response?.message || "something went wrong");
      }
    } catch (error: any) {
      toast.success(error?.message || "something went wrong");
    }
  };

  return (
    <div>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} title="Add Category">
        <div className="flex flex-col gap-6">
          <input
            placeholder="Category Name"
            className="input"
            onChange={handleInputChange}
            type="text"
          />
          <button onClick={onSubmit} className="btn">
            Save
          </button>
        </div>
      </MyModal>
    </div>
  );
};

export default CreateCategoryModal;
