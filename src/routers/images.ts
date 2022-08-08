import { Response, Router, Request } from "express";
import fs from "fs/promises";
import path from "path";
import { isFileExist, resizeImage } from "../utils";
import { requireQueryString } from "../middlewares/requireQueryString";

const router = Router();

router.get(
  "/",
  requireQueryString("filename"),
  async (req: Request<{}, {}, {}, { filename: string; width?: string; height?: string }>, res: Response) => {
    const { filename } = req.query;

    // check if requested file exists
    const filePath = path.normalize(`${__dirname}/../placeholders/${filename}.jpg`);

    if (!(await isFileExist(filePath))) {
      return res.status(400).send(`There is no image with this file name.`);
    }

    const { width = "", height = "" } = req.query;
    // serve the original image if there is no resizing needed
    if (!width && !height) {
      return res.sendFile(filePath);
    }

    // check if the thumbnail exists on disk
    const thumbPath = path.normalize(`${__dirname}/../thumbs/${filename}-${width}-${height}.jpg`);
    try {
      const fileExist = await fs.readFile(thumbPath);
      if (fileExist) {
        return res.sendFile(thumbPath);
      }
    } catch (e) {
      //
    }

    // resize image
    let data;
    try {
      data = await resizeImage(filePath, +width, +height);
    } catch (e) {
      console.log(e);
      return res.status(400).send("Image could not be processed.");
    }
    // save it on disk
    try {
      await fs.writeFile(thumbPath, data);
      return res.sendFile(thumbPath);
    } catch (e) {
      console.log(e);
      return res.status(500).send("Image couldn't not be served.");
    }
  },
);

export default router;
