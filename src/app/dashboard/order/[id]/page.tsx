import { orders } from "@/utils/temp_orders";

export default function OrderPage({
  params: { id: orderId },
}: {
  params: { id: string };
}) {
  // TODO retrieve orders from database
  const order = orders.find((order) => order.id === orderId);

  if (!order) {
    return (
      <mds-text variant={"title"} typography={"h2"} class="text-status-error">
        Impossibile recuperare dati ordine
      </mds-text>
    );
  }

  return (
    <div className="flex flex-col gap-y-600">
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
    </div>
  );
}
