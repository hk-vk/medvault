import { NextResponse } from "next/server";
import User from "@/models/user";
import { dbConnect } from "@/lib/db";

export async function GET(request) {
 try {
    const { query } = parse(request.url, true);
    const { search, role } = query;
    await dbConnect();

    const regex = new RegExp(search, "i");
    const users = await User.find({
      role,
      $or: [{ firstName: regex }, { lastName: regex }],
    });

    return new NextResponse(JSON.stringify({ users }), { status: 200 });
 } catch (error) {
    console.error("Error searching for users:", error);
    return new NextResponse(JSON.stringify({ error: "Error searching for users" }), { status: 500 });
 }
}
