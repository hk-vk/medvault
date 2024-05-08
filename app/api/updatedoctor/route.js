import { dbConnect } from "../../../lib/db";
import User from "../../../models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    //update the Currentdoctor field of the patient with the email
    try{
        const {email,doctorEmail} = await req.json();
        await dbConnect();
        const user = await User.findOne({email:email});
        if(user){
            user.currentDoctor = doctorEmail;
            await user.save();
            return new Response({message:"Doctor updated successfully"},{status:200});
        }
        else{
            return Response({message:"User not found"},{status:404});
        }
    }

    catch(error){
        return Response({message:"An error occurred while updating the doctor"},{status:500});
    }  
}

      
