"use server"
import User from "@/models/user";
import { dbConnect } from "../db";
import { connect } from "http2";

export async function createUser(user: any){
    try{
        await dbConnect();
        const newUser= await User.create(user);
        return JSON.parse(JSON.stringify(newUser));
    
    }
    catch(error){
        console.log(error);
    }
}