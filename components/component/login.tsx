"use client";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession } from "@clerk/nextjs";

//redirect  to dashboard/role based ono role


export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { session } = useSession();
 

if(session){
 const userEmail = session.user.primaryEmailAddress.emailAddress;
}
//  chekc for roles from db  find method and filrr tnen equalityusing Useremail
 const fetchrole = async () => {
  try{
    const response = await fetch('/api/fetchuser');
    const data = await response.json();
    const role= data.filter((user:any) => user.email === userEmail);
    console.log(role);
    if(role[0].role === "patient"){
      router.push('/patient');
    }
    else if(role[0].role === "doctor"){
      router.push('/doctor');
    }
    else if(role[0].role === "labstaff"){
      router.push('/labstaff');
    }
    
    
  
    

  }
  catch(err: any){
    console.error('Error:', err.message);
  }
}

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
  
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });
  
      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
    
      } else {
        
        console.log(result);
  
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailAddress, password }),
        });
  
        if (response.ok) {
          // Handle successful login
          const result = await response.json();
          console.log(result.message);
          
        } else {
          // Handle login error
          const error = await response.json();
          console.error('Error:', error.message);
        }
      }
    } catch (err: any) {
      console.error('Error:', err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-200 bg-opacity-50 backdrop-blur-lg">
      <Card className="max-w-sm bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-8">
        <CardHeader>
          <CardTitle className="text-xl text-black">Sign In</CardTitle>
          <CardDescription className="text-blue-400">Enter your credentials to sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-800">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                  value={emailAddress}
                  className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-800">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  value={password}
                  className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button color="primary" variant="solid" className="text-white" type="submit">
                Sign In
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm text-gray-800">
          Dont have an account?&nbsp;<Link href="/signup" className="underline"> Sign up </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}