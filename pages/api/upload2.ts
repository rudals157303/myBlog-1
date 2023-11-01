import type { NextApiRequest, NextApiResponse } from "next";
// import formidable from "formidable";
// import path from "path";
// import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    // const imgStoragePath = path.join(process.cwd() + "/public" + "/images");
    // try {
    //   await fs.readdir(imgStoragePath);
    // } catch {
    //   await fs.mkdir(imgStoragePath);
    // }

    // const readFile = (req: NextApiRequest, saveLocally: boolean = false) => {
    //   const options: formidable.Options = {};

    //   if (saveLocally) {
    //     //true일때 option객체에 path와 filename을 저장
    //     options.uploadDir = imgStoragePath;
    //     options.filename = (name, ext, path) => {
    //       return Date.now().toString() + "_" + path.originalFilename;
    //     };
    //   }
    //   return new Promise<{
    //     fields: formidable.Fields;
    //     files: formidable.Files;
    //   }>((resolve, rejects) => {
    //     const form = formidable(options);
    //     form.parse(req, (err, fields, files) => {
    //       if (err) {
    //         rejects(err);
    //       }
    //       resolve({ fields, files });
    //     });
    //   });
    // };
    // const data = await readFile(req, true);
    // console.log(data.files.image, "data");

    res.status(200).json({ message: "이미지가 업로드되었습니다.2" });
  }
};
