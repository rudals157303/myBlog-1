"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import axios from "axios";
// import { Idata } from "../addlist/page";

export interface Idata {
  link: string;
  _id: string;
  title: string;
  category: string;
  description: string;
  photo: string;
}

export default function Portfolio() {
  const [list, setList] = useState<[Idata]>([
    {
      link: "",
      _id: "",
      title: "",
      category: "",
      description: "",
      photo: "",
    },
  ]);
  const store = useAppSelector(state => state.menuReducer.value);

  // 겟 데이타
  const getData = useCallback(async () => {
    const res = await axios.get("/api/list");
    try {
      console.log(res.data);
      setList(res.data);
    } catch (error) {
      console.log(error);
    }

    // console.log(data, "data");
  }, [list]);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        {!store && (
          <div className="container">
            <div className="pd20">
              <h2 className="pdb40" />
              <h2 className="pdb40">Web</h2>
              <div className="pd20 item_con">
                <div className="port_con">
                  {/* <div className="card_style">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        alert("준비중입니다");
                      }}
                    >
                      <video width={400} autoPlay>
                        <source src="/videos/rpg.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div> */}

                  {list.map(_ => {
                    return (
                      <div className="card_style" key={_._id}>
                        <a href={_.link} target="_blank" rel="noreferrer">
                          <img
                            src={
                              _.photo !== ""
                                ? `/images/${_.photo}`
                                : "/images/no.png"
                            }
                          />
                        </a>
                      </div>
                    );
                  })}
                  {/* <div className="card_style">
                    <a
                      href="https://drag-drop-tan-alpha.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/web_todo.png" alt="투두웹" />
                    </a>
                  </div>
                  <div className="card_style">
                    <a
                      href="https://rudals95.github.io/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/play.png" alt="음악웹" />
                    </a>
                  </div> */}
                </div>
              </div>
              {/* <div className="pdb20">
                <p className="pdb40" />
                <p className="pdb40" />
                <h2 className="pdb40">Mobile</h2>
                <div className="pd20 item_con">
                  <div className="port_con">
                    <div className="card_style">
                      <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          alert("준비중입니다");
                        }}
                      >
                        <video width={400} autoPlay>
                          <source src="/videos/rpg.mp4" type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        )}
      </div>
      <div>
        <Link href={`/pages/addlist`} className="navStyle">
          +
        </Link>
      </div>
    </>
  );
}
