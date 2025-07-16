import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { dbqry, dbget, dbgetSingle, dbpost } from "@/utils/dataLayer";
import ProfileGames from "@/components/ProfileGames";
import Link from "next/link";

const locale = new Intl.DateTimeFormat("en-GB"); // Hardcode UK date/time formatting

// function getAvatar(platform) {
//   return "/foo.jpg"; // TODO: Respond with the avatar matching the specified platform
// }

export function getAvatar(platform) {
  const platforms = {
    pc: "/images/avatars/pc.png",
    ps: "/images/avatars/ps.png",
    xbox: "/images/avatars/xbox.png",
    nintendo: "/images/avatars/nintendo.png",
  };

  return platforms[platform];
}

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/"); // Don't leak whether username exists, just go homepage

  const user = await dbgetSingle(dbqry.getUserByID, [userId]);
  const user_games = await dbget(dbqry.getGamesByUser, [userId]);

  return (
    <div className="mx-5 md:mx-16 mt-6 flex flex-col items-center gap-4">
      <h1 className="flex w-full text-xl justify-between items-center mb-3">
        Profile
      </h1>
      <div className="bg-card-bg rounded-2xl w-full flex flex-col items-center p-5 md:p-10">
        <Link
          href={`/profile/${user.id}/update`}
          className=" bg-grey-button font-bold py-[0.5rem] text-lg px-[1rem] text-center rounded-[0.625em] hover:bg-button-hover hover:scale-105 transform transition-colors duration-200 self-end mb-4 md:mb-0"
        >
          Edit Profile
        </Link>
        <div className="flex flex-col md:flex-row w-full md:gap-12 items-center">
          <Image
            className="border-1 rounded-[100%] max-w-[40dvw]"
            src={getAvatar(user.platform)}
            alt={`User's platform: ${user.platform}`}
            width="250"
            height="250"
          />
          <div className="flex flex-col w-full items-center md:items-start">
            <h2 className="text-lg md:text-2xl my-6">@{user.username}</h2>
            <p className="mb-6 md:text-xl">{user.bio}</p>
            <span className="flex w-full justify-between md:justify-start md:items-left gap-4">
              <p className="text-sm md:text-lg text-neutral-300">
                Member since:
              </p>
              <p className="text-sm md:text-lg">
                {locale.format(new Date(user.created_at))}
              </p>
            </span>
          </div>
        </div>
      </div>

      <h2 className="flex w-full text-xl justify-between items-center my-3 ">
        Games Library
      </h2>
      <ProfileGames user_games={user_games} />
    </div>
  );
}
