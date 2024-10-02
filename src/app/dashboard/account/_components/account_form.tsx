"use client";

import { updateUser } from "@/server/account";
import { useFormState } from "react-dom";
import { type Tables } from "types/database";

export default function AccountForm({
  user,
}: Readonly<{ user: Tables<"profile"> }>) {
  const updateUserWithData = updateUser.bind(null, user);
  const [state, formAction] = useFormState(updateUserWithData, { errors: {} });

  return (
    <form action={formAction} className="flex flex-col gap-y-400">
      <div className="flex flex-col gap-y-200">
        <div className="flex flex-col">
          <mds-text className="font-semibold">Nome</mds-text>
          <mds-input
            type={"text"}
            name="full_name"
            value={user.full_name ?? ""}
          />
          {state.errors.full_name && (
            <mds-text class="text-status-error">
              {state.errors.full_name}
            </mds-text>
          )}
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
          {state.errors.preferred_ship_address && (
            <mds-text class="text-status-error">
              {state.errors.preferred_ship_address}
            </mds-text>
          )}
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
          {state.errors.preferred_ship_hour && (
            <mds-text class="text-status-error">
              {state.errors.preferred_ship_hour}
            </mds-text>
          )}
        </div>
      </div>
      <mds-button class="self-end">Salva</mds-button>
    </form>
  );
}
