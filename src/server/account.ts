import "server-only";

import { updateUserProfile } from "@utils/supabase/api/user";
import { createClient } from "@utils/supabase/server";
import { cloneDeep } from "lodash-es";
import { redirect } from "next/navigation";
import { type Tables } from "types/database";

export async function updateUser(user: Tables<"profile">, formData: FormData) {
  "use server";

  const client = createClient();

  const full_name = formData.get("full_name") as string;
  const preferred_ship_address = formData.get("preferred_ship_address") as string;
  const preferred_ship_hour = formData.get("preferred_ship_hour") as string;
  const _user = { ...cloneDeep(user), full_name, preferred_ship_address, preferred_ship_hour };

  const { error } = await updateUserProfile(client, _user);

  if (error) throw new Error(error.message);

  redirect("/dashboard");
}
