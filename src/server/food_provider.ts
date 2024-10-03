"use server";

import { createClient } from "@utils/supabase/server";
import { type Tables } from "types/database";

export async function getFoodProviders(): Promise<Tables<"food_provider">[]> {
  const client = createClient();

  const { data: food_providers, error } = await client
    .from("food_provider")
    .select();

  if (error) throw new Error(error.message);

  return food_providers as Tables<"food_provider">[];
}
