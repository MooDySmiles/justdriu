import { type JDOrder } from "@/types";
import OrderCard from "@/app/_components/order_card";
import Link from "next/link";

export default function DashboardPage() {
  const _date = new Date(Date.parse("09/20/2024"));

  const orders: JDOrder[] = [
    {
      id: '1',
      date: _date.toLocaleDateString(),
      dueTime: "11:30",
      items: [],
      coordinator: 'Andrea Pruccoli',
    },
    {
      id: '2',
      date: new Date(_date.setDate(_date.getDate() + 7)).toLocaleDateString(),
      dueTime: "11:30",
      items: [],
      coordinator: 'Andrea Pruccoli',
    },
    {
      id: '3',
      date: new Date(_date.setDate(_date.getDate() - 14)).toLocaleDateString(),
      dueTime: "11:30",
      items: [],
      coordinator: 'Andrea Pruccoli',
    },
  ];

  return (
    <div className="flex flex-wrap gap-600">
      {orders.map(order => (
        <Link key={order.id} href={`dashboard/order/${order.id}`} className="no-underline text-inherit">
          <OrderCard order={order} />
        </Link>
      ))}
    </div>
  );
}
