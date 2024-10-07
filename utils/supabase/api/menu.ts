import { type JustDriuClient } from "../client";

export async function getMenu(
  client: JustDriuClient,
  food_provider_id: number,
) {
  console.log(food_provider_id)
  return client.rpc('menu', {food_provider_id})
}
