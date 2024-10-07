import { getCommand } from "@/server/commands";
import { getUserProfile } from "@utils/supabase/api/user";
import { createClient } from "@utils/supabase/server";
import Link from "next/link";
import GenerateTextBtn from "./_components/generate_text_btn";
import dayjs from "dayjs";

export default async function CommandPage({
  params: { id: commandId },
}: Readonly<{
  params: { id: string };
}>) {
  const client = createClient();

  const { data: user } = await getUserProfile(client);

  if (!user) throw new Error("Unauthorized");

  const command = await getCommand(commandId);

  let organizer = user;

  if (command.organizer && user.id !== command.organizer) {
    const { data: _organizer } = await getUserProfile(client, command.organizer);

    if (_organizer) organizer = _organizer;
  }

  if (!command) {
    return (
      <mds-text variant={"title"} typography={"h2"} class="text-status-error">
        Impossibile recuperare dati ordine
      </mds-text>
    );
  }

  return (
    <div className="flex h-full flex-col gap-y-600">
      {/* Date and coordinator */}
      <div className="flex flex-col">
        <mds-text variant={"title"} typography={"h3"}>
          Ordine del {dayjs(command.delivery_datetime).format("DD/MM/YYYY HH:mm")}
        </mds-text>
        <mds-text variant={"info"} typography={"label"}>
          Coordinatore: {organizer.full_name}
        </mds-text>
      </div>
      {/* TODO recuperare correttamnete i piatti */}
      {/* Items */}
      {/* <ul className="my-0 pl-400">
        {command.items.map((item, index) => {
          return (
            <li key={`${item.name}-${index}`}>
              <div className="flex gap-x-250">
                <mds-text>{item.name}</mds-text>
                {" - "}
                <mds-text class="font-semibold">{item.price}€</mds-text>
              </div>
            </li>
          );
        })}
      </ul>

      <mds-hr />
      <mds-text variant={"title"} typography={"h4"} class="self-end">
        Totale: {command.items.reduce((acc, item) => acc + item.price, 0)}€
      </mds-text> */}

      <div className="flex gap-x-200 self-end">
        {/* TODO this button navigate to add entry to the command (display menu) */}
        <Link href={"../menu/"+command.food_provider_id}>
          <mds-button>Aggiungi piatto</mds-button>
        </Link>
        {/* TODO show this button only when user is the coordinator */}
        {user.id === command.organizer && (
          <GenerateTextBtn user={user} command={command} />
        )}
      </div>
    </div>
  );
}
