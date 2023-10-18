import { ObjectId } from "mongodb";
import { connectDB } from "../../util/connectDB";
import { NextApiRequest, NextApiResponse } from "next";

interface IlistData {
  email: string;
  nickName: string;
  date?: object;
  list: [
    {
      title: string;
      content: string;
      date?: object;
    },
  ];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = (await connectDB).db("data");

  const date = new Date();
  if (req.method === "GET") {
    console.log("ddd");

    const result = await db
      .collection("post")
      .find({ email: req.query.email })
      .toArray();
    return res.status(200).json(result);
  }
  if (req.method === "POST") {
    const id = new ObjectId();
    if (req.query.type === "add") {
      const data: IlistData = {
        email: req.body.email,
        nickName: req.body.nickName,
        list: [{ ...req.body.list, id, date }],
      };
      const result = await db.collection("post").insertOne(data);
      return res.status(200).json({ ...result, messeage: "저장 되었습니다" });
    }

    if (req.query.type === "push") {
      const filter = { email: req.body.email };
      const update = {
        $push: {
          list: {
            id,
            title: req.body.title,
            content: req.body.content,
            date,
          },
        },
      };
      const result = await db.collection("post").updateOne(filter, update);

      return res.status(200).json({ ...result, messeage: "저장 되었습니다" });
    }
    if (req.query.type === "edit") {
      console.log(req.query.idx);
      const filter = { email: req.body.email };
      const update = {
        $set: {
          [`list.${req.query.idx}.title`]: req.body.title,
          [`list.${req.query.idx}.content`]: req.body.content,
        },
      };
      const result = await db.collection("post").updateOne(filter, update);

      return res.status(200).json({ ...result, messeage: "저장 되었습니다" });
    }
    if (req.query.type === "change") {
      const copy = req.body.list.map((a: any) => ({
        title: a.title,
        id: new ObjectId(a.id),
        date: new Date(a.date),
        content: a.content,
      }));
      const filter = { email: req.body.email };
      const update = {
        $set: {
          [`list`]: copy,
        },
      };
      const result = await db.collection("post").updateOne(filter, update);
      return res.status(200).json({ ...result, messeage: "저장 되었습니다" });
    }
    if (req.query.type === "delete") {
      const filter = { email: req.body.email };
      const update = { $pull: { list: { id: new ObjectId(req.body.id) } } };

      const result = await db.collection("post").updateOne(filter, update);
      return res.status(200).json({ ...result, messeage: "삭제 되었습니다" });
    }
  } else {
    return res.status(405).end();
  }
};
