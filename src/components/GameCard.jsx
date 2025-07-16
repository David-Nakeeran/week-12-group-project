import Link from "next/link";
import Image from "next/image";

export default function GameCard({ game }) {
  return (
    <div className="flex flex-col gap-1 items-center bg-card-bg p-[1.5rem] rounded-[1.25em] justify-between h-full">
      <Image
        src={game.background_image}
        alt="game"
        width="250"
        height="250"
        className="object-cover w-full h-[30dvh] p-1 m-1 border-1 rounded-sm"
      />
      <p className="text-[#ffffff] text-[1.5rem] font-bold mb-[1rem]">
        {game.name}
      </p>
      <div className="w-full flex justify-between mb-[0.5rem]">
        <p className="text-[#D5D5D5]">Metacritic</p>
        <p className="text-[#fff]">{game.metacritic}</p>
      </div>
      <div className="w-full flex justify-between gap-2 mb-[0.5rem]">
        <p className="text-[#D5D5D5]">Genres</p>
        <div className="text-right">
          <p className="text-[#fff]">
            {game.genres
              .map((genre) => {
                return genre.name;
              })
              .join(", ")}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-between gap-2 mb-[1rem]">
        <p className="text-[#D5D5D5]">Platforms</p>
        <div className="text-right">
          <p className="text-[#fff]">
            {game.parent_platforms
              .map((element) => {
                return element.platform.name;
              })
              .join(", ")}
          </p>
        </div>
      </div>
      <Link
        href={`games-details/${game.id}`}
        className="w-full bg-[#2A2A2A] text-[#FFFFFF] font-bold pt-[0.75rem] pb-[0.75rem] pr-[1rem] pl-[1rem] text-center rounded-[0.625em] mb-[0.75rem] hover:bg-[#3a3a3a] hover:scale-105 transform transition-colors duration-200"
      >
        See more
      </Link>
    </div>
  );
}
