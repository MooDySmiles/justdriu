"use client";

import { createClient } from "@utils/supabase/client";
import { useEffect, useState } from "react";
import { logout } from "@/app/_actions/logout";
import { type Tables } from "types/database";
import { getUserProfile } from "@utils/supabase/api/user";

export function ControlBar() {
  const [sbUser, setSbUser] = useState<Tables<'profiles'>>();

  const supabase = createClient();

  const getSbUser = async () => {
    const { data } = await getUserProfile(supabase)
    if (data) setSbUser(data);
  };

  useEffect(() => {
    void getSbUser();
  }, []);

  return sbUser ? (
    <div className="flex justify-between bg-tone-neutral-09 px-400 py-250">
      <mds-icon name="mi/outline/menu" class="cursor-pointer"></mds-icon>
      <div className="flex items-center gap-x-400">
        <mds-text class="cursor-pointer" onClick={() => logout()}>
          Esci
        </mds-text>
        <mds-avatar
          src={sbUser?.avatar_url ?? ''}
          initials={sbUser?.full_name?.substring(0, 1)}
          class="cursor-pointer"
        ></mds-avatar>
      </div>
    </div>
  ) : (
    ""
  );
}
