import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
export async function GET() {
    await dbConnect();
    
    return new NextResponse("DB Connected", { status: 200 });
}