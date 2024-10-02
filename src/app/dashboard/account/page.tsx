import { getUserProfile } from "@utils/supabase/api/user";
import { createClient } from "@utils/supabase/server";
import AccountForm from "./_components/account_form";

export default async function Account() {
  const client = createClient();

  const { data: user } = await getUserProfile(client);

  if (!user) throw new Error("Unauthorized");

  return <AccountForm user={user} />;
}
