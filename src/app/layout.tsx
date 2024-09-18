import "@/styles/globals.css";

import { type Metadata } from "next";
import { ControlBar } from "./_components/control_bar";
import { createClient } from "@utils/supabase/server";

export const metadata: Metadata = {
  title: "Just Driù",
  description: "Qualcuno ha detto Just Driù?",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="it">
      <body className="m-0">
        <div className="flex flex-col mobile:flex-col-reverse">
          {user ? <ControlBar /> : ""}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
