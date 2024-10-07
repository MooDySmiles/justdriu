import Link from "next/link";
import { Fragment } from "react";
import { type Tables } from "types/database";
import CommandCard from "./command_card";

export default async function CommandList({
  title,
  commands,
}: Readonly<{
  title: string;
  commands: Tables<"command">[];
}>) {
  return (
    <Fragment>
      <mds-text typography="h2">{title}</mds-text>
      <div className="flex flex-wrap gap-y-600 mobile:justify-between tablet:gap-x-600">
        {commands?.map((command: Tables<"command">) => (
          <Link
            key={command.id}
            href={`dashboard/command/${command.id}`}
            className="text-inherit no-underline"
          >
            <CommandCard command={command} />
          </Link>
        ))}
      </div>
    </Fragment>
  );
}
