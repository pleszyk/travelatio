// import { useState } from "react";

function Card({ data, isExpanded }: any) {
  console.log(isExpanded);
  // const [isExpanded, setIsExpanded] = useState(false);

  // const toggleExpand = () => {
  //   setIsExpanded(!isExpanded);
  // };
  // console.log(data);
  return (
    <>
      {/* <div className="max-w-xs rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src={data.photos[0].images.large.url}
          alt="img"
        />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{data.name}</div>
          {data.rating && (
            <img
              className="w-1/3"
              src={data.rating}
              alt="img"
            />
          )}
          {data.description &&<p className="text-gray-700 text-base">{data.description}</p>}
        </div>
      </div> */}
      {data.name && (
        <div
          // onClick={toggleExpand}
          className="relative m-2 h-36 flex flex-col text-white p-1 bg-gray-600 bg-opacity-80 shadow-md bg-clip-border rounded-xl"
        >
          <div
            className={`relative h-36 w-36 overflow-hidden text-white shadow-lg bg-clip-border rounded bg-blue-gray-500 shadow-blue-gray-500/40`}
          >
            {data.photos[0] && (
              <img
                src={data.photos[0].images.large.url}
                alt="card-image"
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="p-1">
            <h5 className="block mb-2 font-sans text-sm antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              {data.name}
            </h5>
            {/* {data.rating && (
              <img className="w-full" src={data.rating} alt="img" />
            )} */}
            {/* <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
            {data.description}
          </p> */}
          </div>
          {/* <div className="p-6 pt-0">
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
          >
            Read More
          </button>
        </div> */}
        </div>
      )}
    </>
  );
}

export default Card;
