import { saveOrder } from "@/server/orders";
import Link from "next/link";

export default function NewOrderPage() {
  const today = (new Date()).toISOString().split('T')[0];
  return (
    <form action={saveOrder} className="flex flex-col gap-y-600">
      <mds-text variant={"title"} typography={"h3"}>
        Nuovo ordine
      </mds-text>
      <mds-input type={"date"} name="orderDate" min={today} value={today} tip="Data ordine" />
      <mds-input type={"time"} name="orderTime" value="11:30" tip="Orario ordine" />
      <mds-hr />
      <div className="flex gap-x-400 self-end">
        <Link href={"/dashboard"}>
          <mds-button class="bg-tone-grey-05" type={"button"}>Annulla</mds-button>
        </Link>
        {/* TODO Server action here? */}
        <mds-button class="bg-[#72D800]">Salva</mds-button>
        {/* <button type="submit">Salva</button> */}
      </div>
    </form>
  );
}
