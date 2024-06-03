const places = async (req, res) => {
  let text =
    "Certainly! In #Denver#, you might want to try out the eclectic menu at #Linger# for a unique dining experience. For a taste of modern American cuisine, check out #Mercantile Dining & Provision#. If you're a fan of Italian, #Bar Dough# offers delicious pasta dishes. For a casual vibe and great burgers, consider heading to #Highland Tap & Burger#. Enjoy your culinary journey in Denver!";
  let text2 = "Certainly! #Miami# is known for its vibrant culture, beautiful beaches, and exciting nightlife. Here are some places you might want to consider:#South Beach#: Famous for its white sandy beaches, colorful lifeguard stands, and lively atmosphere. Ocean Drive is a must-visit for its iconic Art Deco architecture. #Little Havana#: Immerse yourself in Cuban culture with delicious food, music, and vibrant street art. #Wynwood Walls#: Explore the Wynwood Arts District, known for its street art and murals. The Wynwood Walls showcase an impressive collection of urban art. #Vizcaya Museum and Gardens#: A beautiful estate with gardens, a museum, and a stunning view of Biscayne Bay. #Miami Seaquarium#: Perfect for families, this marine park features various marine life shows and exhibits. #Pérez Art Museum Miami (PAMM)#: Contemporary art lovers will appreciate this museum's diverse collection and waterfront location. #Everglades National Park#: Experience the unique ecosystem of the Everglades with airboat tours and wildlife sightings. #Calle Ocho#: Another vibrant area in Little Havana, Calle Ocho is known for its festivals, art galleries, and Latin music scene."
  let text3 = "#Tokyo# is a fascinating city with a mix of modernity and tradition. Here are some places you might want to explore: #Senso-ji Temple#: Tokyo's oldest temple located in Asakusa. Don't miss the iconic Thunder Gate and Nakamise Shopping Street. #Shibuya Crossing#: Experience the world's busiest pedestrian crossing in the heart of Shibuya, surrounded by neon lights and bustling energy. #Tsukiji Fish Market#: Explore the vibrant seafood market and enjoy fresh sushi and other local delicacies. #Meiji Shrine#: A serene Shinto shrine located in Shibuya, offering a peaceful escape from the urban hustle. #Tokyo Tower#: Enjoy panoramic views of the city from this iconic landmark, inspired by the Eiffel Tower. #Akihabara#: Known as the electronic and anime district, Akihabara is a paradise for tech enthusiasts and fans of Japanese pop culture. #Ueno Park#: A vast public park featuring museums, a zoo, and cherry blossoms during spring. #Odaiba#: A man-made island with shopping malls, entertainment complexes, and futuristic architecture. #Robot Restaurant#: Experience a unique dining and entertainment show in Shinjuku with robots, neon lights, and music. #Tokyo Disneyland and DisneySea#: Perfect for families and Disney fans, these theme parks offer a magical experience."
  let text4 = "Certainly! Boston is a city with a rich history and diverse cultural offerings. Here are some places you might want to explore in #Boston#: #Freedom Trail#: Walk along this 2.5-mile trail that takes you to 16 historical sites, including the Massachusetts State House, Old North Church, and the USS Constitution Museum. #Boston Common and Public Garden#: Relax in the oldest public park in the U.S. (Boston Common) and stroll through the adjacent Public Garden, famous for its swan boats. #Fenway Park#: Visit the oldest baseball park in the country, home to the Boston Red Sox. You can attend a game or take a guided tour. #Museum of Fine Arts#: Explore a vast collection of art from various periods and cultures, including paintings, sculptures, and decorative arts. #Isabella Stewart Gardner Museum#: Admire the art collection in a unique setting designed to resemble a 15th-century Venetian palace. #New England Aquarium#: Discover marine life through exhibits, interactive displays, and a giant ocean tank with a variety of sea creatures. #Boston Harbor Islands#: Take a ferry to explore the islands, offering hiking trails, historical sites, and beautiful views of the city. #Boston Museum of Science#: A family-friendly destination with interactive exhibits, live demonstrations, and an IMAX theater."
  let text5 = "#Switzerland# is renowned for its breathtaking landscapes, charming cities, and outdoor activities. Here are some places you might want to consider for your trip: #Zermatt#: Home to the iconic Matterhorn, Zermatt is a paradise for skiers and hikers. Enjoy stunning views, visit the Gornergrat Railway, and explore the charming car-free village #Lucerne#: Nestled between mountains and a picturesque lake, Lucerne is known for its medieval architecture. Walk across the Chapel Bridge, visit the Water Tower, and take a boat trip on Lake Lucerne #Interlaken#: Situated between Lake Thun and Lake Brienz, Interlaken is a gateway to the Jungfrau region. Enjoy outdoor activities like paragliding, hiking, and boat cruises #Bern#: The capital city with a well-preserved medieval old town. Explore the Zytglogge clock tower, the Federal Palace, and the Bear Park #Montreux#: Located on the shores of Lake Geneva, Montreux is famous for its annual Jazz Festival. Take a scenic train ride on the GoldenPass Line and visit Chillon Castle #Jungfraujoch#: Known as the \"Top of Europe,\" Jungfraujoch offers breathtaking views of the Aletsch Glacier. Take a train journey through the Eiger and Mönch mountains #Geneva#: A cosmopolitan city on the shores of Lake Geneva. Explore the International Red Cross and Red Crescent Museum, Jet d'Eau, and the United Nations headquarters #Swiss National Park#: Switzerland's only national park, located in the Engadine Valley. Experience pristine alpine landscapes and diverse wildlife #Lauterbrunnen Valley#: A picturesque valley with numerous waterfalls and access to attractions like Trümmelbach Falls and the Schilthorn #Rhine Falls#: Visit the largest waterfall in Europe, located near Schaffhausen. Take a boat trip to get up close to the falls."
  const places = extractPlaces(text2);
  console.log(places)

  if (places.length === 0) {
    console.log("No places found in the input string.");
    return;
  }

  try {
    const context = places[0]; // Assuming the first location is the context (city)
    const specificLocations = places.slice(1);

    const locationDetailsPromises = specificLocations.map(async (place) => {
      const obj = await buildObj(place, context);
      return obj;
    });

    const allLocationDetails = await Promise.all(locationDetailsPromises);

    // console.log(allLocationDetails);
    res.json(allLocationDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

function extractPlaces(inputString) {
  const regex = /#(.*?)#/g;
  const matches = inputString.match(regex);
  return matches ? matches.map((match) => match.slice(1, -1)) : [];
}

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
    // console.log(searchData.data[0].location_id)
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
    };
    console.log(location)
    return location;
  } catch (error) {
    console.error(error);
    // Handle errors
  }
}

export default places;
