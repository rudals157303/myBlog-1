import React from "react";

import { connectDB } from "../../../../util/database";

export default async () => {
  const db = (await connectDB).db("data");
  const result = await db.collection("post").find().toArray();

  return <div>{result[0].title}</div>;
};
