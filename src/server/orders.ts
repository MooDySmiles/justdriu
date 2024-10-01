import "server-only";
import { orders } from "@/utils/temp_orders";
import { redirect } from "next/navigation";
import { createClient } from "@utils/supabase/server";
import { getUserProfile } from "@utils/supabase/api/user";
import { type JDOrder } from "@/types";

export async function getMyOrders(): Promise<JDOrder[]> {
  "use server";

  const supabase = createClient();

  const { data: user } = await getUserProfile(supabase);

  if (!user) throw new Error("Unauthorized");

  // TODO retrieve orders where the user is the organizer  OR where the user participate
  // const { data: orders, error } = await supabase
  //   .from("order")
  //   .select()
  //   .eq("organizer", user.id)
  //   .order("updated_at");

  // if (error) throw new Error(error.message);

  // return orders;
  return orders.sort((a, b) => parseInt(b.id) - parseInt(a.id));
}

export async function getOrder(orderId: string): Promise<JDOrder> {
  const order = orders.find((order) => order.id === orderId);

  if (!order) return Promise.reject(new Error("Order not found"));

  return Promise.resolve(order);
}

export async function saveOrder(formData: FormData) {
  "use server";
  console.log("Recevied", formData);

  const supabase = createClient();

  const { data: user } = await getUserProfile(supabase);

  if (!user) throw new Error("Unauthorized");

  const organizer = user.id;
  const delivery_datetime = new Date(
    `${formData.get("orderDate") as string} ${formData.get("orderTime") as string}`,
  ).toISOString();
  const end_hour = new Date(
    `${formData.get("orderDate") as string} ${formData.get("endHour") as string}`,
  ).toISOString();
  const createdUpdatedAt = new Date().toISOString();

  console.log(
    "Organizer",
    user,
    organizer,
    createdUpdatedAt,
    delivery_datetime,
    end_hour,
  );

  // const { error } = await supabase
  //   .from("order")
  //   .insert([{
  //     created_at: createdUpdatedAt,
  //     updated_at: createdUpdatedAt,
  //     delivery_datetime,
  //     end_hour,
  //     organizer,
  //   }]);

  // if (error) throw new Error(error.message);

  redirect("/dashboard");
}
