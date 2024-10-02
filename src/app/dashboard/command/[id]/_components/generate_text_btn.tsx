"use client";

import { type Tables } from "types/database";

export default function GenerateTextBtn({
  user,
  command,
}: {
  user: Tables<"profile">;
  command: Tables<"command">;
}) {
  const generateText = () => {
    console.warn("TODO testo comanda da inviare", user, command);
  };

  return <mds-button onClick={() => generateText()}>Copia comanda</mds-button>;
}
