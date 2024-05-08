import { dbConnect } from '../../../lib/db';
import User from '../../../models/user';

// Directly export the async function for the API route
export async function GET(req, res) {
 await dbConnect();

 try {
   //find all users

    const users = await User.find();
    return new Response(JSON.stringify(users), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    
 } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Error fetching users", { status: 500 });
 }
}

export const DELETE = async (req, res) => {
  await dbConnect();
  const { email } = req.query
  try {
     await User.findOneAndDelete({ email });
     return new Response("user deleted sucessfully",data)
  } catch (error) {
     return new Response("error",error)
  }
 };