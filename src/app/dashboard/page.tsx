import { type JDOrder } from "@/types";
import OrderCard from "@/app/_components/order_card";

export default function DashboardPage() {
  const _date = new Date(Date.parse("09/20/2024"));

  const orders: JDOrder[] = [
    {
      date: _date.toLocaleDateString(),
      dueTime: "11:30",
      items: [],
      coordinator: 'Andrea Pruccoli',
    },
    {
      date: new Date(_date.setDate(_date.getDate() + 7)).toLocaleDateString(),
      dueTime: "11:30",
      items: [],
      coordinator: 'Andrea Pruccoli',
    },
    {
      date: new Date(_date.setDate(_date.getDate() - 14)).toLocaleDateString(),
      dueTime: "11:30",
      items: [],
      coordinator: 'Andrea Pruccoli',
    },
  ];

  return (
    <div className="flex flex-wrap gap-600 p-600">
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </div>
  );
}
