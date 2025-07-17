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

  return (
    <div className="w-full grid place-items-center">
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
        <div className="flex flex-col row-start-1 col-start-1 self-end justify-self-start p-4 z-1 gap-[0.75rem] rounded-[1.25rem] bg-white/20 backdrop-blur-[0.313rem]">
          <p className="text-center text-[#030303] text-[1.5rem] sm:text-[2.2rem]">
            {games[currentIndex].name}
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-[0.875rem] text-[#030303] sm:text-[1.8rem]">
              Metacritic
            </p>
            <p className="text-center text-[#030303] text-[0.875rem] sm:text-[1.8rem]">
              {games[currentIndex].metacritic}
            </p>
          </div>
          <Link
            className="px-[0.75rem] py-[0.25rem] bg-[#2A2A2A] rounded-[0.625em] text-[1rem] text-center sm:text-[1.2rem] sm:py-[1rem] hover:bg-[#3a3a3a] hover:scale-105 transform transition-all duration-200"
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
