import "@/styles/globals.css";

import { type Metadata } from "next";
import ClientGlobalsWrapper from "@/components/client_globals_wrapper";

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
      <body className="m-0 h-screen">
        <ClientGlobalsWrapper>
          <main className="h-full">{children}</main>
        </ClientGlobalsWrapper>
      </body>
    </html>
  );
}
