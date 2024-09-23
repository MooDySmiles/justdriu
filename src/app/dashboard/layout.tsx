import { ControlBar } from "@/app/_components/control_bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col mobile:flex-col-reverse">
      <ControlBar />
      <div className="flex-grow p-600">{children}</div>
    </div>
  );
}
