"use server";

import { getUserProfile } from "@utils/supabase/api/user";
import { createClient } from "@utils/supabase/server";
import { redirect } from "next/navigation";
import { type Tables } from "types/database";
import { z } from "zod";

export async function getMyCommands(): Promise<Tables<"command">[]> {
  const client = createClient();

  const { data: user } = await getUserProfile(client);

  if (!user) throw new Error("Unauthorized");

  // TODO retrieve commands where the user is the organizer OR where the user participate
  const { data: commands, error } = await client
    .from("command")
    .select()
    .eq("organizer", user.id)
    .order("delivery_datetime", { ascending: false });

  if (error) throw new Error(error.message);

  return commands as Tables<"command">[];
}

export async function getCommand(
  commandId: string,
): Promise<Tables<"command">> {
  const client = createClient();

  const { data: user } = await getUserProfile(client);

  if (!user) throw new Error("Unauthorized");

  const { data: command, error } = await client
    .from("command")
    .select("*")
    .eq("id", commandId)
    .limit(1);

  if (error) throw new Error(error.message);

  if (!command || command.length === 0) throw new Error("Found no result");

  if (command.length > 1) throw new Error("More than a result returned");

  return command[0] as Tables<"command">;
}

const saveCommandScheme = z.object({
  commandDate: z.string().date("Giorno di consegna non è valido"),
  commandTime: z.string().time({ message: "Orario di consegna non è valido" }),
  commandAddress: z.string().min(1, {
    message: "Indirizzo di consegna deve essere almeno 1 carattere",
  }),
  endHour: z.string().time({ message: "Scadenza non è valido" }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function saveCommand(_: any, formData: FormData) {
  const client = createClient();

  const { data: user } = await getUserProfile(client);

  if (!user) throw new Error("Unauthorized");

  const validatedFields = saveCommandScheme.safeParse({
    commandDate: formData.get("commandDate"),
    commandTime: `${formData.get("commandTime") as string}:00`,
    commandAddress: formData.get("commandAddress"),
    endHour: `${formData.get("endHour") as string}:00`,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const organizer = user.id;
  const delivery_datetime = new Date(
    `${formData.get("commandDate") as string} ${formData.get("commandTime") as string}`,
  ).toISOString();
  const delivery_address = formData.get("commandAddress") as string;
  const end_hour = formData.get("endHour") as string;
  const createdUpdatedAt = new Date().toISOString();

  const { error } = await client.from("command").insert([
    {
      organizer,
      food_provider_id: 1,
      delivery_address,
      created_at: createdUpdatedAt,
      updated_at: createdUpdatedAt,
      delivery_datetime,
      end_hour,
    },
  ]);

  if (error) throw new Error(error.message);

  redirect("/dashboard");
}
