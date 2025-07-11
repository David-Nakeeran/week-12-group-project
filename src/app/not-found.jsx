import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#1e1e2f] text-[#d1fae5] flex items-center justify-center p-6">
      <h2 className="text-3xl font-bold text-[#b388ff] mb-4">
        404 - Not Found
      </h2>
      <p className="text-[#a9a9b3] mb-6">Could not find requested resource</p>
      <Link
        href="/"
        className="p-4 bg-[#22c55e] text-[#1e1e2f]  rounded-md font-semibold hover:bg-[#42d77e] transition-colors"
      >
        Return to homepage
      </Link>
    </div>
  );
}
