import { dbConnect } from "@/app/lib/db"
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
    
    return new NextResponse("DB Connected", { status: 200 });
}