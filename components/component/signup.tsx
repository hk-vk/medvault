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
 const [currentDoctor,setCurrentDoctor]=useState("");
const [doctors, setDoctors] = useState([]);
 const [doctorEmail, setDoctorEmail] = useState("");

  
  const handleDoctorSearch = async (e) => {
    const searchQuery = e.target.value;
    try {
      const response = await fetch(`/api/fetchuser`);
      const data = await response.json();
      const doctors = data.filter((user: { role: string; firstName: string; lastName: string; }) => (user.role === "doctor") && (user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || user.lastName.toLowerCase().includes(searchQuery.toLowerCase())));
      setDoctors(doctors);
    } catch (error) {
      console.error("Error searching for doctors:", error);
    }
  }



 
 const handleDoctorSelect = (email: React.SetStateAction<string>) => {
  setDoctorEmail(email)
  setDoctors([]) //
}



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
        currentDoctor: role === 'patient' ? doctorEmail : '',

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
        router.push(`/dashboard/${role}`);
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
              {!firstName && <span className="text-red-500">First name is required</span>}
      {firstName && !/^[a-zA-Z]+$/.test(firstName) && (
        <span className="text-red-500">First name must contain only letters</span>
      )}
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
              {!lastName && <span className="text-red-500">Last name is required</span>}
      {lastName && !/^[a-zA-Z]+$/.test(lastName) && (
        <span className="text-red-500">Last name must contain only letters</span>
      )}
            
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
              {!emailAddress && <span className="text-red-500">Email is required</span>}
      {emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress) && (
        <span className="text-red-500">Invalid email format</span>)}
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
              {!password && <span className="text-red-500">Password is required</span>}
      {password && password.length < 8 && (
        <span className="text-red-500">Password must be at least 8 characters long</span>
      )}
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
                 <option value="labstaff">Lab Staff</option>
                </select>
              </div>
              {role === 'doctor'  &&  (
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
  

{role === 'patient' && (
  <div className="grid gap-2">
  <Label htmlFor="doctor" className="text-gray-800">
    Doctor
  </Label>
  <Input
    id="doctor"
    type="text"
    placeholder="Search for Doctor"
    className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
    value={doctorEmail}
    onChange={(e) => setDoctorEmail(e.target.value)}
    onKeyUp={handleDoctorSearch}
  />
  
  {doctors.length > 0 && (
    <ul>
      {doctors.map((doctor) => (
        <li style={{ cursor: 'pointer', padding: '10px', border: '1px solid #ccc', margin: '10px 0', backgroundColor: '#f9f9f9',borderRadius:'5px'}} key={doctor.email} onClick={() => handleDoctorSelect(doctor.email)} >
          {doctor.firstName} {doctor.lastName}
        </li>
      ))}
    </ul>
  )}
    {role === 'patient' && !doctorEmail && (
          <span className="text-red-500">Doctor is required for patients</span>
        )}
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
