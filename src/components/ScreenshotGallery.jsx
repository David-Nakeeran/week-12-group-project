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
            <p>No Screenshots Available</p>
          </div>
        )}
        <button onClick={handlePrev}>←</button>
        <button onClick={handleNext}>→</button>
      </div>
    </div>
  );
}
