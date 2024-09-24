import "server-only";
import { orders } from "@/utils/temp_orders";

export async function getMyOrders() {
  "use server";
  //TODO retrieve orders from Supabase
  return orders;
}

export async function saveOrder(formData: FormData) {
  "use server";
  console.log("Recevied", formData);
}
