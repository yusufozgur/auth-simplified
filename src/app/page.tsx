"use server"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { getUser } from "@/lib/Auth/ValidateCookies";

export default async function Home() {

  const user = await getUser()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <p className="text-5xl">Auth Simplified</p>
      {user ? <Button asChild>
        <Link href="/my_profile">My Profile</Link>
      </Button> : <div className="flex flex-row gap-5">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
      </div>
      }
      <Button asChild>
        <Link href="/test_components">Component Test Page</Link>
      </Button>
    </div>
  );
}
