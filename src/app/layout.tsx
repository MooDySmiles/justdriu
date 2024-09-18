import "@/styles/globals.css";

import { type Metadata } from "next";
import { ControlBar } from "./_components/control_bar";

export const metadata: Metadata = {
  title: "Just Driù",
  description: "Qualcuno ha detto Just Driù?",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body className="m-0">
        <div className="flex flex-col mobile:flex-col-reverse">
          <ControlBar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
