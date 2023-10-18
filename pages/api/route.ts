import { connectDB } from "../../util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = (await connectDB).db("data");
  if (req.method === "GET") {
    const result = await db
      .collection("user")
      .findOne({ user: "rudals782@nate.com" });
    return res.status(200).json(result);
  } else {
    return res.status(405).end();
  }
};
