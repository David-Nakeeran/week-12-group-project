"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function GameImageSlider({ games }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const elements = games.map((element, index) => {
    return (
      <div key={element.id}>
        <button onClick={() => setCurrentIndex(index)}>⚪</button>
      </div>
    );
  });
  console.log(games);

  return (
    <div className="w-full grid place-items-start">
      <div className="grid w-full p-[1.5rem]">
        <Image
          src={games[currentIndex].background_image}
          alt="game screenshot"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="object-cover row-start-1 col-start-1 z-0"
        />
        <div className="row-start-1 col-start-1 self-end justify-self-start p-4 z-1 w-2/4">
          <p className="text-center text-[#030303] text-[1.5rem] sm:text-[2rem]">
            {games[currentIndex].name}
          </p>
          <div className="flex gap-2">
            <p className="text-[0.875rem] text-[#030303]">Metacritic</p>
            <p className="text-center text-[#030303] text-[0.875rem] sm:text-[2rem]">
              {games[currentIndex].metacritic}
            </p>
          </div>
          <Link
            className="px-[1rem] py-[0.75rem] bg-[#2A2A2A] rounded-[0.625em]"
            href={`games-details/${games[currentIndex].id}`}
          >
            See more
          </Link>
        </div>
      </div>
      <div className="flex gap-2 justify-center">{elements}</div>
    </div>
  );
}
