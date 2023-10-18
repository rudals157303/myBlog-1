"use client";

import React, { useEffect, useState } from "react";

export default function BackGround() {
  const [load] = useState(false);
  useEffect(() => {
    console.log(load);
  }, [load]);
  return <div></div>;
}
