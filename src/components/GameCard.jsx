import Link from "next/link";
import Image from "next/image";

export default function GameCard({ game }) {
  return (
    <div className="flex flex-col gap-1 items-center ">
      <Image
        src={game.background_image}
        alt="game"
        width="0"
        height="0"
        sizes="100vw"
        style={{ width: "80%", height: "auto" }}
      />
      <p>{game.name}</p>
      <p>Metacritic: {game.metacritic}</p>
      <p>
        {game.genres
          .map((genre) => {
            return genre.name;
          })
          .join(", ")}
      </p>
      <p>
        {game.parent_platforms
          .map((element) => {
            return element.platform.name;
          })
          .join(", ")}
      </p>
      <Link href={`games-details/${game.id}`}>See more</Link>
    </div>
  );
}
