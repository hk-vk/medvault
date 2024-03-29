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

export default function Login() {
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
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-gray-800">
                Email
              </Label>
              <Input
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
                id="password"
                type="password"
                className="bg-white bg-opacity-10 backdrop-blur-md p-2 rounded"
              />
            </div>
            <Button color="primary" variant="solid" className="text-white">
              Login
            </Button>
          </div>
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
