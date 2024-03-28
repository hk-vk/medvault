import Image from "next/image";
import NavigationBar from "@/components/navbar"
import {HeroSection} from "@/components/component/herosection" 
import { Divider } from "@nextui-org/react";
export default function Home() {
  return (
   <>
   <NavigationBar/>
   <Divider />
   <HeroSection/>
   <Divider/>

   </>
  );
}
