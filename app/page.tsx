
import Image from "next/image";
import NavigationBar from "@/components/navbar";
import { HeroSection } from "@/components/component/herosection";
import { Divider, User } from "@nextui-org/react";
import { Features } from "@/components/component/features";


export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-200 to-purple-200 bg-opacity-50 backdrop-blur-lg">
      <NavigationBar />
      <HeroSection />
      <Features />
   
    </div>
  );
}

