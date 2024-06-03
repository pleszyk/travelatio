import { useState } from "react";
// import Mapbox from "./Mapbox";
import Card from "./Card";
import Deck from "./Deck";

function Cards({ locationData }: any) {
  const [coords, setCoords] = useState<object>();

  function handler(lat: number, lng: number) {
    console.log(lat, lng);
    setCoords({
      lat,
      lng,
    });
  }

  const [expandedIndex, setExpandedIndex] = useState(null);

  // console.log(expandedIndex);

  const handleCardClick = (index: any) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  //on click set card with data
  //if card display card

  return (
    <>
      <div className="">
        {/* <Mapbox data={coords} /> */}
        <div className="">
        <Deck data={coords} />
        </div>

        {locationData && (
          <div className="absolute w-screen overflow-auto left-0 bottom-2">
            <ul className="flex">
              {locationData.map((data: any, index: number) => (
                <li
                  onClick={() => {
                    handler(data.lat, data.lng);
                  }}
                  key={index}
                >
                  <Card
                    data={data}
                    onClick={() => handleCardClick(index)}
                    isExpanded={index === expandedIndex}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Cards;
