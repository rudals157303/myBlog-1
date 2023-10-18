"use client";
import Image from "next/image";

import kmjang from "../../../../public/kmjang.png";
import joro from "../../../../public/joro.png";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

export default function About() {
  const [loading, setLoading] = useState<boolean>(false);
  const [time, setTime] = useState<boolean>(false);
  const [time2, setTime2] = useState<boolean>(false);
  const store = useAppSelector(state => state.menuReducer.value);

  useEffect(() => {
    const timeout = setTimeout(() => setTime(true), 6000);
    return () => clearTimeout(timeout);
  }, [time, time2]);

  useEffect(() => {
    console.log(store, "storestorestore");
  }, [store]);

  return (
    <>
      {!store && (
        <div className="container">
          <div className="pd20">
            <div className="AboutMe">
              <h2 className="pdb40">소개글</h2>
              <p className="aboutFont">
                어릴적부터 내성적인 아이였던 저에겐 그림과 만들기를 할 시간이
                또래 친구들 보다 많았던것 같습니다. 그중에서도 가장 흥미가
                있었던 것은 레고 와 프라모델 이였습니다. 스스로 조립해서 만들고
                부품도 바꿔가면서 혼종 을 만들기도 하였습니다.
              </p>
              <br />

              <p className="pdb40"></p>
              <PropsDiv
                loading={loading}
                setLoading={setLoading}
                time={time}
                setTime={setTime2}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
interface Props {
  loading: boolean;
  setLoading: (value: boolean) => void;
  time: boolean;
  setTime: (value: boolean) => void;
}

function PropsDiv({ loading, setLoading, time, setTime }: Props) {
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const [text2, setText2] = useState("");
  const [count2, setCount2] = useState(0);

  const [btnState, setBtnstate] = useState(false);
  const txt = ".....오잉!? 어린경민의 상태가 .....!";
  const txt2 = "축하합니다 어린 경민은 노동자(으)로 진화했다 !";

  useEffect(() => {
    if (!loading) {
      const interval = setInterval(() => {
        setText(prev => prev + txt[count]);
        text.length;
        if (text.length === 8) {
          setText(
            prev =>
              prev +
              "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0",
          );
        }
        setCount(count + 1);
      }, 100);
      if (count === txt.length) {
        clearInterval(interval);
        setBtnstate(true);
      }
      return () => {
        clearInterval(interval);
      };
    } else if (loading) {
      const interval = setInterval(() => {
        setText2(prev => prev + txt2[count2]);
        text2.length;

        setCount2(count2 + 1);
      }, 100);
      if (count2 === txt2.length) clearInterval(interval);
      return () => {
        clearInterval(interval);
      };
    }
  }, [text, text2, loading]);

  return (
    <div>
      <div className={!time ? "statusbar" : "statusbar2"}>
        <div>
          {!loading ? (
            <Image src={kmjang} alt="아기" />
          ) : (
            <Image src={joro} alt="조로" style={{ margin: "20px auto" }} />
          )}
        </div>
        <div className="dot-top">
          <span>도트1</span>
          <span>도트2</span>
        </div>
        <div>
          {!loading ? (
            <>
              <div className="dot-top">
                <span>도트1</span>
                <span>도트2</span>
              </div>
              <div className="dot-top-bottom">
                <span>도트3</span>
                <span>도트4</span>
              </div>
              <div
                className="txtBox"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <p
                  style={{
                    width: "270px",
                    fontSize: "24px",
                  }}
                >
                  {text}
                </p>
                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  <button
                    className="btn"
                    onClick={() => {
                      setLoading(true);
                      setTime(true);
                    }}
                  >
                    {btnState ? " ⏎ " : ""}
                  </button>
                </div>
              </div>
              <div className="dot-bottom">
                <span>도트1</span>
                <span>도트2</span>
              </div>
              <div className="dot-bottom-top">
                <span>도트3</span>
                <span>도트4</span>
              </div>
            </>
          ) : (
            <>
              <div className="dot-top">
                <span>도트1</span>
                <span>도트2</span>
              </div>
              <div className="dot-top-bottom">
                <span>도트3</span>
                <span>도트4</span>
              </div>
              <div className="txtBox">
                <div>
                  <p style={{ paddingRight: "50px", fontSize: "24px" }}>
                    {text2}
                  </p>
                </div>
              </div>
              <div className="dot-bottom">
                <span>도트1</span>
                <span>도트2</span>
              </div>
              <div className="dot-bottom-top">
                <span>도트3</span>
                <span>도트4</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
