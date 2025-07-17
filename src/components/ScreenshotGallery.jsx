"use client";
import { useState } from "react";
import Image from "next/image";

export default function ScreenshotGallery({ screenshotList, gameName }) {
  const screenshots = screenshotList.results;
  //   console.log(screenshots);
  const [selectedImage, setSelectedImage] = useState(0);

  // functions handling the prev and next buttons for the gallery

  function handlePrev() {
    setSelectedImage((currentIndex) => {
      if (currentIndex === 0) {
        return screenshots.length - 1;
      } else {
        return currentIndex - 1;
      }
    });
  }

  function handleNext() {
    setSelectedImage((currentIndex) => {
      if (currentIndex === screenshots.length - 1) {
        return 0;
      } else {
        return currentIndex + 1;
      }
    });
  }

  const currentImage = screenshots[selectedImage];

  return (
    <div>
      <div>
        {currentImage ? (
          <>
            <Image
              src={currentImage.image}
              alt={`${gameName} screenshots`}
              height={720}
              width={1280}
            />
            <p>{currentImage.img_alt}</p>
          </>
        ) : (
          <div>
            <p>No screenshots available D:</p>
          </div>
        )}
        <div className="flex flex-row justify-around pt-3">
          <button
            onClick={handlePrev}
            className="w-fit bg-[#2A2A2A] text-[#FFFFFF] font-bold pt-[0.75rem] pb-[0.75rem] pr-[1rem] pl-[1rem] text-center rounded-[0.625em] mb-[0.75rem] hover:bg-[#3a3a3a] hover:scale-105 transform transition-colors duration-200"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="w-fit bg-[#2A2A2A] text-[#FFFFFF] font-bold pt-[0.75rem] pb-[0.75rem] pr-[1rem] pl-[1rem] text-center rounded-[0.625em] mb-[0.75rem] hover:bg-[#3a3a3a] hover:scale-105 transform transition-colors duration-200"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
