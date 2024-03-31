"use client";
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

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor");
  const [hospital,setHospital]=useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      let userData = { firstName, lastName, email, password, role ,hospital};
      if (role === "doctor") {
        userData.hospital = hospital;
      } else {
        userData.hospital = "";
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('User registered successfully');
      } else {
        console.error('Error during registration:', response.statusText);
      }



    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
   

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
          <form onSubmit={handleSignUp}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name" className="text-gray-800">
                    First name
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
                    Last name
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
                  value={email}
                  className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                  onChange={(e) => setEmail(e.target.value)}
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
                <Label htmlFor="signup-as" className="text-gray-800">
                  Signup as
                </Label>
                <select
                id="signup-as"
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
                    value={hospital}
                    className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
                    onChange={(e) => setHospital(e.target.value)}
                  />
                </div>
            )
            }
              <Button
                color="primary"
                variant="solid"
                className="text-white"
                type="submit"
              >
                Sign Up
              </Button>
            </div>
            
          </form>
          <div className="mt-4 text-center text-sm text-gray-800">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline"
              onClick={(e) => {
                e.preventDefault();
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
