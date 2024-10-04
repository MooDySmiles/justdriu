import { type SupabaseClient } from "@supabase/supabase-js";
import { type Database } from "types/database";

export function getCommands(client: SupabaseClient<Database>, ascending = false) {
  return client
    .from("command")
    .select()
    .order("delivery_datetime", { ascending });
}

/**
 * 
 * @param client 
 * @param userid user id of user that organized command
 * @param all if false returns only open commands
 * @returns commands
 */
export function getCommandByOrganizer(
  client: SupabaseClient<Database>,
  userid: string,
  ascending = false,
  all = true,
) {

  userid = "b437568d-822f-4f1c-ae8a-571e3ce596b5"
  const query = client
    .from("command")
    .select()
    .eq("organizer", userid)

  if(!all) query.filter('delivery_datetime', 'gte', new Date().toLocaleDateString()).filter('end_hour', 'gte', new Date().toLocaleTimeString());

  query.order("delivery_datetime", { ascending });
  return query
  
}

/**
 * 
 * @param client 
 * @param userid user id of user that partecipate at command
 * @param all if false returns only open commands
 * @returns commands
 */
export async function getCommandByParticipant(client: SupabaseClient<Database>, userid: string, all = true) {
  userid = "b437568d-822f-4f1c-ae8a-571e3ce596b5"
  
  const query = client
    .rpc('command_by_participant', {
      participants_id: userid
    })
  if(!all) query.filter('delivery_datetime', 'gte', new Date().toLocaleDateString()).filter('end_hour', 'gte', new Date().toLocaleTimeString());
  return query
}
