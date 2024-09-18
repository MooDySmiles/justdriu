"use client"

import "@/utils/mds-components";

import GoogleAuth from "./google";

export default function Login() {
  return <div className="flex flex-col h-screen justify-center items-center gap-y-400">
    <mds-text typography={"h1"} variant={"title"}>Benvenuto, effettua l&apos;accesso</mds-text>
    <GoogleAuth></GoogleAuth>
  </div>;
}
