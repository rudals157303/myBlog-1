import { useAppSelector } from "@/redux/hooks";
import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <body style={{ position: "relative" }}>{children}</body>;
};

export default Wrapper;
