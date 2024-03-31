"use client"
import Link from "next/link";
import { Button } from "@nextui-org/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
  
        if (res.error) {
          setError("Invalid Credentials");
          return;
        }
  
        router.replace("dashboard");
      } catch (error) {
        console.log(error);
      }
    };
  
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-200 bg-opacity-50 backdrop-blur-lg">
      <Card className="max-w-sm bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-8">
        <CardHeader>
          <CardTitle className="text-xl text-black">Login</CardTitle>
          <CardDescription className="text-blue-400">
            Enter your credentials to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-800">
                Email
              </Label>
              <Input
              onChange={(e)=>setEmail(e.target.value)}
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"

              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-gray-800">
                Password
              </Label>
              <Input
              onChange={(e)=>setPassword(e.target.value)}
                id="password"
                type="password"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
              />
            </div>
            </form>
            <Button type="button" color="primary" variant="solid" className="text-white">
              Login
            </Button>
          </div>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
              
            </div>
          )} 
          <div className="mt-4 text-center text-sm text-gray-800">
            Don't have an account yet?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
