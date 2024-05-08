import Image from "../../../models/images";
import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/db";
import multer from "multer";



export async function POST(req, res) {
  try {
    await dbConnect();
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {P
        cb(null, "./public/uploads");
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });
    const upload = multer({ storage: storage }).single("image");
    upload(req, res, async function (err) {
      if (err) {
        return res.json({ message: "An error occurred while uploading the image" });
      }
      const { name, description, pathology, doctorEmail, patientEmail } = req.body;
      const newImage = new Image({
        name,
        description,
        pathology,
        doctorEmail,
        patientEmail,
        imagePath: req.file.path,
      });
      await newImage.save();
      return res.json({ message: "Image uploaded successfully" });
    });
  }
  catch (error) {
    return res.json({ message: "An error occurred while uploading the image" });
  }

}