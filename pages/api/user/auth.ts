import { connectDB } from "../../../util/database";
import { IuserData } from "../../../type/usertype";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = (await connectDB).db("data");
  const data: IuserData = {
    admin: req.body.admin,
    name: req.body.name,
    email: req.body.email,
    profile: {
      nickName: req.body.profile.nickName,
      profileImg: req.body.profile.profileImg,
    },
  };
  if (req.method === "POST") {
    if (req.query.type === "join") {
      //가입
      const existingUser = await db
        .collection("user")
        .findOne({ email: req.body.email });
      if (existingUser)
        return res.status(400).json({ messeage: "중복된 이메일이 존재합니다" });
      else {
        const result = await db.collection("user").insertOne(data);
        return res
          .status(200)
          .json({ ...result, messeage: "가입이 완료 되었습니다" });
      }
    }
    if (req.query.type === "login") {
      const result = await db
        .collection("user")
        .findOne({ email: req.body.email });
      if (result === null)
        return res.status(400).json({ messeage: "정보가없습니다" });

      if (result.email === req.body.email)
        return res
          .status(200)
          .json({ ...result, messeage: "로그인 되었습니다" });
      else res.status(400).json({ messeage: "계정 정보가없습니다" });
    }
  } else {
    return res.status(405).end();
  }
};
