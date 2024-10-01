import { getCommand } from "@/server/commands";
import { getUserProfile } from "@utils/supabase/api/user";
import { createClient } from "@utils/supabase/server";
import Link from "next/link";
import GenerateTextBtn from "./_components/generate_text_btn";

export default async function OrderPage({
  params: { id: orderId },
}: {
  params: { id: string };
}) {
  const client = createClient();

  const { data: user } = await getUserProfile(client);

  if (!user) throw new Error("Unauthorized");

  const order = await getCommand(orderId);

  let organizer = user;

  if (order.organizer && user.id !== order.organizer) {
    const { data: _organizer } = await getUserProfile(client, order.organizer);

    if (_organizer) organizer = _organizer;
  }

  if (!order) {
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
          Ordine del {new Date(order.delivery_datetime!).toLocaleDateString("it")}
        </mds-text>
        <mds-text variant={"info"} typography={"label"}>
          Coordinatore: {organizer.full_name}
        </mds-text>
      </div>
      {/* TODO recuperare correttamnete i piatti */}
      {/* Items */}
      {/* <ul className="my-0 pl-400">
        {order.items.map((item, index) => {
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
        Totale: {order.items.reduce((acc, item) => acc + item.price, 0)}€
      </mds-text> */}

      <div className="flex gap-x-200 self-end">
        {/* TODO show this button only when user is the coordinator */}
        {user.id === order.organizer && (
          <GenerateTextBtn user={user} order={order} />
        )}
        {/* TODO this button navigate to add entry to the order (display menu) */}
        <Link href={"menu"}>
          <mds-button>Aggiungi</mds-button>
        </Link>
      </div>
    </div>
  );
}
