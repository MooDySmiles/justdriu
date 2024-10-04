import {
  type PostgrestSingleResponse,
  type SupabaseClient,
} from "@supabase/supabase-js";
import { type Database, type Tables, type TablesUpdate } from "types/database";

/**
 * If not id given the function return info of current users
 * If not id given and not authenticated throw error "User not authenticated"
 *
 * @param client supabase client
 * @param id is a uuid of a user
 * @returns custom info of user
 */
export async function getUserProfile(
  client: SupabaseClient<Database>,
  id?: string,
): Promise<PostgrestSingleResponse<Tables<"profile">>> {
  const userId = id ?? (await client.auth.getUser()).data.user?.id;

  if (!userId) throw new Error("User not authenticated");

  return client
    .from("profile")
    .select("*")
    .eq("id", userId)
    .throwOnError()
    .single();
}

export async function updateUserProfile(
  client: SupabaseClient<Database>,
  data: TablesUpdate<"profile">,
) {
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user?.id) throw new Error("User not authenticated");

  const result = client
    .from("profile")
    .update({
      avatar_url: data.avatar_url ?? null,
      full_name: data.full_name ?? null,
      preferred_ship_address: data.preferred_ship_address ?? null,
      preferred_ship_hour: data.preferred_ship_hour ?? null,
      updated_at: new Date().toISOString(),
      username: data.username ?? null,
    })
    .eq("id", user.id)
    .throwOnError();

  return result;
}
