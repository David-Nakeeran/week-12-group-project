"use client";
import { useState } from "react";
import Image from "next/image";

export default function GameImageSlider({ games }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const elements = games.map((element, index) => {
    return (
      <div key={element.id}>
        <button onClick={() => setCurrentIndex(index)}>⚫</button>
      </div>
    );
  });

  return (
    <div className="w-full">
      <Image
        src={games[currentIndex].background_image}
        alt="game screenshot"
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <p className="text-center">{games[currentIndex].name}</p>
      <div className="flex gap-2 justify-center">{elements}</div>
    </div>
  );
}
