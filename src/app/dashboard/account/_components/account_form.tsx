import { updateUser } from "@/server/account";
import { type Tables } from "types/database";

export default function AccountForm({
  user,
}: Readonly<{ user: Tables<"profile"> }>) {
  const updateUserWithData = updateUser.bind(null, user);

  return (
    <form action={updateUserWithData} className="flex flex-col gap-y-400">
      <div className="flex flex-col gap-y-200">
        <div className="flex flex-col">
          <mds-text className="font-semibold">Nome</mds-text>
          <mds-input
            type={"text"}
            name="full_name"
            value={user.full_name ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <mds-text className="font-semibold">
            Indirizzo consegna preferito
          </mds-text>
          <mds-input
            type={"text"}
            name="preferred_ship_address"
            value={user.preferred_ship_address ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <mds-text className="font-semibold">
            Orario consegna preferito
          </mds-text>
          <mds-input
            type={"time"}
            name="preferred_ship_hour"
            value={user.preferred_ship_hour ?? ""}
          />
        </div>
      </div>
      <mds-button class="self-end">Salva</mds-button>
    </form>
  );
}
