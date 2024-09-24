import "server-only";
import { orders } from "@/utils/temp_orders";

export async function getMyOrders() {
  //TODO retrieve orders from Supabase
  return orders;
}

export async function saveOrder(formData: FormData) {
  console.log("Recevied", formData);
}
