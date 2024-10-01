import { saveOrder } from "@/server/orders";
import Link from "next/link";

export default function NewOrderPage() {
  const today = new Date().toISOString().split("T")[0];
  return (
    <form action={saveOrder} className="flex flex-col gap-y-400">
      <mds-text variant={"title"} typography={"h3"}>
        Nuovo ordine
      </mds-text>
      <div className="flex flex-col gap-200">
        <div className="flex flex-col">
          <mds-text class="font-semibold">Giorno</mds-text>
          <mds-input type={"date"} name="orderDate" min={today} value={today} />
        </div>
        <div className="flex flex-col">
          <mds-text class="font-semibold">Orario consegna</mds-text>
          <mds-input type={"time"} name="orderTime" value="13:00" />
        </div>
        <div className="flex flex-col">
          <mds-text class="font-semibold">Scadenza</mds-text>
          <mds-input type={"time"} name="endHour" value="11:30" />
        </div>
      </div>
      <mds-hr />
      <div className="flex gap-x-400 self-end">
        <Link href={"/dashboard"}>
          <mds-button class="bg-tone-grey-05" type={"button"}>
            Annulla
          </mds-button>
        </Link>
        <mds-button class="bg-[#72D800]">Salva</mds-button>
      </div>
    </form>
  );
}
