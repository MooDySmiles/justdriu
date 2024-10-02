import LogoutBtn from "@/components/logout_btn";
import { getUserProfile } from "@utils/supabase/api/user";
import { createClient } from "@utils/supabase/server";
import Link from "next/link";

export default async function ControlBar() {
  const client = createClient();

  const { data: user } = await getUserProfile(client);

  return (
    // TODO modificare nuovamente in justify-between quando e SE si rimetterà il menù laterale
    <div className="flex justify-end bg-tone-neutral-09 px-400 py-250">
      {/* <mds-icon name="mi/outline/menu" class="cursor-pointer"></mds-icon> */}
      <div className="flex items-center gap-x-400">
        <LogoutBtn />
        <Link href={"/dashboard/account"}>
          <mds-avatar
            src={user?.avatar_url ?? ""}
            initials={user?.full_name?.substring(0, 1)}
            class="cursor-pointer"
          ></mds-avatar>
        </Link>
      </div>
    </div>
  );
}
