import { type Tables } from "types/database";

export default function CommandCard({ command }: { command: Tables<"command"> }) {
  return (
    <mds-card class="w-5600 mobile:w-4000 bg-tone-neutral-10" autoGrid>
      <mds-card-content class="flex flex-col items-start justify-between gap-y-300 p-600">
        <mds-text class="self-center" typography={"h3"} variant={"title"}>
          {new Date(command.delivery_datetime!).toLocaleDateString("it")}
        </mds-text>
        <div className="flex items-center justify-between gap-x-250">
          <mds-icon name="mi/outline/schedule" />
          <mds-text variant={"info"} typography={"detail"}>
            {command.end_hour}
          </mds-text>
        </div>
        <div className="flex items-center justify-between gap-x-250">
          <mds-icon name="mi/outline/assignment-ind" />
          <mds-text variant={"info"} typography={"label"}>
            {command.organizer}
          </mds-text>
        </div>
      </mds-card-content>
    </mds-card>
  );
}
