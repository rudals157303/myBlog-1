import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../util/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await connectDB;
  const db = client.db("data");

  const result = await db.collection("post").insertOne(req.body);

  res.status(200).send(result);
};
