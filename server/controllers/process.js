function extractPlaces(inputString) {
  const regex = /#(.*?)#/g;
  const matches = inputString.match(regex);
  return matches ? matches.map((match) => match.slice(1, -1)) : [];
}

// Main function to orchestrate the process
async function processPlaces(inputString) {
  const places = extractPlaces(inputString);

  if (places.length === 0) {
    console.log("No places found in the input string.");
    return;
  }

  const context = places[0]; // Assuming the first location is the context (city)
  const specificLocations = places.slice(1);

  const locationDetailsPromises = specificLocations.map(async (place) => {
    const obj = await buildObj(place, context);
    return obj;
  });

  const allLocationDetails = await Promise.all(locationDetailsPromises);

  console.log(allLocationDetails);
}

// Example usage
let text =
  "Certainly! In #Denver#, you might want to try out the eclectic menu at #Linger# for a unique dining experience. For a taste of modern American cuisine, check out #Mercantile Dining & Provision#. If you're a fan of Italian, #Bar Dough# offers delicious pasta dishes. For a casual vibe and great burgers, consider heading to #Highland Tap & Burger#. Enjoy your culinary journey in Denver!";

processPlaces(text);

async function buildObj(place, context) {
  //setup..
  const key = "API_KEY";
  const baseUrl = "https://api.content.tripadvisor.com/api/v1/location/";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };
  const searchUrl = `${baseUrl}search?key=${key}&searchQuery=${place}&address=${context}&language=en`;
  let locationId;
  //get location id
  try {
    const search = await fetch(searchUrl, options);
    const searchData = await search.json();
    console.log(searchData.data[0].location_id)
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

    console.log("Details:", detailsData);
    console.log("Photos:", photosData);

    let location = {
      location_id: +detailsData.location_id,
      name: detailsData.name,
      description: detailsData.description,
      lat: +detailsData.latitude,
      lng: +detailsData.longitude,
      rating: detailsData.rating_image_url,
      photos: photosData.data,
    };
    console.log(location)
    return location;

  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

// buildObj('Union Oyster House', 'Boston')
