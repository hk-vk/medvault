import { dbConnect } from "../../../lib/db"
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "../../../models/user";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await dbConnect();

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, return an error
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If passwords don't match, return an error
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // User is authenticated, return a success message
    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while logging in." },
      { status: 500 }
    );
  }
}