import "server-only";
import { orders } from "@/utils/temp_orders";
import { redirect } from "next/navigation";

export async function getMyOrders() {
  "use server";
  //TODO retrieve orders from Supabase (should be ordered by last updated? or last insert?)
  return orders.sort((a, b) => parseInt(b.id) - parseInt(a.id));
}

export async function saveOrder(formData: FormData) {
  "use server";
  console.log("Recevied", formData);

  redirect("/dashboard")
}
