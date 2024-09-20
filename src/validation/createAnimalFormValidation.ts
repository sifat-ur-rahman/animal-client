import { z } from "zod";

export const createAnimalFormValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z
    .any()
    .refine(
      (files) =>
        typeof window !== "undefined" &&
        files instanceof FileList &&
        files.length > 0,
      "Image is required"
    ),
  category: z.string().min(1, "Category is required"),
});
