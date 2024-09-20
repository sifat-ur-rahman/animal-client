"use server";

import { revalidateTag } from "next/cache";

export const createCategory = async (data: any) => {
  const response = await fetch(
    "https://animal-server-beta.vercel.app/api/v1/categories/create-category",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  revalidateTag("category");
  return await response.json();
};
