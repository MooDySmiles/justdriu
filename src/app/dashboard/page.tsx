import CommandCard from "@/components/command_card";
import { getMyCommands } from "@/server/commands";
import Link from "next/link";
import { type Tables } from "types/database";

export default async function DashboardPage() {
  const commands = await getMyCommands();
  
  return (
    <>
      <div className="flex flex-wrap gap-y-600 mobile:justify-between tablet:gap-x-600">
        {commands.map((command: Tables<"command">) => (
          <Link
            key={command.id}
            href={`dashboard/command/${command.id}`}
            className="text-inherit no-underline"
          >
            <CommandCard command={command} />
          </Link>
        ))}
      </div>
      <Link href="/dashboard/command/new">
        <mds-icon
          name="mi/outline/loupe"
          class="absolute aspect-square w-1200 fill-[#72D800] mobile:bottom-2000 mobile:right-400 tablet:bottom-1000 tablet:right-1000"
        />
      </Link>
    </>
  );
}
