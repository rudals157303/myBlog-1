"use client";
import Image from "next/image";
import img_1 from "../../public/img_1.png";
import { useEffect, useState } from "react";
import PageComponent from "./components/Nav";

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(true), 1200);
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <>
      <div
        style={{ marginTop: "40px" }}
        className={loading ? "slide-top" : "none"}
      >
        <Image src={img_1} alt="이미지" width={200} />
      </div>
    </>
  );
}
