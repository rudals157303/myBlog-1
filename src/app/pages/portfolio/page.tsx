"use client";
import Image from "next/image";
import PageComponent from "../../components/Nav";
import img_1 from "../../../../public/img_1.png";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

export default function Portfolio() {
  const store = useAppSelector((state) => state.menuReducer.value);
  return (
    <div>
      {!store && (
        <div className="container">
          <div className="pd20">
            <h2 className="pdb40" />
            <h2 className="pdb40">Web</h2>
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
                <div className="card_style">
                  <a
                    href="https://drag-drop-tan-alpha.vercel.app/"
                    target="_blank"
                  >
                    <img src="/web_todo.png" alt="투두웹" />
                  </a>
                </div>
                <div className="card_style">
                  <a href="https://rudals95.github.io/" target="_blank">
                    <img src="/play.png" alt="음악웹" />
                  </a>
                </div>
                <div className="card_style">
                  <a href="https://rudals95.github.io/jinro/" target="_blank">
                    <img src="/jinro.png" alt="음악웹" />
                  </a>
                </div>
              </div>
            </div>
            <div className="pdb20">
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
            </div>
            <div className="pdb20">
              <p className="pdb40" />
              <p className="pdb40" />
              <h2 className="pdb40">API</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
