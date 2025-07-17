import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import LoggedInNav from "./LoggedInNav";

export default async function Header() {
  const { userId } = await auth();
  return (
    <header className="mx-5 md:mx-16 my-4 md:my-8 flex gap-4 justify-between">
      <Link href={`/`} className="flex gap-4 items-center">
        <p className="font-black text-xl">GAMEVAULT</p>
      </Link>

      <nav className="flex justify-between gap-4">
        <SignedOut>
          <SignInButton className="text-lg font-medium hover:underline" />
          <SignUpButton className="text-lg font-medium hover:underline" />
        </SignedOut>
        {userId ? <LoggedInNav /> : null}
      </nav>
    </header>
  );
}
