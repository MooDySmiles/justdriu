import { getOrder } from "@/server/orders";
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

  // TODO retrieve orders from database
  const order = await getOrder(orderId);

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
          Ordine del {order.date}
        </mds-text>
        <mds-text variant={"info"} typography={"label"}>
          Coordinatore: {order.coordinator}
        </mds-text>
      </div>
      {/* Items */}
      <ul className="my-0 pl-400">
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
      {/* Total */}
      <mds-text variant={"title"} typography={"h4"} class="self-end">
        Totale: {order.items.reduce((acc, item) => acc + item.price, 0)}€
      </mds-text>

      <div className="flex gap-x-200 self-end">
        {/* TODO show this button only when user is the coordinator */}
        {user.full_name === order.coordinator && (
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
