import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  //local에 저장할 path
  const imgStoragePath = path.join(process.cwd() + "/public" + "/images");

  //fs모듈을 사용하여path에 폴더가 없을때엔 생성하도록 할 수 있다.
  try {
    await fs.readdir(imgStoragePath);
  } catch {
    await fs.mkdir(imgStoragePath);
  }

  /** true일시 로컬에 저장 */
  const readFile = (req: NextApiRequest, saveLocally: boolean = false) => {
    const options: formidable.Options = {};
    console.log(req, "reqreqreq");

    if (saveLocally) {
      //true일때 option객체에 path와 filename을 저장
      options.uploadDir = imgStoragePath;
      options.filename = (name, ext, path) => {
        return Date.now().toString() + "_" + path.originalFilename;
      };
    }

    return new Promise<{
      fields: formidable.Fields;
      files: formidable.Files;
    }>((resolve, rejects) => {
      const form = formidable(options);

      form.parse(req, (err, fields, files) => {
        if (err) {
          rejects(err);
        }

        resolve({ fields, files });
      });
    });
  };

  const data = await readFile(req, true);
  // console.log(data, "data");

  //files
  // console.log(data.files.image, "dataimage"); //img Blob

  return res.status(201).json({ message: "OK" });
}
