"use client";

import { logout } from "@/server/logout";

export default function LogoutBtn() {
  return (
    <mds-text class="cursor-pointer" onClick={() => logout()}>
      Esci
    </mds-text>
  );
}
