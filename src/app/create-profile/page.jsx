import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";
import ProfileForm from "@/components/ProfileForm";

export default async function CreateProfilePage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <section className="mt-6 md:mt-12 mx-5 md:mx-6 flex flex-col md:flex-row justify-center items-center">
        <div className="flex flex-col gap-3 md:gap-6">
          <h1 className="text-4xl md:text-6xl font-bold md:mb-4 lg:max-w-[25dvw]">
            Please sign in first
          </h1>
        </div>
        <div className="p-4 md:p-8 bg-neutral-800 rounded-2xl">
          <SignIn />
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="mx-5 md:mx-16 flex justify-center ">
        <h1 className="text-xl text-center md:text-3xl font-bold md:mb-4 lg:max-w-[40dvw] py-6 md:py-8">
          Welcome to your game vault, please create a profile by completing the
          form below
        </h1>
      </section>
      <ProfileForm userId={userId} />
    </>
  );
}
