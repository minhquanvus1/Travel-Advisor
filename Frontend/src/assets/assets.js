import logo from "./logo.png";
import vietnam_map from "./vietnam_map.png";

export const assets = {
  logo,
  vietnam_map,
};

export const cities = [
  {
    id: 1,
    name: "Ho Chi Minh city",
    imageUrl:
      "https://vietnamnomad.com/wp-content/uploads/2021/02/Downtown-Ho-Chi-Minh-City-Video.jpg",
    description:
      "Ho Chi Minh City, the pièce de résistance of Vietnam, is a bustling metropolis in no short supply of charm and allure. This vibrant city seamlessly melds historical elegance with contemporary dynamism. Wander through its boulevards and marvel at the stunning architecture, or delve into the culinary scene, where street food and fine dining coexist harmoniously. The historic Hoi Truong Thong Nhat Palace and the intricately adorned Emperor Jade Pagoda stand as testaments to the city’s rich heritage. In Ho Chi Minh City, each corner reveals a new adventure, promising unforgettable experiences at every turn.",
    cuisine: [
      {
        id: 1,
        name: "Pho",
        imageUrl:
          "https://asianwaytravel.com/wp-content/uploads/2022/07/ph%E1%BB%9F-b%C3%B2.jpg",
        description:
          "Aromatic broth simmered for hours, tender beef slices, and fresh herbs combine to create Vietnam's quintessential noodle soup.",
      },
      {
        id: 2,
        name: "Banh Mi",
        imageUrl:
          "https://tse3.mm.bing.net/th?id=OIP.j_0FHAuCbmn9sxjfZZ0ZOgHaE7&pid=Api&P=0&h=220",
        description:
          "Crispy baguette filled with savory pork, pâté, fresh vegetables, and zesty pickles, creating a harmonious symphony of flavors.",
      },
      {
        id: 3,
        name: "Com Tam",
        imageUrl:
          "https://tse1.mm.bing.net/th?id=OIP.srovx59ow2asbG4fNCcb1QHaE7&pid=Api&P=0&h=220",
        description:
          "Fragrant broken rice served with succulent grilled pork, a perfectly fried egg, and accompanied by a medley of pickled vegetables and fish sauce.",
      },
    ],
  },
  {
    id: 2,
    name: "Quy Nhon city",
    imageUrl:
      "https://vietnamtour.com/images/photos/asia/quy-nhon-city-tour-3.jpg?t=1593696405",
    description:
      "Quy Nhon City, nestled along Vietnam's exquisite coastline, unveils itself as a sanctuary of tranquility and cultural splendor. This coastal haven beckons with its unspoiled beaches, where azure waters gently lap against powdery sands, creating a serene backdrop for contemplation and rejuvenation. Explore the labyrinthine alleys adorned with traditional architecture, offering glimpses of ancient Cham relics and ornate Buddhist sanctuaries that whisper tales of antiquity. Delight in the region's gastronomic treasures, where flavors meld in a symphony of culinary finesse. Quy Nhon epitomizes elegance and allure, inviting discerning travelers to uncover its hidden marvels and indulge in moments of profound discovery.",
    cuisine: [
      {
        id: 4,
        name: "Banh Xeo Tom Nhay",
        imageUrl:
          "https://tiemchachica.com/wp-content/uploads/2023/03/banh-xeo-binh-dinh-1.jpg",
        description:
          "Golden, crispy pancakes filled with succulent shrimp and bean sprouts, served with fresh greens and a tangy dipping sauce.",
      },
      {
        id: 5,
        name: "Banh It La Gai",
        imageUrl:
          "https://tourdanangcity.vn/wp-content/uploads/2023/05/banh-it-la-gai-quy-nhon-binh-dinh-02.jpg",
        description:
          "Delicate glutinous rice cakes enveloped in a rich, sweet mung bean filling, wrapped in fragrant banana leaves.",
      },
      {
        id: 6,
        name: "Seafood",
        imageUrl:
          "https://tse1.explicit.bing.net/th?id=OIP.ESel2W-6B_iFAcf4h_tPMwHaE8&pid=Api&P=0&h=220",
        description:
          "An array of fresh seafood, from succulent grilled prawns to tender squid, each dish bursting with the flavors of the sea.",
      },
    ],
  },
];

export const restaurants = [
  {
    id: 1,
    cityId: 1,
    name: "Truffle Restaurant",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
    description:
      "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City. The restaurant serves set menus with a focus on French cuisine, using the freshest and highest-quality ingredients. The relaxed and elegant atmosphere, accompanied by knowledgeable and attentive staff, ensures a memorable dining experience. The menu also features a selection of fine wines and spirits to complement the delicious meal. For those seeking a luxurious and indulgent dining experience, Truffle Restaurant in Landmark 81 is definitely worth a visit.",
    websiteUrl: "http://truffle.com.vn/",
    phoneNumber: "+84 98 878 33 53",
    addressObj: {
      address: "28 Nguyen Huu Canh",
      ward: "22",
      district: "Binh Thanh",
      city: "Ho Chi Minh",
      country: "Vietnam",
      postalCode: "70000",
    },
    cuisines: [
      { name: "French" },
      { name: "Seafood" },
      { name: "European" },
      { name: "Fusion" },
    ],
    lowestPrice: "109.00",
    highestPrice: "390.00",
    numberOfReviews: 18,
  },
];
