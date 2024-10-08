import { type Tables } from "types/database";
import { type JustDriuClient } from "../client";

export async function getMenu(
  client: JustDriuClient,
  food_provider_id: number,
) {
  return client.rpc("menu", { food_provider_id });
}

export async function getDishTypeForProvider(
  client: JustDriuClient,
  food_provider_id: number,
) {
  const res = await getMenu(client, food_provider_id);
  const data = new Map<number, Tables<"dish_type">>();
  res.data?.forEach((dish) => data.set(dish.type_id, { id: dish.type_id, type: dish.type }));
  return { ...res, data: Array.from(data.values()) };
}
