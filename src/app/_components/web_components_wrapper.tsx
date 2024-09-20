"use client";

import "@/utils/mds-components";
import { useEffect } from "react";

export default function WebComponentsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    sessionStorage.setItem("mdsIconSvgPath", `/svg/`);
  }, []);

  return (
    <>
      {children}
    </>
  );
}
