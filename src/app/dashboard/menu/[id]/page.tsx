import DishPage from "@/components/command/dish_page";
import { Summary } from "@/components/command/summary";
import { getDishTypeForProvider, getMenu } from "@utils/supabase/api/menu";
import { createClient } from "@utils/supabase/server";
import { type Tables } from "types/database";
import { type Functions } from "types/database-functions";

export default async function MenuPage({
  params: { id: providerid },
}: Readonly<{
  params: { id: string };
}>) {
  const client = createClient();
  const { data: menu, error } = await getMenu(client, parseInt(providerid));
  const { data: dishType, error: tError } = await getDishTypeForProvider(
    client,
    parseInt(providerid),
  );
  if (error) console.log(error.message);
  if (tError) console.log(tError.message);

  const orderedDish = orderDishByType(menu, dishType);

  return (
    <>
      <div className="flex justify-between">
        <mds-text typography="h2">Menu</mds-text>
        <Summary dishs={menu}></Summary>
      </div>

      {!tError ? (
        <mds-tab>
          {dishType.map((type, index) => {
            return (
              <mds-tab-item key={type.id} id={type.id.toString()} selected={index===0}>
                {type.type}
              </mds-tab-item>
            );
          })}
          {!error ? (
            orderedDish.map((od) => {
              return (
                <div slot="content" key={od.typeId}>
                  <DishPage dishs={od.dishs}></DishPage>
                </div>
              );
            })
          ) : (
            <div>Impossibile recuperare i piatti, riprovare più tardi </div>
          )}
        </mds-tab>
      ) : (
        <div>Impossibile recuperare i tipi dei piatti, riprovare più tardi</div>
      )}
    </>
  );
}

function orderDishByType(
  dish: Functions<"menu"> | null,
  dishType: Tables<"dish_type">[],
): { typeId: number; dishs: Functions<"menu"> }[] {
  if (dish === null) return [];
  return dishType.map((t) => {
    return { typeId: t.id, dishs: dish.filter((d) => d.type_id === t.id) };
  });
}
