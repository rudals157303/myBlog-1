import Image from "next/image";
import PageComponent from "../../components/PageComponent";
import img_1 from "../../../../public/img_1.png";

export default function Portfolio() {
  return (
    <div>
      <PageComponent />
      <div className="container">
        <div className="pd20">
          {/* <h2 className="pdb40">포트폴리오</h2> */}
          <div className="port_con">
            <div>
              <video width={400} autoPlay>
                <source src="/videos/rpg.mp4" type="video/mp4" />
              </video>
              <h3>자바스크립트 게임</h3>
            </div>
            <div>
              <Image src={img_1} alt="이미지" width={200} />
            </div>
            <div>
              <Image src={img_1} alt="이미지" width={200} />
            </div>
            <div>
              <Image src={img_1} alt="이미지" width={200} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
