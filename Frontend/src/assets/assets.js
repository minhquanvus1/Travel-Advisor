import logo from "./logo.png";
import vietnam_map from "./vietnam_map.png";
import small_logo from "./small_logo.png";
import credit_card from "./credit_card.png";

export const assets = {
  logo,
  vietnam_map,
  small_logo,
  credit_card,
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

    travelAdvice: {
      gettingThere: {
        flying:
          "Ho Chi Minh City's Tan Son Nhat International Airport (SGN) is the usual destination for those coming to the south of Vietnam.",
      },
      visa: "Most visitors will need a visa to enter Vietnam. People in many African countries and parts of Asia are exempt from Vietnam visa requirements. Citizens of North American and European countries will need to obtain a visa. Check out this website to find out if you need to apply for a visa.",
      bestTimeToVisit:
        "The best time to visit Ho Chi Minh City is during the drier months of December to March when temperatures range between 70 Fahrenheit (21 Celsius) and 93 Fahrenheit (34 Celsius). Many like to visit during the Tet Festival (Vietnamese New Year) in late January or early February. The whole country joins in the festivities and it's a colorful spectacle, but prices are higher and getting around may be difficult due to the large numbers of people traveling.",
      gettingAround: {
        Walking:
          "Crossing the road in Saigon can be a nightmare. The trick is to disconnect the part of your brain that processes fear. Be Moses. Walk slowly and confidently — the sea of motor scooters will part every time.",
        MotorcycleTaxi:
          "This is the absolute most fun way to see this town. Note that your moto driver will be getting a kickback from some places he’s recommending. He needs it to live, so if you get a good moto, tip well.",
        MotorbikeRental:
          "If you decide that you want to experience riding around the city yourself, you can hire a motorbike for about 10$/day. Riding a motorbike requires a Vietnamese driving license, if you get a visa longer than 3 months, you are eligible for one.",
      },
      onTheGround: {
        "What is the timezone?": "Indochina Time.",
        "What are the voltage/plug types?":
          "220V at 50Hz. Plugs are type A (two flat vertical pins), type C, and type F (two round pins).",
        "What is the currency?": "Vietnamese Dong (VND).",
        "Are ATMs readily accessible?": "Yes.",
        "Are credit cards widely accepted?":
          "Only usually accepted at hotels and restaurants.",
        "Is it easy to find a bank?": "Yes.",
      },
      tipping:
        "Tipping is not part of the culture in Vietnam, and you are not required to tip anywhere. There will be a service charge for more upscale restaurants. People more accustomed to receiving tips are tour guides and in Western-style hotels.",
      customs: {
        Friendliness:
          "Vietnamese people for long have been famed worldwide for their grace, politeness, generosity, and hospitality. When coming to the country, the locals are so friendly that you can rest assured that they will make every possible effort to make your trip as enjoyable as possible. And expatriates who reside in Vietnam for study or work are normally not so astonished when they are invited to visit and dine with a local family with whom they have just become acquainted. That’s simply the inherent hospitality of the Vietnamese.",
        "Dress well":
          "Generally speaking, Vietnamese people are careful in their dress, especially in public areas. In order to avoid this culturally sensitive matter, foreign travelers are strongly advised to put on proper dress when they are out. For example, when visiting a local temple or pagoda, you should never wear a short-sleeved shirt or shorts. Instead, a long-sleeved and shoulder-covered shirt and long pants will be much more appreciated. Do keep in mind that, no matter how open-minded and care-free you are, others around you may be judgmental.",
      },
    },
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
    travelAdvice: {
      gettingThere: {
        flying:
          "Phu Cat Airport (UIH) is the primary airport serving Quy Nhon. It is located about 30 kilometers from the city center.",
        train:
          "Quy Nhon has a railway station that connects to major cities in Vietnam such as Hanoi, Da Nang, and Ho Chi Minh City.",
        bus: "Various bus services operate to and from Quy Nhon, including Phuong Trang and Mai Linh, connecting it to major cities in Vietnam.",
        driving:
          "Quy Nhon is accessible via National Highway 1A, which runs the length of Vietnam. Be prepared for tolls and variable road conditions.",
      },
      visa: "Most visitors will need a visa to enter Vietnam. Citizens of certain countries in Southeast Asia, such as Thailand and Malaysia, are exempt from visa requirements. North American, European, and most other travelers will need to apply for a visa. Check the latest requirements before you travel.",
      bestTimeToVisit:
        "The best time to visit Quy Nhon is from January to March and from September to December. During these months, the weather is pleasant with less rainfall, making it ideal for outdoor activities and exploring the city. Temperatures range from 68°F (20°C) to 86°F (30°C).",
      gettingAround: {
        Walking:
          "Quy Nhon is a compact city, making it easy to explore on foot. Many of the city's attractions, restaurants, and beaches are within walking distance of each other.",
        BicycleRental:
          "Renting a bicycle is a popular and eco-friendly way to get around Quy Nhon. Many hotels and rental shops offer bicycles for a reasonable price.",
        MotorcycleTaxi:
          "Motorcycle taxis, known locally as 'xe ôm', are a convenient way to travel short distances. Negotiate the fare before starting your trip.",
        CarRental:
          "For those looking to explore the surrounding areas, renting a car is a viable option. Ensure you have a valid international driving permit.",
      },
      onTheGround: {
        "What is the timezone?": "Indochina Time (ICT).",
        "What are the voltage/plug types?":
          "220V at 50Hz. Plugs are type A (two flat vertical pins), type C, and type F (two round pins).",
        "What is the currency?": "Vietnamese Dong (VND).",
        "Are ATMs readily accessible?": "Yes.",
        "Are credit cards widely accepted?":
          "Credit cards are accepted at major hotels, restaurants, and shops, but it's always good to have cash on hand for smaller establishments.",
        "Is it easy to find a bank?":
          "Yes, banks are easily accessible in the city center.",
      },
      tipping:
        "Tipping is not customary in Vietnam, but it is appreciated. In upscale restaurants and hotels, a service charge may be included in the bill. Tipping tour guides and drivers is common.",
      customs: {
        Friendliness:
          "Quy Nhon locals are known for their warmth and hospitality. It is common for locals to invite visitors to join them for meals or social gatherings.",
        "Dress well":
          "While Quy Nhon is a beach destination, it is important to dress modestly when away from the beach. When visiting temples or local homes, wear clothing that covers your shoulders and knees.",
      },
    },
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
    rating: 4.5,
  },
  {
    id: 2,
    cityId: 1,
    name: "Ngoc Suong Ben Thuyen Restaurant",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/0e/07/9d/nha-hang-ng-c-suong-b.jpg?w=1200&h=-1&s=1",
    description:
      "NS Bến Thuyền is a rare gem among seafood restaurants in Ho Chi Minh City, excelling in three key areas: culinary creativity, unique dining experiences, and dedicated customer service. It has garnered the affection of many discerning diners over the years in Saigon precisely because it embodies these qualities.",
    websiteUrl: "https://www.nsbenthuyen.com/",
    phoneNumber: "+84 8 3844 3861",
    addressObj: {
      address: "11 Nguyen Van Troi",
      ward: "12",
      district: "Phu Nhuan",
      city: "Ho Chi Minh",
      country: "Vietnam",
      postalCode: "70000",
    },
    cuisines: [{ name: "Asian" }, { name: "Seafood" }, { name: "Vietnamese" }],
    lowestPrice: "19.00",
    highestPrice: "39.00",
    numberOfReviews: 48,
    rating: 4.5,
  },
  {
    id: 3,
    cityId: 1,
    name: "New World Restaurant",
    imageUrl:
      "https://saigon.newworldhotels.com/wp-content/uploads/sites/18/2014/05/Parkview-3.jpg",
    description:
      "New World Saigon Hotel is ideally situated in the heart of Ho Chi Minh City District 1 amid a bustling neighborhood of restaurants and entertainment venues, within walking distance to markets, museums and places of cultural interest. The hotel is located 20 minutes away from Tan Son Nhat International Airport and steps away from the central bus station, making it a perfect location to explore the city. The hotel offers 533 guestrooms and suites with multiple event venues, a casual all-day restaurant, a sophisticated Chinese restaurant and a vibrant lounge for late night enjoyment.",
    websiteUrl: "https://saigon.newworldhotels.com/en/dining/",
    phoneNumber: "+84 28 3822 8888",
    addressObj: {
      address: "76 Le Lai",
      ward: "Ben Thanh",
      district: "1",
      city: "Ho Chi Minh",
      country: "Vietnam",
      postalCode: "70000",
    },
    cuisines: [{ name: "Asian" }, { name: "Seafood" }, { name: "Vietnamese" }],
    lowestPrice: "19.00",
    highestPrice: "39.00",
    numberOfReviews: 3907,
    rating: 5,
  },
  {
    id: 4,
    cityId: 2,
    name: "Nhà Hàng Cá Khói",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/8e/ea/68/ca-khoi-restaurant.jpg?w=1200&h=-1&s=1",
    description:
      "Ca Khoi restaurant in Quy Nhon . We are serve fresh seafood, Vietnamese cuisine of three regions, BBQ, fresh juice, beer, draught beer",
    websiteUrl: "https://www.facebook.com/nhahangcakhoiqn/",
    phoneNumber: "+84 96 377 43 77",
    addressObj: {
      address: "04 Nguyễn Trung Tín Đối diện tòa nhà FLC Sea Tower",
      city: "Quy Nhon",
      country: "Vietnam",
      postalCode: "55110",
    },
    cuisines: [{ name: "Asian" }, { name: "Seafood" }, { name: "Vietnamese" }],
    lowestPrice: "0.00",
    highestPrice: "1.00",
    numberOfReviews: 52,
    rating: 4,
  },
];

