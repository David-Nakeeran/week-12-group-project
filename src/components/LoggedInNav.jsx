import DesktopMenu from "@/components/DesktopMenu";
import MobileMenu from "@/components/MobileMenu";
import { UserButton } from "@clerk/nextjs";

export default function LoggedInNav() {
  return (
    <>
      <div className="hidden lg:flex items-center gap-4">
        <DesktopMenu />
        <UserButton />
      </div>
      <div className="lg:hidden">
        <MobileMenu />
      </div>
    </>
  );
}
