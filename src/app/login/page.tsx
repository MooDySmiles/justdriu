"use client";

import "@/utils/mds-components";

import GoogleAuth from "./google";

export default function Login() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-y-400">
      <mds-text class="text-center" typography={"h1"} variant={"title"}>
        Benvenuto, effettua l&apos;accesso
      </mds-text>
      <GoogleAuth></GoogleAuth>
    </div>
  );
}
