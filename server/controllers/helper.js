export function extractPlaces(inputString) {
  const regex = /#(.*?)#/g;
  const matches = inputString.match(regex);
  return matches ? matches.map((match) => match.slice(1, -1)) : [];
}

export async function buildObj(place) {
  //setup..
  const key = "API_KEY";
  const baseUrl = "https://api.content.tripadvisor.com/api/v1/location/";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const searchUrl = `${baseUrl}search?key=${key}&searchQuery=${place}&language=en`;
  let locationId;
  //get location id
  try {
    const search = await fetch(searchUrl, options);
    const searchData = await search.json();
    console.log(searchData)
    locationId = searchData.data[0].location_id;
    //   res.json(data);
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: "Internal Server Error" });
  }

  //get place details
  const detailsUrl = `${baseUrl}${locationId}/details?key=${key}&language=en`;
  const photosUrl = `${baseUrl}${locationId}/photos?key=${key}&language=en`;

  try {
    // Concurrently fetch details and photos
    const [detailsResponse, photosResponse] = await Promise.all([
      fetch(detailsUrl, options),
      fetch(photosUrl, options),
    ]);

    const detailsData = await detailsResponse.json();
    const photosData = await photosResponse.json();

    // console.log("Details:", detailsData.name);
    // console.log("Photos:", photosData);

    let location = {
      location_id: +detailsData.location_id,
      name: detailsData.name,
      description: detailsData.description,
      lat: +detailsData.latitude,
      lng: +detailsData.longitude,
      rating: detailsData.rating_image_url,
      photos: photosData.data,
      alldetails: detailsData
    };
    console.log(location);
    return location;
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}