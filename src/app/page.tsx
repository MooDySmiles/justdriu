"use client"

// Va fatto in un Client Component
import "@/utils/mds-components";

import { useEffect } from "react";

export default function HomePage() {

  useEffect(() => {
    sessionStorage.setItem('mdsIconSvgPath', `/svg/`);
  }, []);

  return (
    <main className="flex flex-wrap gap-x-400 p-400">
      <mds-text>Questa è la mia prima app pubblicata su Vercel integrata col design system Magma</mds-text>
      <mds-icon name="mi/outline/arrow-back" />
    </main>
  );
}
