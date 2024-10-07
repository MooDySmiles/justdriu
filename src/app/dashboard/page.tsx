import CommandList from "@/components/command/command_list";
import { getMyCommands } from "@/server/commands";
import { getCommands } from "@utils/supabase/api/command";
import { createClient } from "@utils/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const client = createClient();
  const { organizer, participant, error } = await getMyCommands();

  const {data: commands_open, error: allCommandsError} = await getCommands(client, true)
  console.log('commands open', commands_open);
  if (error) {
    return <div>{error.message}</div>;
  }
  if(allCommandsError) {
    return <div>{allCommandsError.message}</div>;
  }

  return (
    <>
      {commands_open? <CommandList title="Ordinazioni Disponibili" commands={commands_open}></CommandList>: <></> }
      {organizer ? <CommandList title="Le mie comande" commands={organizer}></CommandList> : <></>}
      {participant ? <CommandList title="Le comande a cui partecipo" commands={participant}></CommandList> : <></>}

      <Link href="/dashboard/command/new">
        <mds-icon
          name="mi/outline/loupe"
          class="absolute aspect-square w-1200 fill-[#72D800] mobile:bottom-2000 mobile:right-400 tablet:bottom-1000 tablet:right-1000"
        />
      </Link>
    </>
  );
}
