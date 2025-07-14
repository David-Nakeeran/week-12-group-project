import Reviews from "@/components/Reviews";
import fetchFromAPI from "@/lib/rawgApi";
import Image from "next/image";

export default async function GameDetailsPage({ params }) {
  const gameId = params.gameid;
  const apiKey = process.env.API_KEY;
  const baseUrl = process.env.API_BASE_URL;

  // For testing, Battlefield hardline Id: 3400 , GTA 5 Id: 3498

  const query = await fetch(`${baseUrl}/${gameId}?key=${apiKey}`);

  const game = await query.json();
  console.log(game);

  return (
    <>
      <h1>{game.name}</h1>
      <Image
        src={game.background_image}
        alt="placeholder"
        width={400}
        height={400}
      />
      {/* <Image src="#" alt="placeholder" />
      <Image src="#" alt="placeholder" />
      <Image src="#" alt="placeholder" /> */}
      <p>{game.description_raw}</p>
      <div>
        <div>
          <p>Release date:</p>
          <p>{game.released}</p>
        </div>
        <div>
          <p>Metacritic:</p>
          <p>{game.metacritic}</p>
        </div>
        <div>
          <p>Platforms:</p>
          <p>{game.platforms.map((p) => p.platform.name).join(", ")}</p>
        </div>
      </div>
      <h2>Reviews</h2>
      <Reviews gameId={gameId} />
    </>
  );
}
