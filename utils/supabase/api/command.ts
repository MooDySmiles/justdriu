import {
  type PostgrestError,
  type SupabaseClient,
} from "@supabase/supabase-js";
import { type Tables, type Database, type TablesInsert } from "types/database";

export type MyCommands = {
  organizer: Tables<"command">[] | null;
  participant: Tables<"command">[] | null;
  error: PostgrestError | null;
};

/**
 *
 * @param client
 * @param ascending ascending order
 * @param all if true select all commands, if false select only open commands
 * @returns
 */
export function getCommands(
  client: SupabaseClient<Database>,
  ascending = false,
  all = false,
) {
  const query = client
    .from("command")
    .select()
    .order("delivery_datetime", { ascending });
  if (!all)
    query.filter("delivery_datetime", "gte", new Date().toLocaleDateString());
  return query;
}

export function getCommand(
  client: SupabaseClient<Database>,
  id: number,
  ascending = false,
) {
  return client
    .from("command")
    .select()
    .eq("id", id)
    .order("delivery_datetime", { ascending });
}

/**
 *
 * @param client
 * @param userid user id of user that organized command
 * @param all if true select all commands, if false select only open commands
 * @returns commands
 */
export function getCommandByOrganizer(
  client: SupabaseClient<Database>,
  userid: string,
  ascending = false,
  all = true,
) {
  const query = client.from("command").select().eq("organizer", userid);

  if (!all)
    query.filter("delivery_datetime", "gte", new Date().toLocaleDateString());

  query.order("delivery_datetime", { ascending });
  return query;
}

/**
 *
 * @param client
 * @param userid user id of user that partecipate at command
 * @param all if true select all commands, if false select only open commands
 * @returns commands
 */
export async function getCommandByParticipant(
  client: SupabaseClient<Database>,
  userid: string,
  all = true,
) {
  const query = client.rpc("command_by_participant", {
    participants_id: userid,
  });
  if (!all)
    query.filter("delivery_datetime", "gte", new Date().toLocaleDateString());
  return query;
}

/**
 *
 * @param client
 * @param userid user id
 * @param all if true select all commands, if false select only open commands
 * @returns an object where organized represents
 */
export async function getAllMyCommands(
  client: SupabaseClient<Database>,
  userid: string,
  all = true,
): Promise<MyCommands> {
  const org_c = getCommandByOrganizer(client, userid, all);
  const part_c = getCommandByParticipant(client, userid, all);
  return Promise.all([org_c, part_c]).then(([org_command, part_command]) => {
    return {
      organizer: org_command.data,
      participant: part_command.data,
      error: org_command.error ?? part_command.error,
    };
  });
}

export async function newCommand(
  client: SupabaseClient<Database>,
  command: TablesInsert<"command">,
) {
  return client.from("command").insert([command]);
}
