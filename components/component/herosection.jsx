import { TypewriterEffect } from "../ui/typewritter-effect";
import { Divider,Button } from "@nextui-org/react";

export function HeroSection() {
  const words = [
    { text: "The " },
    { text: "Ultimate" },
    { text: "Platform" },
    { text: "for" },
    { text: "Private", className: "text-indigo-500 dark:text-violet-500" },
    { text: "Medical", className: "text-indigo-500 dark:text-violet-500" },
    { text: "Image", className: "text-indigo-500 dark:text-violet-500" },
    { text: "Management",className:"text-indigo-500 dark:text-violet-500" },
  ];

  return (
    <div
    className="flex flex-col items-center justify-center h-[40rem] px-10 py-16" 
      style={{
        backgroundImage: `url("https://i.pinimg.com/originals/4c/98/4e/4c984ef0291409fef0a0942b391f6287.jpg")`,
        backgroundPosition: "center", // Center the image horizontally
        backgroundRepeat: "no-repeat", // Prevent repeating the image
        backgroundSize: "cover", // Cover the container while maintaining aspect ratio
      }}
    >
      <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10">
        Private Medical Imaging Starts Here.
      </p>
      <TypewriterEffect words={words} />
      <Divider/>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
      <Button color="primary" variant="bordered">
        For Doctors
      </Button> 
      <Button color="primary" variant="bordered">
        For Patients
   </Button>
   <Button color="primary" variant="bordered">
        For Lab Staffs
      </Button> 
        
      </div>
    </div>
  );
}
