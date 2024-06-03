import Chat from "./components/Chat";
// import Nav from "./components/Nav";
import Cards from "./components/Cards";
import { useState } from "react";

function App() {
  const [locationData, setLocationData] = useState([]);

  const updateLocationData = (newData: any) => {
    setLocationData(newData);
  };
  //App ->
  //Cards -> Deck -> Card
  //Chat

  return (
    <>
      <Cards locationData={locationData} />
      <Chat updateLocationData={updateLocationData} />
      {/* <Nav /> */}
      {/* <Mapbox/> */}
    </>
  );
}

export default App;
