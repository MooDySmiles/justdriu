import Link from "next/link";

export default function HomeBtn() {
  return (
    <Link href={"/dashboard"} className="no-underline inline-flex items-center text-inherit">
      <mds-img src="/favicon.ico"></mds-img>
      <mds-text typography="h2" class="text-justdriu italic">JustDriu</mds-text>
    </Link>
  );
}
