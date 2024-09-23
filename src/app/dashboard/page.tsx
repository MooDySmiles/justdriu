import OrderCard from "@/app/_components/order_card";
import { orders } from "@/utils/temp_orders";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="flex flex-wrap mobile:justify-between tablet:gap-x-600 gap-y-600">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`dashboard/order/${order.id}`}
          className="text-inherit no-underline"
        >
          <OrderCard order={order} />
        </Link>
      ))}
    </div>
  );
}
