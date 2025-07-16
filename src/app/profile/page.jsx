import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import { dbqry, dbget, dbgetSingle, dbpost } from "@/utils/dataLayer";
import ProfileGames from "@/components/ProfileGames";

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
    <div className="flex flex-col items-center gap-4 p-1 m-8 sm:m-16 lg:m-32">
      <Image
        className="border-1 rounded-[30%]"
        src={getAvatar(user.platform)}
        alt={`User's platform: ${user.platform}`}
        width="200"
        height="200"
      />
      <p className="border-1 border-[#ccc] rounded font-black text-md p-1 px-3">
        @{user.username}
      </p>
      <p>{user.bio}</p>
      <span className="flex self-stretch place-content-around">
        <p>Member since:</p>
        <p>{locale.format(new Date(user.created_at))}</p>
      </span>
      <h3 className="text-xl">Games Library</h3>
      <ProfileGames user_games={user_games} />
    </div>
  );
}
