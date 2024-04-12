"use client";
import React, { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { ClerkAPIErrorJSON } from '@clerk/types';
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

export default function SignUp() {
 const { isLoaded, signUp, setActive } = useSignUp();
 const [emailAddress, setEmailAddress] = useState("");
 const [password, setPassword] = useState("");
 const [code, setCode] = useState("");
 const [verifying, setVerifying] = useState(false);
 const [firstName, setFirstName] = useState("");
 const [lastName, setLastName] = useState("");
 const [role, setRole] = useState("doctor");
 const router = useRouter();
 const [hospital,setHospital]=useState("");


 const handleSubmit = async (event:  React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLoaded) return;

    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setVerifying(true);
    } catch (err) {
      console.error('Error:', JSON.stringify(err, null, 2));
    }
 };

 const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!isLoaded) return;

  try {
    const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
    if (completeSignUp.status === "complete") {
      await setActive({ session: completeSignUp.createdSessionId });

      // Prepare the user data to be sent to the database
      const userData = {
        clerkId: completeSignUp.createdSessionId,
        firstName,
        lastName,
        email: emailAddress,
        username: emailAddress.split('@')[0],
        password: password,
        role,
        hospital: role === 'doctor' ? hospital : '',
      };

      // Send the user data to the server
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Handle successful registration
        console.log('User registered successfully');
        router.push("/dashboard");
      } else {
        // Handle registration error
        console.error('Error registering user:', response.statusText);
      }
    }
  } catch (err) {
    console.error('Error:', JSON.stringify(err, null, 2));
  }
};

 if (verifying) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-200 bg-opacity-50 backdrop-blur-lg">
      <Card className="max-w-sm bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-8">
        <CardHeader>
          <CardTitle className="text-xl text-black">Verify Email</CardTitle>
          <CardDescription className="text-blue-400">
            Please enter the verification code sent to your email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="code" className="text-gray-800">
                 Verification Code
                </Label>
                <Input
                 id="code"
                 placeholder="Enter code"
                 required
                 value={code}
                 className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                 onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <Button
                color="primary"
                variant="solid"
                className="text-white"
                type="submit"
              >
                Complete Sign Up
              </Button>
            </div>
          </form>
          </CardContent>
          </Card>
          </div>
    );
 }

 return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 to-purple-200 bg-opacity-50 backdrop-blur-lg">
      <Card className="max-w-sm bg-white bg-opacity-30 backdrop-blur-lg rounded-xl p-8">
        <CardHeader>
          <CardTitle className="text-xl text-black">Sign Up</CardTitle>
          <CardDescription className="text-blue-400">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name" className="text-gray-800">
                 First Name
                </Label>
                <Input
                 id="first-name"
                 placeholder="John"
                 required
                 value={firstName}
                 className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                 onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name" className="text-gray-800">
                 Last Name
                </Label>
                <Input
                 id="last-name"
                 placeholder="Doe"
                 required
                 value={lastName}
                 className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                 onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-800">
                 Email
                </Label>
                <Input
                 id="email"
                 type="email"
                 placeholder="m@example.com"
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
                 value={password}
                 className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                 onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role" className="text-gray-800">
                 Role
                </Label>
                <select
                 id="role"
                 className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded text-gray-800"
                 value={role}
                 onChange={(e) => setRole(e.target.value)}
                >
                 <option value="doctor">Doctor</option>
                 <option value="patient">Patient</option>
                 <option value="lab-staff">Lab Staff</option>
                </select>
              </div>
              {role === 'doctor' && (
  <div className="grid gap-2">
    <Label htmlFor="hospital" className="text-gray-800">
      Hospital
    </Label>
    <Input
      id="hospital"
      placeholder="Enter hospital name"
      required={role === 'doctor'}
      value={hospital}
      className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
      onChange={(e) => setHospital(e.target.value)}
    />
  </div>
)}

           
              <Button
                color="primary"
                variant="solid"
                className="text-white"
                type="submit"
              >
                Verify Email
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm text-gray-800">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline"
              onClick={(e) => {
                // Add additional logic if needed
              }}
            >
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
 );
}
