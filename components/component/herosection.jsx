"use client"
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TypewriterEffect } from "../ui/typewritter-effect";

export function HeroSection() {
  const words = [
    { text: "The " },
    { text: "Ultimate" },
    { text: "Platform" },
    { text: "for" },
    { text: "Private", className: "text-indigo-500 dark:text-violet-500" },
    { text: "Medical", className: "text-indigo-500 dark:text-violet-500" },
    { text: "Image", className: "text-indigo-500 dark:text-violet-500" },
    { text: "Management", className: "text-indigo-500 dark:text-violet-500" },
  ];

  return (
    <section className="dark:bg-gray-100 dark:text-gray-800">
      <div
        className="flex flex-col items-center justify-center h-[40rem] px-10 py-16"
        style={{
          backgroundImage: `linear-gradient(to bottom right, rgba(0, 191, 255, 0.2), rgba(128, 0, 128, 0.2)), url("https://i.pinimg.com/originals/4c/98/4e/4c984ef0291409fef0a0942b391f6287.jpg")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10">
          Private Medical Imaging Starts Here.
        </p>
        <TypewriterEffect words={words} />
        <br />
        <br />
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
          <Link href="/signup?role=doctor">
            <Button color="primary" variant="bordered">
              For Doctors
            </Button>
          </Link>
          <Link href="/signup?role=patient">
            <Button color="primary" variant="bordered">
              For Patients
            </Button>
          </Link>
          <Link href="/signup?role=lab-staff">
            <Button color="primary" variant="bordered">
              For Lab Staffs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}