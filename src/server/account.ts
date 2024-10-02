"use server";

import { updateUserProfile } from "@utils/supabase/api/user";
import { createClient } from "@utils/supabase/server";
import { cloneDeep } from "lodash-es";
import { redirect } from "next/navigation";
import { type Tables } from "types/database";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().min(1, {
    message: "Nome deve essere almeno 1 carattere",
  }),
  preferred_ship_address: z.string().min(1, {
    message: "Indirizzo di consegna deve essere almeno 1 carattere",
  }),
  preferred_ship_hour: z
    .string()
    .time({ message: "Orario di consegna non è valido" }),
});

export async function updateUser(
  user: Tables<"profile">,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _: any,
  formData: FormData,
) {
  const client = createClient();

  const validatedFields = schema.safeParse({
    full_name: formData.get("full_name"),
    preferred_ship_address: formData.get("preferred_ship_address"),
    preferred_ship_hour: `${formData.get("preferred_ship_hour") as string}:00`,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const full_name = formData.get("full_name") as string;
  const preferred_ship_address = formData.get(
    "preferred_ship_address",
  ) as string;
  const preferred_ship_hour = formData.get("preferred_ship_hour") as string;
  const _user = {
    ...cloneDeep(user),
    full_name,
    preferred_ship_address,
    preferred_ship_hour,
  };

  const { error } = await updateUserProfile(client, _user);

  if (error) throw new Error(error.message);

  redirect("/dashboard");
}
