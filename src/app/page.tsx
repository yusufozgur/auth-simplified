import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { LoginForm } from "@/components/login";

export default function Home() {
  return (
    <div>
      <Button asChild><Link href="/test_components">Component Test Page</Link></Button>
    </div>
  );
}
