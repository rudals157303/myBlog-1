"use client";
import { setMenu } from "@/redux/features/menuSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type LinkArray = {
  url: string;
  text: string;
};

export default function UrlData() {
  const [loding, setLoading] = useState<boolean>(false);
  const [loding2, setLoading2] = useState<boolean>(false);
  const [btn, setBtn] = useState<boolean>(false);
  const store = useAppSelector(state => state.menuReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!btn) dispatch(setMenu(false));
    console.log(store, btn, "store");
  }, [btn]);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(true), 1200);
    const timeout2 = setTimeout(() => setLoading2(true), 600);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  }, [btn]);

  const navLink: LinkArray[] = [
    // { url: "/", text: "Home" },
    { url: "/pages/about", text: "About" },
    { url: "/pages/portfolio", text: "Portfolio" },
    // { url: "/pages/skill", text: "Skill" },
  ];

  function toggleMenu() {
    setBtn(state => !state);
    dispatch(setMenu(!btn));
  }

  return (
    <nav className="navContainer" style={{ height: loding ? "auto" : "80px" }}>
      <div className="menubtnDiv" onClick={toggleMenu}>
        <span className={btn ? "menubtn active " : "menubtn"}></span>
      </div>

      {btn ? (
        <div className="full-menu">
          {navLink.map(c => (
            <Link
              href={`${c.url}`}
              key={c.url}
              className="navStyle"
              onClick={() => {
                setBtn(false);
              }}
            >
              {c.text}
            </Link>
          ))}
        </div>
      ) : (
        <>
          <div
            style={{ minWidth: "150px", marginLeft: "20px" }}
            className={loding ? "slide-right title" : "none"}
          >
            Front
          </div>
          <div
            style={{ width: "calc(70% - 40px)" }}
            className={loding2 ? "slide-right navItem" : "none"}
          >
            {navLink.map(c => (
              <Link href={`${c.url}`} key={c.url} className="navStyle">
                {c.text}
              </Link>
            ))}
          </div>
        </>
      )}
    </nav>
  );
}
