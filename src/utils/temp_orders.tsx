import { type JDItem, type JDOrder } from "@/types";

const items: JDItem[] = [
  {
    id: "1",
    name: "Strozzapreti al ragù",
    price: 9.5,
    ingredients: ["Ragù di carne"],
  },
  {
    id: "2",
    name: "Strozzapreti pasticciati",
    price: 9.5,
    ingredients: ["Salsiccia", "Panna"],
  },
  {
    id: "3",
    name: "Piada a strati salsiccia e graté",
    price: 10,
    ingredients: ["Salsiccia", "Graté di verdure"],
  },
  {
    id: "4",
    name: "Ceasar Salad",
    price: 11,
    ingredients: ["Petto di pollo a fette", "Insalata Iceberg", "Salsa Ceasar"],
  },
];

const _date = new Date(Date.parse("09/20/2024"));

export const orders: JDOrder[] = [
  {
    id: "1",
    date: _date.toLocaleDateString(),
    dueTime: "11:30",
    items: [items.at(1)!, items.at(1)!, items.at(3)!],
    coordinator: "Andrea Pruccoli",
  },
  {
    id: "2",
    date: new Date(_date.setDate(_date.getDate() + 7)).toLocaleDateString(),
    dueTime: "11:30",
    items: [items.at(0)!, items.at(1)!, items.at(2)!],
    coordinator: "Andrea Pruccoli",
  },
  {
    id: "3",
    date: new Date(_date.setDate(_date.getDate() - 14)).toLocaleDateString(),
    dueTime: "11:30",
    items: [items.at(0)!, items.at(0)!, items.at(2)!],
    coordinator: "Andrea Pruccoli",
  },
];
