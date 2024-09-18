"use client"

import { type SupabaseUser } from "@/types";
import { createClient } from "@utils/supabase/client";
import { useEffect, useState } from "react";

export function ControlBar() {
  const [sbUser, setSbUser] = useState<SupabaseUser>();

  const supabase = createClient();

  const getUser = () => {
    return supabase.auth.getUser()
  };

  const getSbUser = async () => {
    const { data: { user } } = await getUser();

    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select(`full_name, username, website, avatar_url`)
      .eq('id', user.id)
      .single()

    if (data) setSbUser(data);
  };

  useEffect(() => {
    void getSbUser();
  }, []);

  return <div className="flex justify-between py-250 px-400 bg-tone-neutral-09">
    <mds-icon name="mi/outline/menu" class="cursor-pointer"></mds-icon>
    <mds-avatar src={sbUser?.avatar_url} initials={sbUser?.full_name.substring(0, 1)} class="cursor-pointer"></mds-avatar>
  </div>
}