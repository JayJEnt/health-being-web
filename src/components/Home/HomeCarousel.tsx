import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'; //Imported Icons
import { useState } from 'react';

import HomeCarouselTile from './HomeCarouselTile'; //Carousel tile Component
import TilesArray from './TilesArray.ts'; //Static possible tiles to display imported from file

const HomeCarousel: React.FC = () => {
  const [currentTile, setCurrentTile] = useState(0); //CurrentTile variable to determine which tiles to display
  const tilesArray = TilesArray; //TilesArray fetched tiles to display in this carousel (right now imported from file)

  //CarouselTiles variable that contains vurrently visible Tiles
  const carouselTiles = [
    tilesArray[(currentTile - 1 + tilesArray.length) % tilesArray.length],
    tilesArray[currentTile],
    tilesArray[(currentTile + 1) % tilesArray.length],
  ];

  //Function to rotate carousel to the left
  const handleCarouselLeft = () => {
    setCurrentTile((prev) => (prev - 1 + tilesArray.length) % tilesArray.length);
  };
  //Function to rotate carousel to the right
  const handleCarouselRight = () => {
    setCurrentTile((prev) => (prev + 1) % tilesArray.length);
  };
  return (
    <div className="flex flex-row gap-4">
      <ArrowLeftIcon onClick={() => handleCarouselLeft()} className="h-6" />
      {carouselTiles.map((tile, index) => (
        <HomeCarouselTile key={index} img={tile.img} name={tile.name} kcal={tile.kcal} />
      ))}
      <ArrowRightIcon onClick={() => handleCarouselRight()} className="h-6" />
    </div>
  );
};

export default HomeCarousel;
