import Link from "next/link";

export default function HomeBtn() {
  return (
    <Link href={"/dashboard"} className="no-underline">
      <mds-text>Home</mds-text>
    </Link>
  );
}
