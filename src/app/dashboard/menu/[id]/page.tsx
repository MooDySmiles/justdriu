import { getMenu } from "@utils/supabase/api/menu";
import { createClient } from "@utils/supabase/server";

export default async function MenuPage({
  params: { id: providerid },
}: Readonly<{
  params: { id: string };
}>) {
  // async function getProviderMenu() {
  const client = createClient();
  const {data: dishs, error } =await getMenu(client, parseInt(providerid));
  if(error) return (<div>{error.message}</div>)
  // }

  return <div>Eeeehhh niente e qui ci sarà il menù</div>;
}
