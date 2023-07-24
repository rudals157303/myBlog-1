"use client";

import { useEffect, useState } from "react";

export default function BackGround() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    console.log(load);
  }, [load]);
  return <div></div>;
}
