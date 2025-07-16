"use client";
import { CreateUserProfile } from "@/lib/actions";

export default function ProfileForm({ userId }) {
  const createProfileWithId = CreateUserProfile.bind(null, userId);

  return (
    <section className="flex flex-col items-center justify-center">
      <form
        action={createProfileWithId}
        className="flex flex-col gap-3 w-[90dvw] lg:w-[30dvw]"
      >
        <fieldset>
          <label htmlFor="username" className="font-medium">
            Username:
          </label>
          <input
            name="username"
            type="text"
            placeholder="Your username"
            className="bg-white text-neutral-900 w-full rounded mb-4 p-2 mt-2 border border-neutral-400"
            required
          />
          <label htmlFor="bio" className="font-medium">
            About you:
          </label>
          <textarea
            rows={3}
            name="bio"
            placeholder="Tell us about yourself."
            className="bg-white text-neutral-900 w-full rounded mb-4 p-2 mt-2 border border-neutral-400"
          />
          <label htmlFor="platform" className="font-medium">
            What's your preferred platform?
          </label>
          <select
            name="platform"
            className="bg-white text-neutral-900 w-full rounded mb-4 p-2 mt-2 border border-neutral-400"
            defaultValue={""}
            required
          >
            <option value="" disabled="disabled" className="text-neutral-900">
              Please select one platform
            </option>
            <option value="pc">PC</option>
            <option value="ps">Play Station</option>
            <option value="xbox">Xbox</option>
            <option value="nintendo">Nintento Switch</option>
          </select>
        </fieldset>
        <button type="submit" className="grey-button">
          Submit
        </button>
      </form>
    </section>
  );
}
