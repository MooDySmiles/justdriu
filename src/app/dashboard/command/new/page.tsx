"use client";

import { saveCommand } from "@/server/commands";
import { getFoodProviders } from "@/server/food_provider";
import { getUserProfile } from "@utils/supabase/api/user";
import { createClient } from "@utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { type Tables } from "types/database";

export default function NewCommandPage() {
  const [user, setUser] = useState<Tables<"profile">>();
  const [foodProviders, setFoodProviders] =
    useState<Tables<"food_provider">[]>();
  const [state, formAction] = useFormState(saveCommand, { errors: {} });

  const today = new Date().toISOString().split("T")[0];

  const client = createClient();

  const retrieveUser = async () => {
    const { data: user } = await getUserProfile(client);

    if (!user) throw new Error("Unauthorized");

    setUser(user);
  };

  const retrieveFoodProviders = async () => {
    const foodProviders = await getFoodProviders();

    setFoodProviders(foodProviders);
  };

  useEffect(() => {
    void retrieveUser();
    void retrieveFoodProviders();
  }, []);

  return (
    <form action={formAction} className="flex flex-col gap-y-400">
      <mds-text variant={"title"} typography={"h3"}>
        Nuovo ordine
      </mds-text>
      <div className="flex flex-col gap-200">
        <div className="flex flex-col">
          <mds-text class="font-semibold">Giorno</mds-text>
          <mds-input
            type={"date"}
            name="commandDate"
            min={today}
            value={today}
          />
          {state.errors.commandDate && (
            <mds-text class="text-status-error">
              {state.errors.commandDate}
            </mds-text>
          )}
        </div>
        <div className="flex flex-col">
          <mds-text class="font-semibold">Esercente</mds-text>
          <mds-input-select name="commandFoodProvider">
            {foodProviders?.map((foodProvider) => (
              <option key={foodProvider.id} value={foodProvider.id}>
                {foodProvider.name}
              </option>
            ))}
          </mds-input-select>
          {state.errors.commandFoodProvider && (
            <mds-text class="text-status-error">
              {state.errors.commandFoodProvider}
            </mds-text>
          )}
        </div>
        <div className="flex flex-col">
          <mds-text class="font-semibold">Orario consegna</mds-text>
          <mds-input
            type={"time"}
            name="commandTime"
            value={user?.preferred_ship_hour?.substring(0, 5) ?? "13:00"}
          />
          {state.errors.commandTime && (
            <mds-text class="text-status-error">
              {state.errors.commandTime}
            </mds-text>
          )}
        </div>
        <div className="flex flex-col">
          <mds-text class="font-semibold">Indirizzo consegna</mds-text>
          <mds-input
            type={"text"}
            name="commandAddress"
            value={user?.preferred_ship_address ?? ""}
          />
          {state.errors.commandAddress && (
            <mds-text class="text-status-error">
              {state.errors.commandAddress}
            </mds-text>
          )}
        </div>
        <div className="flex flex-col">
          <mds-text class="font-semibold">Scadenza</mds-text>
          <mds-input type={"time"} name="endHour" value="11:30" />
          {state.errors.endHour && (
            <mds-text class="text-status-error">
              {state.errors.endHour}
            </mds-text>
          )}
        </div>
      </div>
      <mds-hr />
      <div className="flex gap-x-400 self-end">
        <Link href={"/dashboard"}>
          <mds-button class="bg-tone-grey-05" type={"button"}>
            Annulla
          </mds-button>
        </Link>
        <mds-button>Salva</mds-button>
      </div>
    </form>
  );
}
