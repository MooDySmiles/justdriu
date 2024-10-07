import { getUserProfile } from "@utils/supabase/api/user";
import { createClient } from "@utils/supabase/server";
import dayjs from "dayjs";
import { type Tables } from "types/database";

export default async function CommandCard({
  command,
}: {
  command: Tables<"command">;
}) {
  const client = createClient();

  const { data: user } = await getUserProfile(client);

  let organizer = user;

  if (command.organizer && user?.id !== command.organizer) {
    const { data: _organizer } = await getUserProfile(
      client,
      command.organizer,
    );

    if (_organizer) organizer = _organizer;
  }

  return (
    <mds-card class="w-5600 bg-tone-neutral-10 mobile:w-4000" autoGrid>
      <mds-card-content class="flex flex-col items-start justify-between gap-y-300 p-600">
        <mds-text class="self-center" typography={"h3"} variant={"title"}>
          {dayjs(command.delivery_datetime).format("DD/MM/YYYY HH:mm")}
          {/* {new Date(command.delivery_datetime!).toLocaleString("it")} */}
        </mds-text>
        <div className="flex items-center justify-between gap-x-250">
          <mds-icon name="mi/outline/pin-drop" />
          <mds-text variant={"info"} typography={"detail"}>
            {command.delivery_address}
          </mds-text>
        </div>
        <div className="flex items-center justify-between gap-x-250">
          <mds-icon name="mi/outline/sports-score" />
          <mds-text variant={"info"} typography={"detail"}>
            {dayjs()
              .set("h", parseInt(command.end_hour!.split(":")[0]!))
              .set("m", parseInt(command.end_hour!.split(":")[1]!))
              .format("HH:mm")}
          </mds-text>
        </div>
        <div className="flex items-center justify-between gap-x-250">
          <mds-icon name="mi/outline/assignment-ind" />
          <mds-text variant={"info"} typography={"label"}>
            {organizer?.full_name}
          </mds-text>
        </div>
      </mds-card-content>
    </mds-card>
  );
}
