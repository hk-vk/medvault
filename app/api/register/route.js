import User from "@/models/user";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const {clerkId, firstName,lastName, email,username, password,role,hospital,currentDoctor} = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbConnect();
    //create user with hospital only if the user role is doctor
    const userData = {clerkId, firstName,lastName, email,username, password: hashedPassword ,role,hospital,currentDoctor};
    if (role === "doctor") {
      userData.hospital = hospital;
      
    }
    else{
      userData.hospital = "";
    }
    await User.create({ clerkId,firstName,lastName, email,username, password: hashedPassword ,role,hospital,currentDoctor});
    console.log("User registered successfully");
    
    //console log if sucessfully created
    

    

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}