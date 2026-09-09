import React from "react";
import CurvedCurtain from "@/components/animations/CurvedCurtain";

export default function Template({ children }: { children: React.ReactNode }) {
  return <CurvedCurtain>{children}</CurvedCurtain>;
}
