import { dbConnect } from "../../../lib/db";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { firstName,lastName, email, password,role,hospital } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConnect();
    //create user with hospital only if the user role is doctor
    const userData = { firstName,lastName, email, password: hashedPassword ,role};
    if (role === "doctor") {
      userData.hospital = hospital;
      
    }
    else{
      userData.hospital = "";
    }
    await User.create({ firstName,lastName, email, password: hashedPassword ,role,hospital});
    

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}