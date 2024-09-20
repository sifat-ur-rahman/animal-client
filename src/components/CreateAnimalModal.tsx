"use client";
import MyModal, { TModalOpenProps } from "./MyModal";
import { toast } from "sonner";
import { createAnimal } from "@/actions/createAnimal";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TCategory } from "@/type/type";
import { createAnimalFormValidationSchema } from "@/validation/createAnimalFormValidation";

type FormValues = z.infer<typeof createAnimalFormValidationSchema>;

type TCreateAnimalModalProps = Pick<TModalOpenProps, "isOpen" | "setIsOpen"> & {
  categories: TCategory[];
};

const CreateAnimalModal = ({
  isOpen,
  setIsOpen,
  categories,
}: TCreateAnimalModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createAnimalFormValidationSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    const { image, ...remainingData } = data;
    const formData = new FormData();
    formData.append("file", data.image[0]);
    formData.append(
      "data",
      JSON.stringify({ name: data.name, category: data.category })
    );
    console.log(data.category);
    try {
      const response = await createAnimal(formData);
      console.log(response);
      if (response?.success) {
        toast.success(response?.message);
        setIsOpen(false);
        reset();
      } else {
        toast.error(response?.message || "something went wrong");
        // reset();
      }
    } catch (error: any) {
      toast.success(error?.message || "something went wrong");
      // reset();
    }
  };

  return (
    <div>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} title="Add Animal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div>
              <input
                {...register("name")}
                className={`input ${
                  errors.name ? "border-red-500" : "border-[#FFFFFF]"
                }`}
                type="text"
                placeholder="Animal Name"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <input
                {...register("image")}
                className={`input ${
                  errors.name ? "border-red-500" : "border-[#FFFFFF]"
                }`}
                type="file"
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message as string}</p>
              )}
            </div>

            <div>
              <select
                {...register("category")}
                className={`input ${
                  errors.name ? "border-red-500" : "border-[#FFFFFF]"
                }`}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categories.map((category: TCategory) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </div>
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}

            <button
              type="submit"
              className="bg-black text-white py-3.5 pl-5 pr-4 w-[305px] border-[1px] border-[#FFFFFF] rounded-[8px] outline-none ring-offset-0 focus:outline-1 focus:outline-gray-300"
            >
              Save
            </button>
          </div>
        </form>
      </MyModal>
    </div>
  );
};

export default CreateAnimalModal;
