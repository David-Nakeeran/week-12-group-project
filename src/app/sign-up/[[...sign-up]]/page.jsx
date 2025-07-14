import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <section className="mt-6 md:mt-12 mx-5 md:mx-6 flex flex-col md:flex-row justify-center lg:gap-40 items-center">
      <div className="flex flex-col gap-3 md:gap-6">
        <h1 className="text-4xl md:text-6xl font-bold md:mb-4 lg:max-w-[25dvw]">
          Start Your Game Log 🕹️
        </h1>
        <p className="text-sm md:text-lg mb-6 lg:max-w-[20dvw]">
          Sign up to start tracking the games you've played, loved, and still
          need to beat.
        </p>
      </div>
      <div className="p-4 md:p-8 bg-neutral-800 rounded-2xl">
        <SignUp />
      </div>
    </section>
  );
}
