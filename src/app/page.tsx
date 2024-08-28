import AuthBox from "@/components/AuthBox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <p className="text-5xl">Auth Simplified</p>
      <AuthBox />
      <Button asChild>
        <Link href="/prototype_components">Component Prototype Page</Link>
      </Button>
    </div>
  );
}
