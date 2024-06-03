import { useEffect, useState, useCallback } from "react";
import DeckGL, { FlyToInterpolator, MapView } from "deck.gl/typed";
import { IconLayer } from "@deck.gl/layers/typed";
import { Tile3DLayer } from "@deck.gl/geo-layers/typed";
import pin from "./pin.png";
import { isMobile } from "react-device-detect";
// import { LinearInterpolator } from "deck.gl/typed";
import StaticMap from "react-map-gl";
// import { CesiumIonLoader } from "@loaders.gl/3d-tiles";
// import {I3SLoader} from '@loaders.gl/i3s';

const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // eslint-disable-line
const TILESET_URL = "https://tile.googleapis.com/v1/3dtiles/root.json";

//https://deck.gl/docs/developer-guide/view-state-transitions
//https://github.com/CartoDB/tiles3d-demo/blob/master/components/Map/Map.jsx

//use viewstate & viewstate change instead of initalviewstate

function Deck({ data }: any) {
  const [lng, setLng] = useState<number>(12.323647);
  const [lat, setLat] = useState<number>(45.439087);
  const [credits, setCredits] = useState<string>("");
  // const [viewState, setViewState] = useState({
  //   latitude: 45.439087,
  //   longitude: 12.323647,
  //   zoom: 16.8,
  //   bearing: 90,
  //   pitch: 60,
  // });

  const ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128 },
  };
  // const transitionInterpolator = new LinearInterpolator(["bearing"]);

  const [initialViewState, setInitialViewState] = useState({
    // latitude: 45.439087,
    // longitude: 12.323647,
    latitude: lat,
    longitude: lng,
    zoom: 16.8,
    bearing: 90,
    pitch: 60,
    // transitionDuration: 1000,
    // transitionInterpolator: new FlyToInterpolator(),
  });

  const rotateCamera = useCallback(() => {
    setInitialViewState((viewState) => ({
      ...viewState,
      bearing: viewState.bearing + 1,
      transitionDuration: 1000,
      // transitionInterpolator,
      onTransitionEnd: rotateCamera,
    }));
  }, []);

  useEffect(() => {
    if (data) {
      setLat(data.lat);
      setLng(data.lng);
      setInitialViewState((viewState) => ({
        ...viewState,
        latitude: data.lat,
        longitude: data.lng,
        // zoom: 16.8,
        // bearing: 90,
        // pitch: 60,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
        onTransitionEnd: rotateCamera,
      }));
    }
  }, [data]);

  // useEffect(() => {
  //   rotateCamera();
  // }, [lat, lng]);

  const layers = [
    new Tile3DLayer({
      id: "google-3d-tiles",
      data: TILESET_URL,
      // opacity: 0.5,
      // loader: I3SLoader,
      onTilesetLoad: (tileset3d: any) => {
        tileset3d.options.onTraversalComplete = (selectedTiles: any) => {
          const uniqueCredits = new Set();
          selectedTiles.forEach((tile: any) => {
            const { copyright } = tile.content.gltf.asset;
            copyright.split(";").forEach(uniqueCredits.add, uniqueCredits);
          });
          setCredits([...uniqueCredits].join("; "));
          return selectedTiles;
        };
      },
      loadOptions: {
        fetch: { headers: { "X-GOOG-API-KEY": GOOGLE_MAPS_API_KEY } },
      },
      operation: "terrain+draw",
    }),
    new IconLayer({
      id: "icon-layer",
      data: [{ position: [lng, lat], icon: "marker" }],
      iconAtlas: pin, // Path to your icon atlas
      iconMapping: ICON_MAPPING,
      // getPosition: (d: any) => [d.position[0], d.position[1], 60],
      // getIcon: (d: any) => d.icon,
      getSize: 30, // Size of the icons
      sizeScale: 1,
      // getPixelOffset: [0, -100],
      parameters: {
        depthTest: false,
      },
    }),
  ];

  return (
    <>
      {/* <div className={`${size ? 'h-[55.8vh]' : 'h-[30vh]'}`}> */}
      {/* <div className="relative h-[40vh]"> */}
      <div>
        <DeckGL
          // style={{ backgroundColor: "#061714" }}
          initialViewState={initialViewState}
          // viewState={viewState}
          // onViewStateChange={({ viewState }: any) =>
          //   setInitialViewState(viewState)
          // }
          layers={layers}
          views={[
            new MapView({
              // farZMultiplier: 1,
              // nearZMultiplier: .5,
              controller: { touchRotate: true },
            }),
          ]}
          onLoad={rotateCamera}
          useDevicePixels={isMobile ? 1 : true}
          _pickable={isMobile ? false : true}
          _typedArrayManagerProps={
            isMobile ? { overAlloc: 1, poolSize: 0 } : undefined
          }
        >
          <StaticMap
            mapStyle={
              isMobile
                ? "mapbox://styles/mapbox/streets-v12"
                : "mapbox://styles/mapbox/streets-v12"
            }
            mapboxAccessToken={MAPBOX_API_KEY}
          />
        </DeckGL>
        <div className="absolute left-[8px] bottom-[4px] text-white text-[8px]">
          {credits}
        </div>
      </div>
      {/* {isMobile && <div className="absolute text-white top-10">Mobile</div>} */}
    </>
  );
}

export default Deck;