export const category = [
  { id: 1, categoryName: "Attractions" },
  { id: 2, categoryName: "Tours" },
];

export const subCategory = [
  { id: 1, subCategoryName: "Spiritual Sites", categoryId: 1 },
  { id: 2, subCategoryName: "Points of Interest & Landmarks", categoryId: 1 },
  { id: 3, subCategoryName: "Observation Decks & Towers", categoryId: 1 },
  { id: 4, subCategoryName: "Flea & Street Markets", categoryId: 1 },
  { id: 8, subCategoryName: "Beaches", categoryId: 1 },

  { id: 5, subCategoryName: "Full-day Tours", categoryId: 2 },
  { id: 6, subCategoryName: "City Tours", categoryId: 2 },
  { id: 7, subCategoryName: "Historical Tours", categoryId: 2 },
];

export const attractions = [
  {
    id: 1,
    attractionName: "Bitexco Financial Tower",
    subCategoryId: 3,
    cityId: 1,
    numberOfReviews: 6260,
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-f/14/11/d4/2a/bitexco-financial-tower.jpg",
    websiteUrl: "http://www.bitexcofinancialtower.com/",
    addressObj: {
      address: "36 Ho Tung Mau",
      ward: "Ben Nghe",
      district: "1",
      city: "Ho Chi Minh",
      country: "Vietnam",
      postalCode: "70000",
    },
    latitude: "10.771853",
    longitude: "106.704529",
    rating: 5,
    description:
      "Bitexco Financial Tower at a height of 262 meters is the tallest building in Ho Chi Minh City up to date. With design concept is taken from the shape of a lotus bud, the Vietnam national flower, Bitexco Financial Tower is not merely a building which is covered in glass and steel, but also a symbol of beauty and the rapid development of Ho Chi Minh City economy, a key economic region in Vietnam. Bitexco Financial Tower is a typical example for creativity and unique design. One of the tower highlights is the first observation in the city at 49th floors. Saigon Skydeck has opened for all visitors from January 1, 2011. With a full range of services and facilities for visitors, the Skydeck has officially opened to welcome visitors both domestic and international visitors since July, 2011. Visitors have the opportunity to visit Saigon Skydeck, not only enjoy the full sight of the Ho Chi Minh City and Saigon River, but also have the chance to use the facilities and services at this Skydeck. With many activities will be held at the Skydeck during this year, with special offer prices for different customer groups, the Skydeck will be an attractive destination in the journey of Ho Chi Minh City's for both domestic and international tourists.",
  },
  {
    id: 2,
    attractionName: "Ben Thanh Market",
    subCategoryId: 4,
    cityId: 1,
    numberOfReviews: 13303,
    imageUrl:
      "https://tse4.mm.bing.net/th?id=OIP.QbZN1wP3qEDx7BgabYorRwHaE7&pid=Api&P=0&h=220",
    websiteUrl: "https://benthanhmarket.com.vn/",
    addressObj: {
      address: "Le Loi",
      ward: "Ben Thanh",
      district: "1",
      city: "Ho Chi Minh",
      country: "Vietnam",
      postalCode: "70000",
    },
    latitude: "10.772521",
    longitude: "106.698019",
    rating: 5,
    description:
      "This central market is the symbol and soul of Saigon, with over 1,500 booths trading wholesale and retail items ranging from food and apparel to fabric and cosmetics. There are four main gates and 12 entrances—with the main entrance located near the big clock tower. Here, you can spot interesting souvenir picks like embroidered wallets, lacquerware and silk scarves. If you’re a coffee lover, locals would recommend homegrown brands like Trung Nguyen, Metrang, Wakeup and Mr. Viet Coffee. When hungry, treat yourself to a comforting bowl of pho, a dragon fruit smoothie and Hue cake for dessert.",
  },
  {
    id: 3,
    attractionName: "Cu Chi Tunnels",
    subCategoryId: 2,
    cityId: 1,
    numberOfReviews: 25993,
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-s/1b/2a/05/1c/photo8jpg.jpg",
    websiteUrl: "http://diadaocuchi.com.vn/",
    addressObj: {},
    latitude: "11.061",
    longitude: "106.526",
    rating: 5,
    description:
      "On your guided tour of the Cu Chi Tunnels, you’ll learn about the history of this underground system. The tunnels were dug during the Vietnam War by Viet Cong soldiers as a way to move undetected and launch surprise attacks. Experience the tight squeeze firsthand by crawling through the tunnels, and fire assault rifles at the shooting range after. Pack bug spray and dress for hot and humid weather, arriving earlier in the day to beat the crowds and the afternoon sun. It's not recommended to visit the tunnels after a downpour, as the area will get very muddy.",
  },
  {
    id: 4,
    attractionName: "The Independence Palace",
    subCategoryId: 2,
    cityId: 1,
    numberOfReviews: 10355,
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/41/18/98/the-independence-palace.jpg?w=900&h=600&s=1",
    websiteUrl: "https://www.dinhdoclap.gov.vn/",
    addressObj: {
      address: "106 Nguyen Du",
      ward: "Ben Nghe",
      district: "1",
      city: "Ho Chi Minh",
      country: "Vietnam",
      postalCode: "70000",
    },
    latitude: "10.7769",
    longitude: "106.6953",
    rating: 4.5,
    description:
      "From Norodom Palace to Independence Palace 1868-1966” explores the century-long history of the building that once served as the seat of the French colonial government in Cochinchina. In 1954, this building was renamed Independence Palace. It subsequently witnessed many dramatic episodes in the rise and decline of the government of Ngo Dinh Diem, the founding leader of the Republic of Vietnam",
  },
  {
    id: 5,
    attractionName: "Chua Vinh Nghiem",
    subCategoryId: 1,
    cityId: 1,
    numberOfReviews: 118,
    imageUrl:
      "https://media-cdn.tripadvisor.com/media/photo-f/28/58/e9/52/caption.jpg",
    websiteUrl: "http://www.vinhnghiemvn.com/",
    addressObj: {
      address: "339 Nam Ky Khoi Nghia",
      ward: "7",
      district: "3",
      city: "Ho Chi Minh",
      country: "Vietnam",
      postalCode: "70000",
    },
    latitude: "10.7904",
    longitude: "106.6823",
    rating: 4.5,
    description:
      "Vĩnh Nghiêm Pagoda, nestled in District 3, Ho Chi Minh City, exudes tranquility. Its 7-story tower, standing 40 meters tall, blends traditional Vietnamese architecture with concrete. Here, Gautama Buddha and two bodhisattvas—Manjusri and Samantabhadra—are revered. The Peace Bell, a gift from a Fukushima monk, resonates with serenity. The pagoda’s library houses ancient Buddhist texts, while the main hall showcases a 4.5-tonne statue of Gautama Buddha. The pagoda’s architecture, with its intricate carvings and vibrant colors, is a testament to Vietnamese craftsmanship.",
  },
  {
    id: 6,
    attractionName: "Chua Ong Nui",
    subCategoryId: 1,
    cityId: 2,
    numberOfReviews: 14,
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/d4/fe/ea/photo0jpg.jpg?w=900&h=600&s=1",
    websiteUrl: "https://www.facebook.com/ChuaOngNuiBinhDinh/",
    addressObj: {
      city: "Quy Nhon",
      country: "Vietnam",
      postalCode: "55100",
    },
    latitude: "13.8014",
    longitude: "109.2216",
    rating: 5,
    description: `Ong Nui Temple, also known as Linh Phong Son Tu, is situated atop Chop Vung Peak in Phu Cat District, approximately 30 kilometers from the city of Quy Nhon. At an elevation of around 600 meters above sea level, Ong Nui Temple is one of the places that have a cool and pristine climate in Central Vietnam. 

Renowned as a cultural and spiritual landmark in Binh Dinh, Vietnam, Ong Nui Temple attracts numerous local and foreign visitors who come to marvel at its breathtaking scenery and the majestic Buddha statue perched atop the peak. To reach the entrance of Ong Nui Temple and the colossal seated Buddha statue, visitors must ascend approximately 600 steps, spanning from the foot of Ba Mountain to the summit.`,
  },
  {
    id: 7,
    attractionName: "Eo Gio",
    subCategoryId: 8,
    cityId: 2,
    numberOfReviews: 164,
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/d6/01/c5/caption.jpg?w=900&h=600&s=1",
    websiteUrl:
      "https://www.tripadvisor.in/Attraction_Review-g608528-d7989053-Reviews-Eo_Gio-Quy_Nhon_Binh_Dinh_Province.html",
    addressObj: {
      city: "Quy Nhon",
      country: "Vietnam",
      postalCode: "55100",
    },
    latitude: "13.8625",
    longitude: "109.2357",
    rating: 5,
    description: `Eo Gio is a captivating coastal gem in Quy Nhon, Vietnam. Nestled approximately 20 kilometers northeast of Quy Nhon city center, it lies within the Nhơn Lý commune. Here’s how to get there: from Quy Nhơn, follow Vo Nguyen Giap Street, cross the Thi Nai Bridge to Phuong Mai Peninsula, and then turn left at the second intersection. Continue straight until you reach Nhơn Lý commune, where you’ll find the entrance to Eo Gio. The journey offers breathtaking vistas of majestic rocky mountains, winding coastlines, and the azure sea. Eo Gio’s unique blend of natural beauty—white waves crashing against the shore, cacti dotting the landscape, and panoramic views—makes it an ideal destination for nature lovers. Visit during the dry season (December to May) for the best experience. Don’t miss the chance to capture stunning photos and immerse yourself in this picturesque haven!`,
  },
  {
    id: 8,
    attractionName: "Ky Co Beach",
    subCategoryId: 8,
    cityId: 2,
    numberOfReviews: 210,
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/4e/50/01/k-co-m-t-ngay-bi-n-d.jpg?w=900&amp;h=600&amp;s=1",
    websiteUrl:
      "https://www.tripadvisor.in/Attraction_Review-g608528-d7989053-Reviews-Eo_Gio-Quy_Nhon_Binh_Dinh_Province.html",
    addressObj: {
      city: "Quy Nhon",
      country: "Vietnam",
      postalCode: "55100",
    },
    latitude: "13.7626",
    longitude: "109.2828",
    rating: 5,
    description: `Ky Co Beach, nestled at the foot of Phuong Mai mountain in Nhon Ly Commune, Quy Nhon, Binh Dinh province, Vietnam, awaits travelers with its enchanting beauty. Located approximately 25-30 kilometers northeast of Quy Nhon city center, this pristine beach offers an idyllic escape from the city’s hustle and bustle. Imagine verdant mountains gently sloping toward a crescent-shaped beach, where turquoise waters meet the shore. Ky Co is often hailed as Vietnam’s answer to the Maldives, captivating visitors with its magnificent landscapes. Whether you arrive by car, taxi, motorbike, or guided tour, this untouched paradise promises a tranquil environment for unwinding and capturing breathtaking photos.`,
  },
];

