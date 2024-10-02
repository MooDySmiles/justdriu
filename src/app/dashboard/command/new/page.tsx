"use client";

import { saveCommand } from "@/server/commands";
import { getUserProfile } from "@utils/supabase/api/user";
import { createClient } from "@utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Tables } from "types/database";

export default function NewCommandPage() {
  const [user, setUser] = useState<Tables<"profile">>();

  const today = new Date().toISOString().split("T")[0];

  const retrieveUser = async () => {
    const client = createClient();

    const { data: user } = await getUserProfile(client);

    if (!user) throw new Error("Unauthorized");

    setUser(user);
  };

  useEffect(() => {
    void retrieveUser();
  }, []);

  return (
    <form action={saveCommand} className="flex flex-col gap-y-400">
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
        </div>
        <div className="flex flex-col">
          <mds-text class="font-semibold">Indirizzo consegna</mds-text>
          <mds-input
            type={"text"}
            name="commandAddress"
            value={user?.preferred_ship_address ?? ""}
          />
        </div>
        <div className="flex flex-col">
          <mds-text class="font-semibold">Orario consegna</mds-text>
          <mds-input
            type={"time"}
            name="commandTime"
            value={user?.preferred_ship_hour ?? "13:00"}
          />
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
