"use client";

import "@/utils/mds_components";
import { useEffect } from "react";

import dayjs from "dayjs";
import "dayjs/locale/it";

export default function ClientGlobalsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    sessionStorage.setItem("mdsIconSvgPath", `/svg/`);

    dayjs.locale("it");
  }, []);

  return <>{children}</>;
}
