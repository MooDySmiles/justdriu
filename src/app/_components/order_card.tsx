import { type JDOrder } from "@/types";

export default function OrderCard({ order }: { order: JDOrder }) {
  return (
    <mds-card class="w-5600 cursor-pointer bg-tone-neutral-10" autoGrid>
      <mds-card-content class="flex flex-col items-start justify-between gap-y-300 p-600">
        <mds-text class="self-center" typography={"h3"} variant={"title"}>
          {order.date}
        </mds-text>
        <div className="flex items-center justify-between gap-x-250">
          <mds-icon name="mi/outline/schedule" />
          <mds-text variant={"info"} typography={"detail"}>
            {order.dueTime}
          </mds-text>
        </div>
        <div className="flex items-center justify-between gap-x-250">
          <mds-icon name="mi/outline/assignment-ind" />
          <mds-text variant={"info"} typography={"label"}>
            {order.coordinator}
          </mds-text>
        </div>
      </mds-card-content>
    </mds-card>
  );
}
