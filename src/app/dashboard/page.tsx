import OrderCard from "@/app/_components/order_card";
import { orders } from "@/utils/temp_orders";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <div className="flex flex-wrap gap-y-600 mobile:justify-between tablet:gap-x-600">
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
      <Link href="/dashboard/order/new">
        <mds-icon
          name="mi/outline/loupe"
          class="absolute aspect-square w-1200 cursor-pointer fill-[#72D800] mobile:bottom-2000 mobile:right-400 tablet:bottom-1000 tablet:right-1000"
        />
      </Link>
    </>
  );
}
