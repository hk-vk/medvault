import Image from "../../../models/images";
import { NextResponse } from "next/server";
import {dbConnect} from "../../../lib/db"
// 

export async function POST(req) {
  try {
    await dbConnect();

    const {
      id,
      name,
      description,
      pathology,
      roiImage,
      nonRoiImage,
      doctor,
      patient,
      labStaff,
    } = await req.json();

    const newImage = new Image({
      id,
      name,
      description,
      pathology,
      roiImage,
      nonRoiImage,
      doctor,
      patient,
      labStaff,
    });

    const savedImage = await newImage.save();

    return NextResponse.json(
      { message: "Image uploaded successfully", id: savedImage._id },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error uploading image" },
      { status: 500 }
    );
  }
}