export const tours = [
  {
    id: 1,
    tourName: "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
    cityId: 1,
    subCategoryId: 7,
    numberOfReviews: 10403,
    imageObject: {
      primaryImage: {
        imageUrl:
          "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      },
      images: [
        {
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/47.jpg",
        },
        {
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/41.jpg",
        },
      ],
    },
    languages: [
      {
        languageID: 1,
        languageName: "English",
      },
      {
        languageID: 2,
        languageName: "Chinese",
      },
      {
        languageID: 3,
        languageName: "French",
      },
    ],
    minAge: 3,
    maxAge: 99,
    maxGroupSize: 25,
    duration: 6,
    price: "17.90",
    rating: 4.5,
    highlights: [
      {
        highlightID: 1,
        highlightText:
          "Guided tour of the Cu Chi Tunnels from Ho Chi Minh City",
      },
      {
        highlightID: 2,
        highlightText:
          "Incredible photo opportunities in the tunnels and with trapdoors",
      },
      {
        highlightID: 3,
        highlightText: "Save money on a group tour with entrance included",
      },
      {
        highlightID: 4,
        highlightText:
          "Hassle-free hotel pickup and round-trip transport from Ho Chi Minh City",
      },
    ],
    description:
      "Used by the Viet Cong during the Vietnam War, the Cu Chi Tunnels are a network of underground tunnels stretching more than 124 miles (200 kilometers). For travelers on a budget, this group tour of up to 20 people offers great value, including hotel pickup, round-trip transport, and a guided tour of the tunnels. Choose from a morning or afternoon tour to suit your schedule.",

    tourDetails: {
      included: [
        "Transfer by Air-conditioned Bus",
        "English-speaking Tour Guide",
        "Entrance ticket",
        "Tapioca, hot tea, bottled water",
        "Hotel pickup in center of District 1 (except for Tan Dinh & Dakao Ward)",
        "Lunch (if VIP option selected)",
        "Entry/Admission - Cu Chi Tunnels",
      ],
      notIncluded: [
        "Tips (optional & recommended)",
        "Bullets (if you try shooting the war gun)",
      ],
      whatToExpect: `After pickup from your Ho Chi Minh City hotel in the morning or afternoon (depending on option selected), travel to the Cu Chi Tunnels and follow your guide on a tour of the tunnels. Learn how the Viet Cong soldiers used the vast network of underground tunnels during the Vietnam War/. Step inside the tunnels and see the former war bunkers, ammunition stores, and field hospitals. Then pose for photos peeking out of a camouflaged trapdoor, climb aboard an old American army tank, or visit the shooting range (optional: own expense). 

Your tour ends with drop-off in Ho Chi Minh’s city center.`,
      additionalInformation: [
        "Confirmation will be received at time of booking",
        "Most travelers can participate",
        "You must be above the age of 18 to participate in shooting experience",
        "After the morning tour, visit a nearby restaurant for restroom, feel free to enjoy a light lunch on your own",
        "This tour/activity will have a maximum of 25 travelers",
      ],
      accessibility: [
        "Not wheel chair accessible",
        "Near public transportation",
        "Infants must sit on laps",
      ],
      departureAndReturn: {
        start: {
          description: "Multiple pickup locations offered.",
          address:
            "123 Lý Tự Trọng, Phường Bến Thành, Quận 1, Hồ Chí Minh, Vietnam",
        },
        pickupDetails: {
          description:
            "Pickup is offered in the center of District 1. Other Districts, please come to the meeting point (Vietnam Adventure Tours office) at: 123 Ly Tu Trong street, District 1 by 8:00AM for Morning Tour or 12:10PM for Afternoon Tour.",
          hotelPickupOffered: true,
          hotelPickupNote:
            "During checkout you will be able to select from the list of included hotels.",
        },
        end: {
          description: "This activity ends back at the meeting point.",
        },
      },
    },
  },
  {
    id: 2,
    tourName: "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
    cityId: 1,
    subCategoryId: 7,
    numberOfReviews: 10403,
    imageObject: {
      primaryImage: {
        imageUrl:
          "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      },
      images: [
        {
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/47.jpg",
        },
        {
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/41.jpg",
        },
      ],
    },
    languages: [
      {
        languageID: 1,
        languageName: "English",
      },
      {
        languageID: 2,
        languageName: "Chinese",
      },
      {
        languageID: 3,
        languageName: "French",
      },
    ],
    minAge: 3,
    maxAge: 99,
    maxGroupSize: 25,
    duration: 6,
    price: "17.90",
    rating: 4.5,
    highlights: [
      {
        highlightID: 1,
        highlightText:
          "Guided tour of the Cu Chi Tunnels from Ho Chi Minh City",
      },
      {
        highlightID: 2,
        highlightText:
          "Incredible photo opportunities in the tunnels and with trapdoors",
      },
      {
        highlightID: 3,
        highlightText: "Save money on a group tour with entrance included",
      },
      {
        highlightID: 4,
        highlightText:
          "Hassle-free hotel pickup and round-trip transport from Ho Chi Minh City",
      },
    ],
    description:
      "Used by the Viet Cong during the Vietnam War, the Cu Chi Tunnels are a network of underground tunnels stretching more than 124 miles (200 kilometers). For travelers on a budget, this group tour of up to 20 people offers great value, including hotel pickup, round-trip transport, and a guided tour of the tunnels. Choose from a morning or afternoon tour to suit your schedule.",

    tourDetails: {
      included: [
        "Transfer by Air-conditioned Bus",
        "English-speaking Tour Guide",
        "Entrance ticket",
        "Tapioca, hot tea, bottled water",
        "Hotel pickup in center of District 1 (except for Tan Dinh & Dakao Ward)",
        "Lunch (if VIP option selected)",
        "Entry/Admission - Cu Chi Tunnels",
      ],
      notIncluded: [
        "Tips (optional & recommended)",
        "Bullets (if you try shooting the war gun)",
      ],
      whatToExpect: `After pickup from your Ho Chi Minh City hotel in the morning or afternoon (depending on option selected), travel to the Cu Chi Tunnels and follow your guide on a tour of the tunnels. Learn how the Viet Cong soldiers used the vast network of underground tunnels during the Vietnam War/. Step inside the tunnels and see the former war bunkers, ammunition stores, and field hospitals. Then pose for photos peeking out of a camouflaged trapdoor, climb aboard an old American army tank, or visit the shooting range (optional: own expense). 

Your tour ends with drop-off in Ho Chi Minh’s city center.`,
      additionalInformation: [
        "Confirmation will be received at time of booking",
        "Most travelers can participate",
        "You must be above the age of 18 to participate in shooting experience",
        "After the morning tour, visit a nearby restaurant for restroom, feel free to enjoy a light lunch on your own",
        "This tour/activity will have a maximum of 25 travelers",
      ],
      accessibility: [
        "Not wheel chair accessible",
        "Near public transportation",
        "Infants must sit on laps",
      ],
      departureAndReturn: {
        start: {
          description: "Multiple pickup locations offered.",
          address:
            "123 Lý Tự Trọng, Phường Bến Thành, Quận 1, Hồ Chí Minh, Vietnam",
        },
        pickupDetails: {
          description:
            "Pickup is offered in the center of District 1. Other Districts, please come to the meeting point (Vietnam Adventure Tours office) at: 123 Ly Tu Trong street, District 1 by 8:00AM for Morning Tour or 12:10PM for Afternoon Tour.",
          hotelPickupOffered: true,
          hotelPickupNote:
            "During checkout you will be able to select from the list of included hotels.",
        },
        end: {
          description: "This activity ends back at the meeting point.",
        },
      },
    },
  },
  {
    id: 3,
    tourName: "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
    cityId: 1,
    subCategoryId: 7,
    numberOfReviews: 10403,
    imageObject: {
      primaryImage: {
        imageUrl:
          "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      },
      images: [
        {
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/47.jpg",
        },
        {
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/41.jpg",
        },
      ],
    },
    languages: [
      {
        languageID: 1,
        languageName: "English",
      },
      {
        languageID: 2,
        languageName: "Chinese",
      },
      {
        languageID: 3,
        languageName: "French",
      },
    ],
    minAge: 3,
    maxAge: 99,
    maxGroupSize: 25,
    duration: 6,
    price: "17.90",
    rating: 4.5,
    highlights: [
      {
        highlightID: 1,
        highlightText:
          "Guided tour of the Cu Chi Tunnels from Ho Chi Minh City",
      },
      {
        highlightID: 2,
        highlightText:
          "Incredible photo opportunities in the tunnels and with trapdoors",
      },
      {
        highlightID: 3,
        highlightText: "Save money on a group tour with entrance included",
      },
      {
        highlightID: 4,
        highlightText:
          "Hassle-free hotel pickup and round-trip transport from Ho Chi Minh City",
      },
    ],
    description:
      "Used by the Viet Cong during the Vietnam War, the Cu Chi Tunnels are a network of underground tunnels stretching more than 124 miles (200 kilometers). For travelers on a budget, this group tour of up to 20 people offers great value, including hotel pickup, round-trip transport, and a guided tour of the tunnels. Choose from a morning or afternoon tour to suit your schedule.",

    tourDetails: {
      included: [
        "Transfer by Air-conditioned Bus",
        "English-speaking Tour Guide",
        "Entrance ticket",
        "Tapioca, hot tea, bottled water",
        "Hotel pickup in center of District 1 (except for Tan Dinh & Dakao Ward)",
        "Lunch (if VIP option selected)",
        "Entry/Admission - Cu Chi Tunnels",
      ],
      notIncluded: [
        "Tips (optional & recommended)",
        "Bullets (if you try shooting the war gun)",
      ],
      whatToExpect: `After pickup from your Ho Chi Minh City hotel in the morning or afternoon (depending on option selected), travel to the Cu Chi Tunnels and follow your guide on a tour of the tunnels. Learn how the Viet Cong soldiers used the vast network of underground tunnels during the Vietnam War/. Step inside the tunnels and see the former war bunkers, ammunition stores, and field hospitals. Then pose for photos peeking out of a camouflaged trapdoor, climb aboard an old American army tank, or visit the shooting range (optional: own expense). 

Your tour ends with drop-off in Ho Chi Minh’s city center.`,
      additionalInformation: [
        "Confirmation will be received at time of booking",
        "Most travelers can participate",
        "You must be above the age of 18 to participate in shooting experience",
        "After the morning tour, visit a nearby restaurant for restroom, feel free to enjoy a light lunch on your own",
        "This tour/activity will have a maximum of 25 travelers",
      ],
      accessibility: [
        "Not wheel chair accessible",
        "Near public transportation",
        "Infants must sit on laps",
      ],
      departureAndReturn: {
        start: {
          description: "Multiple pickup locations offered.",
          address:
            "123 Lý Tự Trọng, Phường Bến Thành, Quận 1, Hồ Chí Minh, Vietnam",
        },
        pickupDetails: {
          description:
            "Pickup is offered in the center of District 1. Other Districts, please come to the meeting point (Vietnam Adventure Tours office) at: 123 Ly Tu Trong street, District 1 by 8:00AM for Morning Tour or 12:10PM for Afternoon Tour.",
          hotelPickupOffered: true,
          hotelPickupNote:
            "During checkout you will be able to select from the list of included hotels.",
        },
        end: {
          description: "This activity ends back at the meeting point.",
        },
      },
    },
  },
  {
    id: 4,
    tourName: "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
    cityId: 1,
    subCategoryId: 7,
    numberOfReviews: 10403,
    imageObject: {
      primaryImage: {
        imageUrl:
          "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      },
      images: [
        {
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/47.jpg",
        },
        {
          imageUrl:
            "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/41.jpg",
        },
      ],
    },
    languages: [
      {
        languageID: 1,
        languageName: "English",
      },
      {
        languageID: 2,
        languageName: "Chinese",
      },
      {
        languageID: 3,
        languageName: "French",
      },
    ],
    minAge: 3,
    maxAge: 99,
    maxGroupSize: 25,
    duration: 6,
    price: "17.90",
    rating: 4.5,
    highlights: [
      {
        highlightID: 1,
        highlightText:
          "Guided tour of the Cu Chi Tunnels from Ho Chi Minh City",
      },
      {
        highlightID: 2,
        highlightText:
          "Incredible photo opportunities in the tunnels and with trapdoors",
      },
      {
        highlightID: 3,
        highlightText: "Save money on a group tour with entrance included",
      },
      {
        highlightID: 4,
        highlightText:
          "Hassle-free hotel pickup and round-trip transport from Ho Chi Minh City",
      },
    ],
    description:
      "Used by the Viet Cong during the Vietnam War, the Cu Chi Tunnels are a network of underground tunnels stretching more than 124 miles (200 kilometers). For travelers on a budget, this group tour of up to 20 people offers great value, including hotel pickup, round-trip transport, and a guided tour of the tunnels. Choose from a morning or afternoon tour to suit your schedule.",

    tourDetails: {
      included: [
        "Transfer by Air-conditioned Bus",
        "English-speaking Tour Guide",
        "Entrance ticket",
        "Tapioca, hot tea, bottled water",
        "Hotel pickup in center of District 1 (except for Tan Dinh & Dakao Ward)",
        "Lunch (if VIP option selected)",
        "Entry/Admission - Cu Chi Tunnels",
      ],
      notIncluded: [
        "Tips (optional & recommended)",
        "Bullets (if you try shooting the war gun)",
      ],
      whatToExpect: `After pickup from your Ho Chi Minh City hotel in the morning or afternoon (depending on option selected), travel to the Cu Chi Tunnels and follow your guide on a tour of the tunnels. Learn how the Viet Cong soldiers used the vast network of underground tunnels during the Vietnam War/. Step inside the tunnels and see the former war bunkers, ammunition stores, and field hospitals. Then pose for photos peeking out of a camouflaged trapdoor, climb aboard an old American army tank, or visit the shooting range (optional: own expense). 

Your tour ends with drop-off in Ho Chi Minh’s city center.`,
      additionalInformation: [
        "Confirmation will be received at time of booking",
        "Most travelers can participate",
        "You must be above the age of 18 to participate in shooting experience",
        "After the morning tour, visit a nearby restaurant for restroom, feel free to enjoy a light lunch on your own",
        "This tour/activity will have a maximum of 25 travelers",
      ],
      accessibility: [
        "Not wheel chair accessible",
        "Near public transportation",
        "Infants must sit on laps",
      ],
      departureAndReturn: {
        start: {
          description: "Multiple pickup locations offered.",
          address:
            "123 Lý Tự Trọng, Phường Bến Thành, Quận 1, Hồ Chí Minh, Vietnam",
        },
        pickupDetails: {
          description:
            "Pickup is offered in the center of District 1. Other Districts, please come to the meeting point (Vietnam Adventure Tours office) at: 123 Ly Tu Trong street, District 1 by 8:00AM for Morning Tour or 12:10PM for Afternoon Tour.",
          hotelPickupOffered: true,
          hotelPickupNote:
            "During checkout you will be able to select from the list of included hotels.",
        },
        end: {
          description: "This activity ends back at the meeting point.",
        },
      },
    },
  },
];

export const days = [{ id: 1, tourId: 1 }];

export const stops = [
  {
    id: 1,
    tourId: 1,
    dayId: 1,
    stopName: "Cu Chi Tunnels",
    description:
      "Around 8:00AM or 12:10PM. Start with pickup from the center of Ho Chi Minh City or meet at the meeting point then depart for Cu Chi Tunnels. After 1.5 hour drive, we arrive at the Tunnels where You'll have the opportunity to explore the tunnel system, which includes narrow passageways, hidden entrances, and underground chambers. Learn about the daily life of the Cu Chi guerrilla fighters and how they managed to survive in the tunnels. You can crawl distances through the tunnels that were used by the guerrilla fighters during the Vietnam War. You may see kitchens, living quarters, among other things used during the war. Learn about how different types traps were created and set up. Visit the weapon rooms and learn how the ingenious soldiers made them. You can also safely try your hand at the shooting range with an AK-47. After exploration, we travel back to Ho Chi Minh City. Arrive approximately at 3:00pm for the morning tour and 6:50pm for the afternoon tour.",
    latitude: "11.061",
    longitude: "106.526",
  },
  {
    id: 2,
    tourId: 1,
    dayId: 1,
    stopName: "skibidi",
    description:
      "Around 8:00AM or 12:10PM. Start with pickup from the center of Ho Chi Minh City or meet at the meeting point then depart for Cu Chi Tunnels. After 1.5 hour drive, we arrive at the Tunnels where You'll have the opportunity to explore the tunnel system, which includes narrow passageways, hidden entrances, and underground chambers. Learn about the daily life of the Cu Chi guerrilla fighters and how they managed to survive in the tunnels. You can crawl distances through the tunnels that were used by the guerrilla fighters during the Vietnam War. You may see kitchens, living quarters, among other things used during the war. Learn about how different types traps were created and set up. Visit the weapon rooms and learn how the ingenious soldiers made them. You can also safely try your hand at the shooting range with an AK-47. After exploration, we travel back to Ho Chi Minh City. Arrive approximately at 3:00pm for the morning tour and 6:50pm for the afternoon tour.",
    latitude: "10.7815271",
    longitude: "106.6409313",
  },
];

export const users = [
  {
    id: 1,
    name: "Lincoln",
    city: "Ho Chi Minh",
    country: "Vietnam",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1",
  },
  {
    id: 2,
    name: "Trump",
    city: "New York",
    country: "USA",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1",
  },
  {
    id: 3,
    name: "Putin",
    city: "Moscow",
    country: "Russia",
    imageUrl:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1",
  },
];

export const attractionReviews = [
  {
    id: 1,
    userId: 1,
    attractionId: 6,
    reviewTitle: "Stunning views and peaceful",
    reviewDescription:
      "Gorgeous sea peninsula views from the top of the big Buddha. Loads of steps - we chose to take the motorbike ride up and walked down. Bike ride one way was 20k and another 20k entrance fee. Beautiful and peaceful inside. Worth the visit. We went as part of a day tour with Private driver booked through Quy Nhon sports club.",
    rating: "5",
    reviewDate: "March 22, 2024",
  },
  {
    id: 2,
    userId: 2,
    attractionId: 7,
    reviewTitle: "Magnificient",
    reviewDescription:
      "Gorgeous sea peninsula views from the top of the big Buddha. Loads of steps - we chose to take the motorbike ride up and walked down. Bike ride one way was 20k and another 20k entrance fee. Beautiful and peaceful inside. Worth the visit. We went as part of a day tour with Private driver booked through Quy Nhon sports club.",
    rating: "5",
    reviewDate: "March 25, 2024",
  },
  {
    id: 3,
    userId: 3,
    attractionId: 8,
    reviewTitle: "Spectacular, fantastic",
    reviewDescription:
      "Gorgeous sea peninsula views from the top of the big Buddha. Loads of steps - we chose to take the motorbike ride up and walked down. Bike ride one way was 20k and another 20k entrance fee. Beautiful and peaceful inside. Worth the visit. We went as part of a day tour with Private driver booked through Quy Nhon sports club.",
    rating: "5",
    reviewDate: "March 27, 2024",
  },
  {
    id: 4,
    userId: 3,
    attractionId: 3,
    reviewTitle: "Wonderful, majestic",
    reviewDescription:
      "Gorgeous sea peninsula views from the top of the big Buddha. Loads of steps - we chose to take the motorbike ride up and walked down. Bike ride one way was 20k and another 20k entrance fee. Beautiful and peaceful inside. Worth the visit. We went as part of a day tour with Private driver booked through Quy Nhon sports club.",
    rating: "4.5",
    reviewDate: "March 28, 2024",
  },
  {
    id: 5,
    userId: 3,
    attractionId: 1,
    reviewTitle: "Super duper, awesome",
    reviewDescription:
      "Gorgeous sea peninsula views from the top of the big Buddha. Loads of steps - we chose to take the motorbike ride up and walked down. Bike ride one way was 20k and another 20k entrance fee. Beautiful and peaceful inside. Worth the visit. We went as part of a day tour with Private driver booked through Quy Nhon sports club.",
    rating: "4.5",
    reviewDate: "March 29, 2024",
  },
  {
    id: 6,
    userId: 3,
    attractionId: 5,
    reviewTitle: "Best experiences ever",
    reviewDescription:
      "Gorgeous sea peninsula views from the top of the big Buddha. Loads of steps - we chose to take the motorbike ride up and walked down. Bike ride one way was 20k and another 20k entrance fee. Beautiful and peaceful inside. Worth the visit. We went as part of a day tour with Private driver booked through Quy Nhon sports club.",
    rating: "4",
    reviewDate: "March 30, 2024",
  },
  {
    id: 7,
    userId: 3,
    attractionId: 6,
    reviewTitle: "Lovely, gorgeous, awe",
    reviewDescription:
      "Gorgeous sea peninsula views from the top of the big Buddha. Loads of steps - we chose to take the motorbike ride up and walked down. Bike ride one way was 20k and another 20k entrance fee. Beautiful and peaceful inside. Worth the visit. We went as part of a day tour with Private driver booked through Quy Nhon sports club.",
    rating: "3.5",
    reviewDate: "March 31, 2024",
  },
];
