import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function UpdateProfilePage({ params }) {
  const { profileId } = await params;

  // select the current user profile
  const result = await db.query(`SELECT * FROM users WHERE id = $1`, [
    profileId,
  ]);
  const user = result.rows[0];

  if (!user) return <p>User not found.</p>;

  // handle profile update
  async function handleUpdate(formData) {
    "use server";
    const formValues = {
      username: formData.get("username"),
      bio: formData.get("bio"),
      platform: formData.get("platform"),
    };

    //update profile
    await db.query(
      `UPDATE users
       SET username = $1, bio = $2, platform = $3
       WHERE id = $4`,
      [formValues.username, formValues.bio, formValues.platform, profileId]
    );
    //revalidate and take them back to profile
    revalidatePath(`/profile/[profileId]/update`);
    redirect(`/profile`);
  }

  //default value = prefilled inputs
  return (
    <section className="flex flex-col items-center justify-center">
      <Link
        className="flex gap-3 hover:underline items-center self-start mx-4 md:mx-16 font-semibold text-lg md:text-xl"
        href="/profile"
      >
        Go back to profile
      </Link>

      <h1 className="text-3xl text-center md:text-6xl font-bold md:mb-4 lg:max-w-[40dvw] py-6 md:py-8">
        Update Your Profile
      </h1>

      <form
        action={handleUpdate}
        className="flex flex-col gap-3 w-[90dvw] lg:w-[30dvw]"
      >
        <label htmlFor="username" className="font-medium">
          Username:
        </label>
        <input
          type="text"
          name="username"
          required
          defaultValue={user.username}
          className="bg-white text-black border border-neutral-400 rounded p-2 w-full"
        />
        <label htmlFor="bio" className="font-medium">
          Bio:
        </label>
        <textarea
          name="bio"
          rows={3}
          required
          defaultValue={user.bio}
          className="bg-white text-black border border-neutral-400 rounded p-2 w-full"
        />
        <label htmlFor="platform" className="font-medium">
          Platform:
        </label>

        <select
          name="platform"
          className="w-full bg-white rounded mb-4 p-2 border border-neutral-400"
          defaultValue={user.platform}
          required
        >
          <option value="pc">PC</option>
          <option value="ps">Play Station</option>
          <option value="xbox">Xbox</option>
          <option value="nintendo">Nintento Switch</option>
        </select>

        <button
          type="submit"
          className="hover:cursor-pointer justify-center md:text-lg bg-neutral-600 text-white flex items-center gap-3 font-semibold px-5 py-2 hover:bg-neutral-700 hover:text-white mt-4"
        >
          Save Changes
        </button>
      </form>
    </section>
  );
}
