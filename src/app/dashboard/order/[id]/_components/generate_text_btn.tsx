"use client";

import { type JDOrder } from "@/types";
import { type Tables } from "types/database";

export default function GenerateTextBtn({
  user,
  order,
}: {
  user: Tables<"profiles">;
  order: JDOrder;
}) {
  const generateText = () => {
    console.warn("TODO testo comanda da inviare", user, order);
  };

  return <mds-button onClick={() => generateText()}>Copia comanda</mds-button>;
}
