"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import axios from "axios";

export interface Idata {
  link: string;
  _id: string;
  title: string;
  category: string;
  description: string;
  photo: string;
  type: boolean | null;
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
      type: null,
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
              {list[0].title !== "" && (
                <div className="pd20 item_con">
                  <div className="port_con">
                    {list.map(_ => {
                      return (
                        <div className="card_style" key={_._id}>
                          <a href={_.link} target="_blank" rel="noreferrer">
                            {_.type === false ? (
                              <img
                                src={
                                  _.photo !== ""
                                    ? `/images/${_.photo}`
                                    : "/images/no.png"
                                }
                              />
                            ) : (
                              <video width={400} autoPlay>
                                <source
                                  src={`/images/${_.photo}`}
                                  type="video/mp4"
                                />
                              </video>
                            )}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div>
              <Link href={`/pages/addlist`} className="navStyle">
                +
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
