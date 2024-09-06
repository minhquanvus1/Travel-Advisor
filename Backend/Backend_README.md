# Travel Advisor (Backend)

- The Backend app is built with Java Spring Boot

## Getting Started

### Pre-requisite and Local Development

- Developers should have Java 21 installed in their local machine. If you don't have Java 11 installed, you can download it from [Java 21](https://www.oracle.com/java/technologies/javase-jdk21-downloads.html)

- Developers should have Docker installed in their local machine. If you don't have Docker installed, you can download it from [Docker](https://www.docker.com/products/docker-desktop)

- Developers should have Maven installed in their local machine. If you don't have Maven installed, you can download it from [Maven](https://maven.apache.org/download.cgi)

- Developers are recommended to use IntelliJ IDEA as the IDE for the Backend Java Spring Boot project. If you don't have IntelliJ IDEA installed, you can download it from [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)

### Backend Folder Structure

- The Backend Java Spring Boot has the following structure:

## API Reference

### Introduction

- These APIs is for the Travel Advisor Application. We can use these APIs to perform CRUD with entities in the database

- Base URL: At present this app can only be run locally and is not hosted as a base URL. The backend app is hosted at the default, http://127.0.0.1/8080/, which is set as a proxy in the frontend configuration.

- Authentication: This version of the application does not require authentication or API keys.

### Error Handling:

- Errors are returns in JSON format as follows:

```json
{
  "success": false,
  "error": 404,
  "message": "Resource Not Found"
}
```

There are three types of errors:

- 400: Bad Request
- 404: Resource Not Found
- 500: INTERNAL SERVER ERROR

### Endpoints:

- I will demonstrate the endpoints for each Entity, which are: Category, Subcategory, City, Restaurant, Attraction, Tour, Attraction Review, and User

#### Category:

1. GET /categories:

- General:
  - Get all Categories
- Request Arguments:
  - None
- Returns:
  - Return a List of Categories
- Sample request:
  - `curl GET http://localhost:8080/categories`
- Sample response:

```json
[
  {
    "id": 12,
    "name": "Attraction"
  },
  {
    "id": 15,
    "name": "Tour"
  }
]
```

2. GET /categories/{id}

- General:
  - Get Category by id
- Path Arguments:
  - id: integer
- Returns:
  - Return a Category object with this id
- Sample request:
  - `curl GET http://localhost:8080/categories/12`
- Sample response:

```json
{
  "id": 12,
  "name": "Attraction"
}
```

3. POST /categories

- General:
  - Create a new Category
- Request body:
- Returns:
  - Return the created Category object
- Sample request:

```json
curl -X POST http://localhost:8080/categories \
    -H "Content-Type: application/json" \
    -d '{
          "name": "skibidi category3",
          "subcategories": [
            {
              "name": "skibidi sub1"
            },
            {
              "name": "skibidi sub2"
            }
          ]
        }'

```

- Sample response:

```json
{
  "id": 1,
  "name": "skibidi category3"
}
```

4. PUT /categories/{id}

- General:
  - Update an existing Category
- Request body:
- Path argument:
  - id: integer
- Returns:
  - Return the updated Category object
- Sample request:

```json
curl -X PUT http://localhost:8080/categories/1 \
    -H "Content-Type: application/json" \
    -d '{
          "name": "skibidi category5",
          "subcategories": [
            {
              "name": "skibidi sub1"
            },
            {
              "name": "skibidi sub2"
            }
          ]
        }'

```

- Sample response:

```json
{
  "id": 1,
  "name": "skibidi category5"
}
```

Or: we can just update the Category name, without updating its Subcategories List

- Sample request:

```json
curl -X PUT http://localhost:8080/categories/1 \
    -H "Content-Type: application/json" \
    -d '{
          "name": "skibidi category7"
        }'

```

- Sample response:

```json
{
  "id": 1,
  "name": "skibidi category7"
}
```

5. DELETE /categories/{id}

- General:
  - Delete an existing Category
- Request body:
- Returns:
  - Return the id of the deleted Category
- Sample request:

```json
curl -X DELETE http://localhost:8080/categories/12

```

- Sample response:

```json
{
  "deletedId": 12
}
```

#### Subcategory

1. GET /subcategories

- General:
  - Get all Subcategories
- Returns:
  - Return a List of all Subcategories
- Sample request:

```json
curl GET http://localhost:8080/subcategories

```

- Sample response:

```json
[
  {
    "id": 10,
    "name": "Spiritual Sites",
    "categoryId": 12
  },
  {
    "id": 42,
    "name": "City Tour",
    "categoryId": 15
  }
]
```

2. GET /subcategories/{id}

- General:
  - Get Subcategory by id
- Path argument:
  - id: integer
- Returns:
  - Return a Subcategory object with this id
- Sample request:

```json
curl GET http://localhost:8080/subcategories/10

```

- Sample response:

```json
{
  "id": 10,
  "name": "Spiritual Sites",
  "categoryId": 12
}
```

3. GET /categories/{categoryName}/subcategories

- General:
  - Get all Subcategories of a Category with this categoryName
- Path argument:
  - categoryName: String
- Returns:
  - Return a List of Subcategories that belong to this Category with this categoryName
- Sample request:

```json
curl GET http://localhost:8080/categories/Tour/subcategories

```

- Sample response:

```json
[
  {
    "id": 42,
    "name": "City Tour",
    "categoryId": 15
  }
]
```

4. POST /subcategories

- General:
  - Create a new Subcategory within an existing Category
- Request body:

```json
{
  "name": "skibidi sub3",
  "categoryId": 2
}
```

- Returns:
  - Return the newly created Subcategory object
- Sample request:

```json
curl POST http://localhost:8080/subcategories \
          -H "Content-Type: application/json" \
          -d '{
                "name": "skibidi sub3",
                "categoryId": 2
              }'

```

- Sample response:

```json
{
  "id": 11,
  "name": "skibidi sub3",
  "categoryId": 2
}
```

5. DELETE /subcategories/{id}

- General:
  - Delete an existing Subcategory from a Category
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Subcategory
- Sample request:

```json
curl DELETE http://localhost:8080/subcategories/11

```

- Sample response:

```json
{
  "deletedId": 11
}
```

#### City

1. GET /cities

- General:
  - Get all Cities
- Returns:
  - Return a List of all Cities
- Sample request:

```json
curl GET http://localhost:8080/cities

```

- Sample response:

```json
[
  {
    "id": 5,
    "name": "Ho Chi Minh city",
    "imageUrl": "https://vietnamnomad.com/wp-content/uploads/2021/02/Downtown-Ho-Chi-Minh-City-Video.jpg",
    "description": "Ho Chi Minh City, the pièce de résistance of Vietnam, is a bustling metropolis in no short supply of charm and allure.",
    "cuisines": [
      {
        "id": 26,
        "name": "Pho",
        "description": "Aromatic broth simmered for hours, tender beef slices, and fresh herbs combine to create Vietnam's quintessential noodle soup.",
        "imageUrl": "https://asianwaytravel.com/wp-content/uploads/2022/07/ph%E1%BB%9F-b%C3%B2.jpg"
      },
      {
        "id": 28,
        "name": "Com Tam",
        "description": "Fragrant broken rice served with succulent grilled pork, a perfectly fried egg, and accompanied by a medley of pickled vegetables and fish sauce.",
        "imageUrl": "https://tse1.mm.bing.net/th?id=OIP.srovx59ow2asbG4fNCcb1QHaE7&pid=Api&P=0&h=220"
      },
      {
        "id": 27,
        "name": "Banh Mi",
        "description": "Crispy baguette filled with savory pork, pâté, fresh vegetables, and zesty pickles, creating a harmonious symphony of flavors.",
        "imageUrl": "https://tse3.mm.bing.net/th?id=OIP.j_0FHAuCbmn9sxjfZZ0ZOgHaE7&pid=Api&P=0&h=220"
      }
    ],
    "travelAdvice": null
  },
  {
    "id": 9,
    "name": "Quy Nhon city",
    "imageUrl": "https://vietnamtour.com/images/photos/asia/quy-nhon-city-tour-3.jpg?t=1593696405",
    "description": "Quy Nhon City, nestled along Vietnam's exquisite coastline, unveils itself as a sanctuary of tranquility and cultural splendor.",
    "cuisines": [
      {
        "id": 52,
        "name": "Banh It La Gai",
        "description": "Delicate glutinous rice cakes enveloped in a rich, sweet mung bean filling, wrapped in fragrant banana leaves.",
        "imageUrl": "https://tourdanangcity.vn/wp-content/uploads/2023/05/banh-it-la-gai-quy-nhon-binh-dinh-02.jpg"
      },
      {
        "id": 53,
        "name": "Seafood",
        "description": "An array of fresh seafood, from succulent grilled prawns to tender squid, each dish bursting with the flavors of the sea.",
        "imageUrl": "https://tse1.explicit.bing.net/th?id=OIP.ESel2W-6B_iFAcf4h_tPMwHaE8&pid=Api&P=0&h=220"
      },
      {
        "id": 51,
        "name": "Banh Xeo Tom Nhay",
        "description": "Golden, crispy pancakes filled with succulent shrimp and bean sprouts, served with fresh greens and a tangy dipping sauce.",
        "imageUrl": "https://tiemchachica.com/wp-content/uploads/2023/03/banh-xeo-binh-dinh-1.jpg"
      }
    ],
    "travelAdvice": {
      "id": 2,
      "visa": "Most visitors will need a visa to enter Vietnam. Citizens of certain countries in Southeast Asia, such as Thailand and Malaysia, are exempt from visa requirements.",
      "bestTimeToVisit": "The best time to visit Quy Nhon is from January to March and from September to December. During these months, the weather is pleasant with less rainfall",
      "tipping": "Tipping is not customary in Vietnam, but it is appreciated.",
      "gettingTheres": [
        {
          "id": 5,
          "mode": "flying",
          "advice": "Phu Cat Airport (UIH) is the primary airport serving Quy Nhon. It is located about 30 kilometers from the city center."
        },
        {
          "id": 6,
          "mode": "train",
          "advice": "Quy Nhon has a railway station that connects to major cities in Vietnam such as Hanoi, Da Nang, and Ho Chi Minh City."
        },
        {
          "id": 7,
          "mode": "bus",
          "advice": "Various bus services operate to and from Quy Nhon, including Phuong Trang and Mai Linh, connecting it to major cities in Vietnam."
        },
        {
          "id": 8,
          "mode": "driving",
          "advice": "Quy Nhon is accessible via National Highway 1A, which runs the length of Vietnam. Be prepared for tolls and variable road conditions."
        }
      ],
      "gettingArounds": [
        {
          "id": 5,
          "mode": "Walking",
          "advice": "Quy Nhon is a compact city, making it easy to explore on foot. Many of the city's attractions, restaurants, and beaches are within walking distance of each other."
        },
        {
          "id": 6,
          "mode": "BicycleRental",
          "advice": "Renting a bicycle is a popular and eco-friendly way to get around Quy Nhon. Many hotels and rental shops offer bicycles for a reasonable price."
        },
        {
          "id": 7,
          "mode": "MotorcycleTaxi",
          "advice": "Motorcycle taxis, known locally as 'xe ôm', are a convenient way to travel short distances. Negotiate the fare before starting your trip."
        },
        {
          "id": 8,
          "mode": "CarRental",
          "advice": "For those looking to explore the surrounding areas, renting a car is a viable option."
        }
      ],
      "onTheGrounds": [
        {
          "id": 7,
          "question": "What is the timezone?",
          "answer": "Indochina Time (ICT)."
        },
        {
          "id": 8,
          "question": "What are the voltage/plug types?",
          "answer": "220V at 50Hz. Plugs are type A (two flat vertical pins), type C, and type F (two round pins)."
        },
        {
          "id": 9,
          "question": "What is the currency?",
          "answer": "Vietnamese Dong (VND)."
        },
        {
          "id": 10,
          "question": "Are ATMs readily accessible?",
          "answer": "Yes."
        },
        {
          "id": 11,
          "question": "Are credit cards widely accepted?",
          "answer": "Credit cards are accepted at major hotels, restaurants, and shops, but it's always good to have cash on hand for smaller establishments."
        },
        {
          "id": 12,
          "question": "Is it easy to find a bank?",
          "answer": "Yes, banks are easily accessible in the city center."
        }
      ],
      "customs": [
        {
          "id": 3,
          "name": "Friendliness",
          "advice": "Quy Nhon locals are known for their warmth and hospitality."
        },
        {
          "id": 4,
          "name": "Dress well",
          "advice": "While Quy Nhon is a beach destination, it is important to dress modestly when away from the beach."
        }
      ]
    }
  },
  {
    "id": 15,
    "name": "Da Nang city",
    "imageUrl": "https://vietnamtour.com/images/photos/asia/quy-nhon-city-tour-3.jpg?t=1593696405",
    "description": "Quy Nhon City, nestled along Vietnam's exquisite coastline, unveils itself as a sanctuary of tranquility and cultural splendor.",
    "cuisines": [
      {
        "id": 71,
        "name": "Mi xao",
        "description": "An array of fresh seafood, from succulent grilled prawns to tender squid, each dish bursting with the flavors of the sea.",
        "imageUrl": "https://tse1.explicit.bing.net/th?id=OIP.ESel2W-6B_iFAcf4h_tPMwHaE8&pid=Api&P=0&h=220"
      },
      {
        "id": 69,
        "name": "Banh Su kem",
        "description": "Delicate glutinous rice cakes enveloped in a rich, sweet mung bean filling, wrapped in fragrant banana leaves.",
        "imageUrl": "https://tourdanangcity.vn/wp-content/uploads/2023/05/banh-it-la-gai-quy-nhon-binh-dinh-02.jpg"
      },
      {
        "id": 70,
        "name": "Pateso",
        "description": "Golden, crispy pancakes filled with succulent shrimp and bean sprouts, served with fresh greens and a tangy dipping sauce.",
        "imageUrl": "https://tiemchachica.com/wp-content/uploads/2023/03/banh-xeo-binh-dinh-1.jpg"
      }
    ],
    "travelAdvice": {
      "id": 8,
      "visa": "Most visitors will need a visa to enter Vietnam. Citizens of certain countries in Southeast Asia, such as Thailand and Malaysia, are exempt from visa requirements.",
      "bestTimeToVisit": "The best time to visit Quy Nhon is from January to March and from September to December. During these months, the weather is pleasant with less rainfall",
      "tipping": "Tipping is not customary in Vietnam, but it is appreciated.",
      "gettingTheres": [
        {
          "id": 29,
          "mode": "flying",
          "advice": "Phu Cat Airport (UIH) is the primary airport serving Quy Nhon. It is located about 30 kilometers from the city center."
        },
        {
          "id": 30,
          "mode": "train",
          "advice": "Quy Nhon has a railway station that connects to major cities in Vietnam such as Hanoi, Da Nang, and Ho Chi Minh City."
        },
        {
          "id": 31,
          "mode": "bus",
          "advice": "Various bus services operate to and from Quy Nhon, including Phuong Trang and Mai Linh, connecting it to major cities in Vietnam."
        },
        {
          "id": 32,
          "mode": "driving",
          "advice": "Quy Nhon is accessible via National Highway 1A, which runs the length of Vietnam. Be prepared for tolls and variable road conditions."
        }
      ],
      "gettingArounds": [
        {
          "id": 29,
          "mode": "Walking",
          "advice": "Quy Nhon is a compact city, making it easy to explore on foot. Many of the city's attractions, restaurants, and beaches are within walking distance of each other."
        },
        {
          "id": 30,
          "mode": "BicycleRental",
          "advice": "Renting a bicycle is a popular and eco-friendly way to get around Quy Nhon. Many hotels and rental shops offer bicycles for a reasonable price."
        },
        {
          "id": 31,
          "mode": "MotorcycleTaxi",
          "advice": "Motorcycle taxis, known locally as 'xe ôm', are a convenient way to travel short distances. Negotiate the fare before starting your trip."
        },
        {
          "id": 32,
          "mode": "CarRental",
          "advice": "For those looking to explore the surrounding areas, renting a car is a viable option."
        }
      ],
      "onTheGrounds": [
        {
          "id": 43,
          "question": "What is the timezone?",
          "answer": "Indochina Time (ICT)."
        },
        {
          "id": 44,
          "question": "What are the voltage/plug types?",
          "answer": "220V at 50Hz. Plugs are type A (two flat vertical pins), type C, and type F (two round pins)."
        },
        {
          "id": 45,
          "question": "What is the currency?",
          "answer": "Vietnamese Dong (VND)."
        },
        {
          "id": 46,
          "question": "Are ATMs readily accessible?",
          "answer": "Yes."
        },
        {
          "id": 47,
          "question": "Are credit cards widely accepted?",
          "answer": "Credit cards are accepted at major hotels, restaurants, and shops, but it's always good to have cash on hand for smaller establishments."
        },
        {
          "id": 48,
          "question": "Is it easy to find a bank?",
          "answer": "Yes, banks are easily accessible in the city center."
        }
      ],
      "customs": [
        {
          "id": 15,
          "name": "Friendliness",
          "advice": "Quy Nhon locals are known for their warmth and hospitality."
        },
        {
          "id": 16,
          "name": "Dress well",
          "advice": "While Quy Nhon is a beach destination, it is important to dress modestly when away from the beach."
        }
      ]
    }
  }
]
```

2. GET /cities/{id}

- General:
  - Get all Cities
- Returns:
  - Return the City with this id
- Sample request:

```json
curl GET http://localhost:8080/cities/9

```

- Sample response:

```json
{
  "id": 9,
  "name": "Quy Nhon city",
  "imageUrl": "https://vietnamtour.com/images/photos/asia/quy-nhon-city-tour-3.jpg?t=1593696405",
  "description": "Quy Nhon City, nestled along Vietnam's exquisite coastline, unveils itself as a sanctuary of tranquility and cultural splendor.",
  "cuisines": [
    {
      "id": 51,
      "name": "Banh Xeo Tom Nhay",
      "description": "Golden, crispy pancakes filled with succulent shrimp and bean sprouts, served with fresh greens and a tangy dipping sauce.",
      "imageUrl": "https://tiemchachica.com/wp-content/uploads/2023/03/banh-xeo-binh-dinh-1.jpg"
    },
    {
      "id": 53,
      "name": "Seafood",
      "description": "An array of fresh seafood, from succulent grilled prawns to tender squid, each dish bursting with the flavors of the sea.",
      "imageUrl": "https://tse1.explicit.bing.net/th?id=OIP.ESel2W-6B_iFAcf4h_tPMwHaE8&pid=Api&P=0&h=220"
    },
    {
      "id": 52,
      "name": "Banh It La Gai",
      "description": "Delicate glutinous rice cakes enveloped in a rich, sweet mung bean filling, wrapped in fragrant banana leaves.",
      "imageUrl": "https://tourdanangcity.vn/wp-content/uploads/2023/05/banh-it-la-gai-quy-nhon-binh-dinh-02.jpg"
    }
  ],
  "travelAdvice": {
    "id": 2,
    "visa": "Most visitors will need a visa to enter Vietnam. Citizens of certain countries in Southeast Asia, such as Thailand and Malaysia, are exempt from visa requirements.",
    "bestTimeToVisit": "The best time to visit Quy Nhon is from January to March and from September to December. During these months, the weather is pleasant with less rainfall",
    "tipping": "Tipping is not customary in Vietnam, but it is appreciated.",
    "gettingTheres": [
      {
        "id": 5,
        "mode": "flying",
        "advice": "Phu Cat Airport (UIH) is the primary airport serving Quy Nhon. It is located about 30 kilometers from the city center."
      },
      {
        "id": 6,
        "mode": "train",
        "advice": "Quy Nhon has a railway station that connects to major cities in Vietnam such as Hanoi, Da Nang, and Ho Chi Minh City."
      },
      {
        "id": 7,
        "mode": "bus",
        "advice": "Various bus services operate to and from Quy Nhon, including Phuong Trang and Mai Linh, connecting it to major cities in Vietnam."
      },
      {
        "id": 8,
        "mode": "driving",
        "advice": "Quy Nhon is accessible via National Highway 1A, which runs the length of Vietnam. Be prepared for tolls and variable road conditions."
      }
    ],
    "gettingArounds": [
      {
        "id": 5,
        "mode": "Walking",
        "advice": "Quy Nhon is a compact city, making it easy to explore on foot. Many of the city's attractions, restaurants, and beaches are within walking distance of each other."
      },
      {
        "id": 6,
        "mode": "BicycleRental",
        "advice": "Renting a bicycle is a popular and eco-friendly way to get around Quy Nhon. Many hotels and rental shops offer bicycles for a reasonable price."
      },
      {
        "id": 7,
        "mode": "MotorcycleTaxi",
        "advice": "Motorcycle taxis, known locally as 'xe ôm', are a convenient way to travel short distances. Negotiate the fare before starting your trip."
      },
      {
        "id": 8,
        "mode": "CarRental",
        "advice": "For those looking to explore the surrounding areas, renting a car is a viable option."
      }
    ],
    "onTheGrounds": [
      {
        "id": 7,
        "question": "What is the timezone?",
        "answer": "Indochina Time (ICT)."
      },
      {
        "id": 8,
        "question": "What are the voltage/plug types?",
        "answer": "220V at 50Hz. Plugs are type A (two flat vertical pins), type C, and type F (two round pins)."
      },
      {
        "id": 9,
        "question": "What is the currency?",
        "answer": "Vietnamese Dong (VND)."
      },
      {
        "id": 10,
        "question": "Are ATMs readily accessible?",
        "answer": "Yes."
      },
      {
        "id": 11,
        "question": "Are credit cards widely accepted?",
        "answer": "Credit cards are accepted at major hotels, restaurants, and shops, but it's always good to have cash on hand for smaller establishments."
      },
      {
        "id": 12,
        "question": "Is it easy to find a bank?",
        "answer": "Yes, banks are easily accessible in the city center."
      }
    ],
    "customs": [
      {
        "id": 3,
        "name": "Friendliness",
        "advice": "Quy Nhon locals are known for their warmth and hospitality."
      },
      {
        "id": 4,
        "name": "Dress well",
        "advice": "While Quy Nhon is a beach destination, it is important to dress modestly when away from the beach."
      }
    ]
  }
}
```

3. GET /cities/search?name={}

- General:
  - Get City with this name (ignore case)
- Returns:
  - Return the City with this name (ignore case)
- Sample request:

```json
curl GET http://localhost:8080/cities/search?name=Quy Nhon city

```

- Sample response:

```json
{
  "id": 9,
  "name": "Quy Nhon city",
  "imageUrl": "https://vietnamtour.com/images/photos/asia/quy-nhon-city-tour-3.jpg?t=1593696405",
  "description": "Quy Nhon City, nestled along Vietnam's exquisite coastline, unveils itself as a sanctuary of tranquility and cultural splendor.",
  "cuisines": [
    {
      "id": 53,
      "name": "Seafood",
      "description": "An array of fresh seafood, from succulent grilled prawns to tender squid, each dish bursting with the flavors of the sea.",
      "imageUrl": "https://tse1.explicit.bing.net/th?id=OIP.ESel2W-6B_iFAcf4h_tPMwHaE8&pid=Api&P=0&h=220"
    },
    {
      "id": 52,
      "name": "Banh It La Gai",
      "description": "Delicate glutinous rice cakes enveloped in a rich, sweet mung bean filling, wrapped in fragrant banana leaves.",
      "imageUrl": "https://tourdanangcity.vn/wp-content/uploads/2023/05/banh-it-la-gai-quy-nhon-binh-dinh-02.jpg"
    },
    {
      "id": 51,
      "name": "Banh Xeo Tom Nhay",
      "description": "Golden, crispy pancakes filled with succulent shrimp and bean sprouts, served with fresh greens and a tangy dipping sauce.",
      "imageUrl": "https://tiemchachica.com/wp-content/uploads/2023/03/banh-xeo-binh-dinh-1.jpg"
    }
  ],
  "travelAdvice": {
    "id": 2,
    "visa": "Most visitors will need a visa to enter Vietnam. Citizens of certain countries in Southeast Asia, such as Thailand and Malaysia, are exempt from visa requirements.",
    "bestTimeToVisit": "The best time to visit Quy Nhon is from January to March and from September to December. During these months, the weather is pleasant with less rainfall",
    "tipping": "Tipping is not customary in Vietnam, but it is appreciated.",
    "gettingTheres": [
      {
        "id": 5,
        "mode": "flying",
        "advice": "Phu Cat Airport (UIH) is the primary airport serving Quy Nhon. It is located about 30 kilometers from the city center."
      },
      {
        "id": 6,
        "mode": "train",
        "advice": "Quy Nhon has a railway station that connects to major cities in Vietnam such as Hanoi, Da Nang, and Ho Chi Minh City."
      },
      {
        "id": 7,
        "mode": "bus",
        "advice": "Various bus services operate to and from Quy Nhon, including Phuong Trang and Mai Linh, connecting it to major cities in Vietnam."
      },
      {
        "id": 8,
        "mode": "driving",
        "advice": "Quy Nhon is accessible via National Highway 1A, which runs the length of Vietnam. Be prepared for tolls and variable road conditions."
      }
    ],
    "gettingArounds": [
      {
        "id": 5,
        "mode": "Walking",
        "advice": "Quy Nhon is a compact city, making it easy to explore on foot. Many of the city's attractions, restaurants, and beaches are within walking distance of each other."
      },
      {
        "id": 6,
        "mode": "BicycleRental",
        "advice": "Renting a bicycle is a popular and eco-friendly way to get around Quy Nhon. Many hotels and rental shops offer bicycles for a reasonable price."
      },
      {
        "id": 7,
        "mode": "MotorcycleTaxi",
        "advice": "Motorcycle taxis, known locally as 'xe ôm', are a convenient way to travel short distances. Negotiate the fare before starting your trip."
      },
      {
        "id": 8,
        "mode": "CarRental",
        "advice": "For those looking to explore the surrounding areas, renting a car is a viable option."
      }
    ],
    "onTheGrounds": [
      {
        "id": 7,
        "question": "What is the timezone?",
        "answer": "Indochina Time (ICT)."
      },
      {
        "id": 8,
        "question": "What are the voltage/plug types?",
        "answer": "220V at 50Hz. Plugs are type A (two flat vertical pins), type C, and type F (two round pins)."
      },
      {
        "id": 9,
        "question": "What is the currency?",
        "answer": "Vietnamese Dong (VND)."
      },
      {
        "id": 10,
        "question": "Are ATMs readily accessible?",
        "answer": "Yes."
      },
      {
        "id": 11,
        "question": "Are credit cards widely accepted?",
        "answer": "Credit cards are accepted at major hotels, restaurants, and shops, but it's always good to have cash on hand for smaller establishments."
      },
      {
        "id": 12,
        "question": "Is it easy to find a bank?",
        "answer": "Yes, banks are easily accessible in the city center."
      }
    ],
    "customs": [
      {
        "id": 3,
        "name": "Friendliness",
        "advice": "Quy Nhon locals are known for their warmth and hospitality."
      },
      {
        "id": 4,
        "name": "Dress well",
        "advice": "While Quy Nhon is a beach destination, it is important to dress modestly when away from the beach."
      }
    ]
  }
}
```

4. POST /cities

- General:
  - Create a new City
- Request body:
- Returns:
  - Return the newly created City object
- Sample request:

```json
curl POST http://localhost:8080/cities \
        -H "Content-Type: application/json" \
        -d '{
  "name": "Quy Nhon city",
  "imageUrl": "https://vietnamtour.com/images/photos/asia/quy-nhon-city-tour-3.jpg?t=1593696405",
  "description": "Quy Nhon City, nestled along Vietnam's exquisite coastline, unveils itself as a sanctuary of tranquility and cultural splendor.",
  "cuisines": [
    {
      "name": "Banh Xeo Tom Nhay",
      "imageUrl": "https://tiemchachica.com/wp-content/uploads/2023/03/banh-xeo-binh-dinh-1.jpg",
      "description": "Golden, crispy pancakes filled with succulent shrimp and bean sprouts, served with fresh greens and a tangy dipping sauce."
    },
    {
      "name": "Banh It La Gai",
      "imageUrl": "https://tourdanangcity.vn/wp-content/uploads/2023/05/banh-it-la-gai-quy-nhon-binh-dinh-02.jpg",
      "description": "Delicate glutinous rice cakes enveloped in a rich, sweet mung bean filling, wrapped in fragrant banana leaves."
    },
    {
      "name": "Seafood",
      "imageUrl": "https://tse1.explicit.bing.net/th?id=OIP.ESel2W-6B_iFAcf4h_tPMwHaE8&pid=Api&P=0&h=220",
      "description": "An array of fresh seafood, from succulent grilled prawns to tender squid, each dish bursting with the flavors of the sea."
    }
  ],
  "travelAdvice": {
    "gettingTheres": [
      {
        "mode": "flying",
        "advice": "Phu Cat Airport (UIH) is the primary airport serving Quy Nhon. It is located about 30 kilometers from the city center."
      },
      {
        "mode": "train",
        "advice": "Quy Nhon has a railway station that connects to major cities in Vietnam such as Hanoi, Da Nang, and Ho Chi Minh City."
      },
      {
        "mode": "bus",
        "advice": "Various bus services operate to and from Quy Nhon, including Phuong Trang and Mai Linh, connecting it to major cities in Vietnam."
      },
      {
        "mode": "driving",
        "advice": "Quy Nhon is accessible via National Highway 1A, which runs the length of Vietnam. Be prepared for tolls and variable road conditions."
      }
    ],
    "visa": "Most visitors will need a visa to enter Vietnam. Citizens of certain countries in Southeast Asia, such as Thailand and Malaysia, are exempt from visa requirements.",
    "bestTimeToVisit": "The best time to visit Quy Nhon is from January to March and from September to December. During these months, the weather is pleasant with less rainfall",
    "gettingArounds": [
      {
        "mode": "Walking",
        "advice": "Quy Nhon is a compact city, making it easy to explore on foot. Many of the city's attractions, restaurants, and beaches are within walking distance of each other."
      },
      {
        "mode": "BicycleRental",
        "advice": "Renting a bicycle is a popular and eco-friendly way to get around Quy Nhon. Many hotels and rental shops offer bicycles for a reasonable price."
      },
      {
        "mode": "MotorcycleTaxi",
        "advice": "Motorcycle taxis, known locally as 'xe ôm', are a convenient way to travel short distances. Negotiate the fare before starting your trip."
      },
      {
        "mode": "CarRental",
        "advice": "For those looking to explore the surrounding areas, renting a car is a viable option."
      }
    ],
    "onTheGrounds": [
      {
        "question": "What is the timezone?",
        "answer": "Indochina Time (ICT)."
      },
      {
        "question": "What are the voltage/plug types?",
        "answer": "220V at 50Hz. Plugs are type A (two flat vertical pins), type C, and type F (two round pins)."
      },
      {
        "question": "What is the currency?",
        "answer": "Vietnamese Dong (VND)."
      },
      {
        "question": "Are ATMs readily accessible?",
        "answer": "Yes."
      },
      {
        "question": "Are credit cards widely accepted?",
        "answer": "Credit cards are accepted at major hotels, restaurants, and shops, but it's always good to have cash on hand for smaller establishments."
      },
      {
        "question": "Is it easy to find a bank?",
        "answer": "Yes, banks are easily accessible in the city center."
      }
    ],
    "tipping": "Tipping is not customary in Vietnam, but it is appreciated.",
    "customs": [
      {
        "name": "Friendliness",
        "advice": "Quy Nhon locals are known for their warmth and hospitality."
      },
      {
        "name": "Dress well",
        "advice": "While Quy Nhon is a beach destination, it is important to dress modestly when away from the beach."
      }
    ]
  }
}
'

```

- Sample response:

```json
{
  "id": 1,
  "name": "Quy Nhon city",
  "imageUrl": "https://vietnamtour.com/images/photos/asia/quy-nhon-city-tour-3.jpg?t=1593696405",
  "description": "Quy Nhon City, nestled along Vietnam's exquisite coastline, unveils itself as a sanctuary of tranquility and cultural splendor.",
  "cuisines": [
    {
      "id": 1,
      "name": "Seafood",
      "description": "An array of fresh seafood, from succulent grilled prawns to tender squid, each dish bursting with the flavors of the sea.",
      "imageUrl": "https://tse1.explicit.bing.net/th?id=OIP.ESel2W-6B_iFAcf4h_tPMwHaE8&pid=Api&P=0&h=220"
    },
    {
      "id": 2,
      "name": "Banh It La Gai",
      "description": "Delicate glutinous rice cakes enveloped in a rich, sweet mung bean filling, wrapped in fragrant banana leaves.",
      "imageUrl": "https://tourdanangcity.vn/wp-content/uploads/2023/05/banh-it-la-gai-quy-nhon-binh-dinh-02.jpg"
    },
    {
      "id": 3,
      "name": "Banh Xeo Tom Nhay",
      "description": "Golden, crispy pancakes filled with succulent shrimp and bean sprouts, served with fresh greens and a tangy dipping sauce.",
      "imageUrl": "https://tiemchachica.com/wp-content/uploads/2023/03/banh-xeo-binh-dinh-1.jpg"
    }
  ],
  "travelAdvice": {
    "id": 1,
    "visa": "Most visitors will need a visa to enter Vietnam. Citizens of certain countries in Southeast Asia, such as Thailand and Malaysia, are exempt from visa requirements.",
    "bestTimeToVisit": "The best time to visit Quy Nhon is from January to March and from September to December. During these months, the weather is pleasant with less rainfall",
    "tipping": "Tipping is not customary in Vietnam, but it is appreciated.",
    "gettingTheres": [
      {
        "id": 1,
        "mode": "flying",
        "advice": "Phu Cat Airport (UIH) is the primary airport serving Quy Nhon. It is located about 30 kilometers from the city center."
      },
      {
        "id": 2,
        "mode": "train",
        "advice": "Quy Nhon has a railway station that connects to major cities in Vietnam such as Hanoi, Da Nang, and Ho Chi Minh City."
      },
      {
        "id": 3,
        "mode": "bus",
        "advice": "Various bus services operate to and from Quy Nhon, including Phuong Trang and Mai Linh, connecting it to major cities in Vietnam."
      },
      {
        "id": 4,
        "mode": "driving",
        "advice": "Quy Nhon is accessible via National Highway 1A, which runs the length of Vietnam. Be prepared for tolls and variable road conditions."
      }
    ],
    "gettingArounds": [
      {
        "id": 1,
        "mode": "Walking",
        "advice": "Quy Nhon is a compact city, making it easy to explore on foot. Many of the city's attractions, restaurants, and beaches are within walking distance of each other."
      },
      {
        "id": 2,
        "mode": "BicycleRental",
        "advice": "Renting a bicycle is a popular and eco-friendly way to get around Quy Nhon. Many hotels and rental shops offer bicycles for a reasonable price."
      },
      {
        "id": 3,
        "mode": "MotorcycleTaxi",
        "advice": "Motorcycle taxis, known locally as 'xe ôm', are a convenient way to travel short distances. Negotiate the fare before starting your trip."
      },
      {
        "id": 4,
        "mode": "CarRental",
        "advice": "For those looking to explore the surrounding areas, renting a car is a viable option."
      }
    ],
    "onTheGrounds": [
      {
        "id": 1,
        "question": "What is the timezone?",
        "answer": "Indochina Time (ICT)."
      },
      {
        "id": 2,
        "question": "What are the voltage/plug types?",
        "answer": "220V at 50Hz. Plugs are type A (two flat vertical pins), type C, and type F (two round pins)."
      },
      {
        "id": 3,
        "question": "What is the currency?",
        "answer": "Vietnamese Dong (VND)."
      },
      {
        "id": 4,
        "question": "Are ATMs readily accessible?",
        "answer": "Yes."
      },
      {
        "id": 5,
        "question": "Are credit cards widely accepted?",
        "answer": "Credit cards are accepted at major hotels, restaurants, and shops, but it's always good to have cash on hand for smaller establishments."
      },
      {
        "id": 6,
        "question": "Is it easy to find a bank?",
        "answer": "Yes, banks are easily accessible in the city center."
      }
    ],
    "customs": [
      {
        "id": 1,
        "name": "Friendliness",
        "advice": "Quy Nhon locals are known for their warmth and hospitality."
      },
      {
        "id": 2,
        "name": "Dress well",
        "advice": "While Quy Nhon is a beach destination, it is important to dress modestly when away from the beach."
      }
    ]
  }
}
```

5. DELETE /cities/{id}

- General:
  - Delete a City by id
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted City
- Sample request:

```json
curl DELETE http://localhost:8080/cities/5

```

- Sample response:

```json
{
  "deletedId": 5
}
```

#### Restaurant

1. GET /restaurants

- General:
  - Get all Restaurants
- Returns:
  - Return a List of all Restaurants
- Sample request:

```json
curl GET http://localhost:8080/restaurants

```

- Sample response:

```json
[
    {
        "id": 1,
        "cityId": 1,
        "cityName": "Quy Nhon city",
        "name": "K4 Restaurant",
        "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
        "websiteUrl": "http://truffle.com.vn/",
        "phoneNumber": "+84 98 878 33 53",
        "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
        "lowestPrice": 109.00,
        "highestPrice": 390.00,
        "numberOfReviews": 18,
        "rating": 4.5,
        "addressObj": {
            "id": 1,
            "address": "28 Nguyen Huu Canh",
            "ward": "22",
            "district": "Binh Thanh",
            "city": "Ho Chi Minh",
            "country": "Vietnam",
            "postalCode": "70000"
        },
        "cuisines": [
            {
                "id": 6,
                "name": "Fusion"
            },
            {
                "id": 5,
                "name": "European"
            },
            {
                "id": 1,
                "name": "Seafood"
            },
            {
                "id": 4,
                "name": "French"
            }
        ]
    }
]
```

2. GET /restaurants/{id}

- General:
  - Get Restaurant with this id
- Path argument:
  - id: integer
- Returns:
  - Return the Restaurant with this id
- Sample request:

```json
curl GET http://localhost:8080/restaurants/14

```

- Sample response:

```json
{
  "id": 14,
  "cityId": 5,
  "cityName": "Ho Chi Minh city",
  "name": "K7 Restaurant",
  "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
  "websiteUrl": "http://truffle.com.vn/",
  "phoneNumber": "+84 98 878 33 53",
  "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
  "lowestPrice": 109.0,
  "highestPrice": 390.0,
  "numberOfReviews": 18,
  "rating": 4.5,
  "addressObj": {
    "id": 15,
    "address": "28 Nguyen Huu Canh",
    "ward": "22",
    "district": "Binh Thanh",
    "city": "Ho Chi Minh",
    "country": "Vietnam",
    "postalCode": "70000"
  },
  "cuisines": [
    {
      "id": 36,
      "name": "French Fries"
    },
    {
      "id": 37,
      "name": "Fry Chicken"
    },
    {
      "id": 38,
      "name": "Asian"
    }
  ]
}
```

3. GET /cities/{cityName}/restaurants

- General:
  - Get all Restaurants within this City with this cityName
- Path argument:
  - cityName: String
- Returns:
  - Return the List of all Restaurant within this City with this cityName
- Sample request:

```json
curl GET http://localhost:8080/cities/Ho Chi Minh city/restaurants

```

- Sample response:

```json
[
  {
    "id": 14,
    "cityId": 5,
    "cityName": "Ho Chi Minh city",
    "name": "K7 Restaurant",
    "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
    "websiteUrl": "http://truffle.com.vn/",
    "phoneNumber": "+84 98 878 33 53",
    "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
    "lowestPrice": 109.0,
    "highestPrice": 390.0,
    "numberOfReviews": 18,
    "rating": 4.5,
    "addressObj": {
      "id": 15,
      "address": "28 Nguyen Huu Canh",
      "ward": "22",
      "district": "Binh Thanh",
      "city": "Ho Chi Minh",
      "country": "Vietnam",
      "postalCode": "70000"
    },
    "cuisines": [
      {
        "id": 36,
        "name": "French Fries"
      },
      {
        "id": 37,
        "name": "Fry Chicken"
      },
      {
        "id": 38,
        "name": "Asian"
      }
    ]
  },
  {
    "id": 17,
    "cityId": 5,
    "cityName": "Ho Chi Minh city",
    "name": "K9 Restaurant",
    "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
    "websiteUrl": "http://truffle.com.vn/",
    "phoneNumber": "+84 98 878 33 53",
    "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
    "lowestPrice": 109.0,
    "highestPrice": 390.0,
    "numberOfReviews": 18,
    "rating": 4.5,
    "addressObj": {
      "id": 18,
      "address": "28 Nguyen Huu Canh",
      "ward": "22",
      "district": "Binh Thanh",
      "city": "Ho Chi Minh",
      "country": "Vietnam",
      "postalCode": "70000"
    },
    "cuisines": []
  },
  {
    "id": 19,
    "cityId": 5,
    "cityName": "Ho Chi Minh city",
    "name": "K11 Restaurant",
    "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
    "websiteUrl": "http://truffle.com.vn/",
    "phoneNumber": "+84 98 878 33 53",
    "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
    "lowestPrice": 109.0,
    "highestPrice": 390.0,
    "numberOfReviews": 18,
    "rating": 4.5,
    "addressObj": {
      "id": 20,
      "address": "28 Nguyen Huu Canh",
      "ward": "22",
      "district": "Binh Thanh",
      "city": "Ho Chi Minh",
      "country": "Vietnam",
      "postalCode": "70000"
    },
    "cuisines": []
  },
  {
    "id": 21,
    "cityId": 5,
    "cityName": "Ho Chi Minh city",
    "name": "K13 Restaurant",
    "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
    "websiteUrl": "http://truffle.com.vn/",
    "phoneNumber": "+84 98 878 33 53",
    "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
    "lowestPrice": 109.0,
    "highestPrice": 390.0,
    "numberOfReviews": 18,
    "rating": 4.5,
    "addressObj": {
      "id": 22,
      "address": "28 Nguyen Huu Canh",
      "ward": "22",
      "district": "Binh Thanh",
      "city": "Ho Chi Minh",
      "country": "Vietnam",
      "postalCode": "70000"
    },
    "cuisines": [
      {
        "id": 41,
        "name": "Pizza"
      }
    ]
  },
  {
    "id": 22,
    "cityId": 5,
    "cityName": "Ho Chi Minh city",
    "name": "K15 Restaurant",
    "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
    "websiteUrl": "http://truffle.com.vn/",
    "phoneNumber": "+84 98 878 33 53",
    "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
    "lowestPrice": 109.0,
    "highestPrice": 390.0,
    "numberOfReviews": 18,
    "rating": 4.5,
    "addressObj": {
      "id": 23,
      "address": "28 Nguyen Huu Canh",
      "ward": "22",
      "district": "Binh Thanh",
      "city": "Ho Chi Minh",
      "country": "Vietnam",
      "postalCode": "70000"
    },
    "cuisines": [
      {
        "id": 41,
        "name": "Pizza"
      }
    ]
  },
  {
    "id": 23,
    "cityId": 5,
    "cityName": "Ho Chi Minh city",
    "name": "K41 Restaurant",
    "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
    "websiteUrl": "http://truffle.com.vn/",
    "phoneNumber": "+84 98 878 33 53",
    "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
    "lowestPrice": 109.0,
    "highestPrice": 390.0,
    "numberOfReviews": 18,
    "rating": 4.5,
    "addressObj": {
      "id": 28,
      "address": "29 Nguyen Huu Canh",
      "ward": "22",
      "district": "Binh Thanh",
      "city": "Ho Chi Minh",
      "country": "Vietnam",
      "postalCode": "70000"
    },
    "cuisines": [
      {
        "id": 72,
        "name": "Potatoes"
      }
    ]
  }
]
```

4. GET /restaurants/search?name={}

- General:
  - Get Restaurant with this name
- Request argument:
  - name: String
- Returns:
  - Return the Restaurant with this name
- Sample request:

```json
curl GET http://localhost:8080/restaurants/search?name=K7 Restaurant

```

- Sample response:

```json
{
  "id": 14,
  "cityId": 5,
  "cityName": "Ho Chi Minh city",
  "name": "K7 Restaurant",
  "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
  "websiteUrl": "http://truffle.com.vn/",
  "phoneNumber": "+84 98 878 33 53",
  "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
  "lowestPrice": 109.0,
  "highestPrice": 390.0,
  "numberOfReviews": 18,
  "rating": 4.5,
  "addressObj": {
    "id": 15,
    "address": "28 Nguyen Huu Canh",
    "ward": "22",
    "district": "Binh Thanh",
    "city": "Ho Chi Minh",
    "country": "Vietnam",
    "postalCode": "70000"
  },
  "cuisines": [
    {
      "id": 36,
      "name": "French Fries"
    },
    {
      "id": 37,
      "name": "Fry Chicken"
    },
    {
      "id": 38,
      "name": "Asian"
    }
  ]
}
```

5. POST /restaurants

- General:
  - Create a new Restaurant
- Request body:
- Returns:
  - Return the newly created Restaurant
- Sample request:

```json
curl POST http://localhost:8080/restaurants \
        -H "Content-Type: application/json" \
        -d '{
    "cityId": 1,
    "name": "K4 Restaurant",
    "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
    "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
    "websiteUrl": "http://truffle.com.vn/",
    "phoneNumber": "+84 98 878 33 53",
    "addressObj": {
        "address": "28 Nguyen Huu Canh",
        "ward": "22",
        "district": "Binh Thanh",
        "city": "Ho Chi Minh",
        "country": "Vietnam",
        "postalCode": "70000"
    },
    "cuisines": [
        {
            "name": "French"
        },
        {
            "name": "Seafood"
        },
        {
            "name": "European"
        },
        {
            "name": "Fusion"
        }
    ],
    "lowestPrice": 109.00,
    "highestPrice": 390.00,
    "numberOfReviews": 18,
    "rating": 4.5
}'

```

- Sample response:

```json
{
  "id": 1,
  "cityId": 1,
  "cityName": "Quy Nhon city",
  "name": "K4 Restaurant",
  "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/70/42/dc/table.jpg?w=1100&h=-1&s=1",
  "websiteUrl": "http://truffle.com.vn/",
  "phoneNumber": "+84 98 878 33 53",
  "description": "Truffle Restaurant in Landmark 81 offers an exquisite dining experience overlooking the beautiful skyline of Ho Chi Minh City.",
  "lowestPrice": 109.0,
  "highestPrice": 390.0,
  "numberOfReviews": 18,
  "rating": 4.5,
  "addressObj": {
    "id": 1,
    "address": "28 Nguyen Huu Canh",
    "ward": "22",
    "district": "Binh Thanh",
    "city": "Ho Chi Minh",
    "country": "Vietnam",
    "postalCode": "70000"
  },
  "cuisines": [
    {
      "id": 6,
      "name": "Fusion"
    },
    {
      "id": 5,
      "name": "European"
    },
    {
      "id": 1,
      "name": "Seafood"
    },
    {
      "id": 4,
      "name": "French"
    }
  ]
}
```

6. GET /restaurants/search?name={}

- General:
  - Delete an existing Restaurant with this id
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Restaurant
- Sample request:

```json
curl DELETE http://localhost:8080/restaurants/10

```

- Sample response:

```json
{ "deletedId": 10 }
```

#### Attraction

1. GET /attractions

- General:
  - Get all Attractions
- Returns:
  - Return a List of all Attractions
- Sample request:

```json
curl GET http://localhost:8080/attractions

```

- Sample response:

```json
[
  {
    "id": 1,
    "name": "Bitexco Financial Tower",
    "subcategoryId": 10,
    "subcategoryName": "skibidi sub1",
    "cityId": 1,
    "cityName": "Quy Nhon city",
    "numberOfReviews": 6260,
    "imageUrl": "https://media-cdn.tripadvisor.com/media/photo-f/14/11/d4/2a/bitexco-financial-tower.jpg",
    "websiteUrl": "http://www.bitexcofinancialtower.com/",
    "addressObj": {
      "id": 2,
      "address": "36 Ho Tung Mau",
      "ward": "Ben Nghe",
      "district": "1",
      "city": "Ho Chi Minh",
      "country": "Vietnam",
      "postalCode": "70000"
    },
    "latitude": 10.771853,
    "longitude": 106.704529,
    "rating": 5.0,
    "description": "Bitexco Financial Tower at a height of 262 meters is the tallest building in Ho Chi Minh City up to date."
  }
]
```

2. GET /attractions/{id}

- General:
  - Get an Attraction with this id
- Path argument:
  - id: integer
- Returns:
  - Return the Attraction with this id
- Sample request:

```json
curl GET http://localhost:8080/attractions/1

```

- Sample response:

```json
{
  "id": 1,
  "name": "Bitexco Financial Tower",
  "subcategoryId": 10,
  "subcategoryName": "skibidi sub1",
  "cityId": 1,
  "cityName": "Quy Nhon city",
  "numberOfReviews": 6260,
  "imageUrl": "https://media-cdn.tripadvisor.com/media/photo-f/14/11/d4/2a/bitexco-financial-tower.jpg",
  "websiteUrl": "http://www.bitexcofinancialtower.com/",
  "addressObj": {
    "id": 2,
    "address": "36 Ho Tung Mau",
    "ward": "Ben Nghe",
    "district": "1",
    "city": "Ho Chi Minh",
    "country": "Vietnam",
    "postalCode": "70000"
  },
  "latitude": 10.771853,
  "longitude": 106.704529,
  "rating": 5.0,
  "description": "Bitexco Financial Tower at a height of 262 meters is the tallest building in Ho Chi Minh City up to date."
}
```

3. GET /cities/{cityName}/attractions

- General:
  - Get all Attractions within this City with this cityName
- Path argument:
  - cityName: String
- Returns:
  - Return a List of all Attractions within this City with this cityName
- Sample request:

```json
curl GET http://localhost:8080/cities/Quy Nhon city/attractions

```

- Sample response:

```json
[
  {
    "id": 1,
    "name": "Bitexco Financial Tower",
    "subcategoryId": 10,
    "subcategoryName": "skibidi sub1",
    "cityId": 1,
    "cityName": "Quy Nhon city",
    "numberOfReviews": 6260,
    "imageUrl": "https://media-cdn.tripadvisor.com/media/photo-f/14/11/d4/2a/bitexco-financial-tower.jpg",
    "websiteUrl": "http://www.bitexcofinancialtower.com/",
    "addressObj": {
      "id": 2,
      "address": "36 Ho Tung Mau",
      "ward": "Ben Nghe",
      "district": "1",
      "city": "Ho Chi Minh",
      "country": "Vietnam",
      "postalCode": "70000"
    },
    "latitude": 10.771853,
    "longitude": 106.704529,
    "rating": 5.0,
    "description": "Bitexco Financial Tower at a height of 262 meters is the tallest building in Ho Chi Minh City up to date."
  }
]
```

4. POST /attractions

- General:
  - Create a new Attraction
- Request body:
- Returns:
  - Return the newly created Attraction
- Sample request:

```json
curl POST http://localhost:8080/attractions \
          -H "Content-Type: application/json" \
          -d '{
  "name": "Bitexco Financial Tower",
  "subcategoryId": 10,
  "cityId": 1,
  "numberOfReviews": 6260,
  "imageUrl": "https://media-cdn.tripadvisor.com/media/photo-f/14/11/d4/2a/bitexco-financial-tower.jpg",
  "websiteUrl": "http://www.bitexcofinancialtower.com/",
  "addressObj": {
    "address": "36 Ho Tung Mau",
    "ward": "Ben Nghe",
    "district": "1",
    "city": "Ho Chi Minh",
    "country": "Vietnam",
    "postalCode": "70000"
  },
  "latitude": 10.771853,
  "longitude": 106.704529,
  "rating": 5,
  "description": "Bitexco Financial Tower at a height of 262 meters is the tallest building in Ho Chi Minh City up to date."
}
'

```

- Sample response:

```json
{
  "id": 1,
  "name": "Bitexco Financial Tower",
  "subcategoryId": 10,
  "subcategoryName": "skibidi sub1",
  "cityId": 1,
  "cityName": "Quy Nhon city",
  "numberOfReviews": 6260,
  "imageUrl": "https://media-cdn.tripadvisor.com/media/photo-f/14/11/d4/2a/bitexco-financial-tower.jpg",
  "websiteUrl": "http://www.bitexcofinancialtower.com/",
  "addressObj": {
    "id": 2,
    "address": "36 Ho Tung Mau",
    "ward": "Ben Nghe",
    "district": "1",
    "city": "Ho Chi Minh",
    "country": "Vietnam",
    "postalCode": "70000"
  },
  "latitude": 10.771853,
  "longitude": 106.704529,
  "rating": 5,
  "description": "Bitexco Financial Tower at a height of 262 meters is the tallest building in Ho Chi Minh City up to date."
}
```

5. DELETE /attractions/{id}

- General:
  - Delete an existing Attraction with this id
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Attraction
- Sample request:

```json
curl DELETE http://localhost:8080/attractions/10

```

- Sample response:

```json
{ "deletedId": 10 }
```

#### Tour

1. GET /tours

- General:
  - Get all Tours
- Returns:
  - Return a List of all Tours
- Sample request:

```json
curl GET http://localhost:8080/tours

```

- Sample response:

```json
[
  {
    "id": 1,
    "name": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
    "cityId": 1,
    "cityName": "Quy Nhon city",
    "categoryId": 2,
    "categoryName": "skibidi category3",
    "subcategoryId": 10,
    "subcategoryName": "skibidi sub1",
    "numberOfReviews": 10403,
    "imageObject": {
      "primaryImage": {
        "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg"
      },
      "images": [
        {
          "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/47.jpg"
        },
        {
          "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/41.jpg"
        }
      ]
    },
    "languages": [
      {
        "id": 1,
        "name": "French"
      },
      {
        "id": 3,
        "name": "Chinese"
      },
      {
        "id": 2,
        "name": "English"
      }
    ],
    "minAge": 3,
    "maxAge": 99,
    "maxGroupSize": 25,
    "duration": 6.0,
    "price": 17.9,
    "rating": 4.5,
    "highlights": [
      {
        "id": 1,
        "description": "Guided tour of the Cu Chi Tunnels from Ho Chi Minh City"
      },
      {
        "id": 2,
        "description": "Incredible photo opportunities in the tunnels and with trapdoors"
      },
      {
        "id": 3,
        "description": "Save money on a group tour with entrance included"
      },
      {
        "id": 4,
        "description": "Hassle-free hotel pickup and round-trip transport from Ho Chi Minh City"
      }
    ],
    "days": [
      {
        "id": 1,
        "dayNumber": 1,
        "stops": [
          {
            "id": 1,
            "name": "Cu Chi Tunnels",
            "latitude": 11.061,
            "longitude": 106.526,
            "description": "Around 8:00AM or 12:10PM. Start with pickup from the center of Ho Chi Minh City or meet at the meeting point then depart for Cu Chi Tunnels. After 1.5 hour drive, we arrive at the Tunnels where You'll have the opportunity to explore the tunnel system, which includes narrow passageways, hidden entrances, and underground chambers. Learn about the daily life of the Cu Chi guerrilla fighters and how they managed to survive in the tunnels. You can crawl distances through the tunnels that were used by the guerrilla fighters during the Vietnam War. You may see kitchens, living quarters, among other things used during the war. Learn about how different types traps were created and set up. Visit the weapon rooms and learn how the ingenious soldiers made them. You can also safely try your hand at the shooting range with an AK-47. After exploration, we travel back to Ho Chi Minh City. Arrive approximately at 3:00pm for the morning tour and 6:50pm for the afternoon tour.",
            "isAttraction": false
          }
        ]
      }
    ],
    "description": "Used by the Viet Cong during the Vietnam War, the Cu Chi Tunnels are a network of underground tunnels stretching more than 124 miles (200 kilometers). For travelers on a budget, this group tour of up to 20 people offers great value, including hotel pickup, round-trip transport, and a guided tour of the tunnels. Choose from a morning or afternoon tour to suit your schedule.",
    "tourDetail": {
      "included": [
        "Transfer by Air-conditioned Bus",
        "English-speaking Tour Guide",
        "Entrance ticket",
        "Tapioca, hot tea, bottled water",
        "Hotel pickup in center of District 1 (except for Tan Dinh & Dakao Ward)",
        "Lunch (if VIP option selected)",
        "Entry/Admission - Cu Chi Tunnels"
      ],
      "notIncluded": [
        "Tips (optional & recommended)",
        "Bullets (if you try shooting the war gun)"
      ],
      "whatToExpect": "After pickup from your Ho Chi Minh City hotel in the morning or afternoon (depending on option selected), travel to the Cu Chi Tunnels and follow your guide on a tour of the tunnels. Learn how the Viet Cong soldiers used the vast network of underground tunnels during the Vietnam War/. Step inside the tunnels and see the former war bunkers, ammunition stores, and field hospitals. Then pose for photos peeking out of a camouflaged trapdoor, climb aboard an old American army tank, or visit the shooting range (optional: own expense). Your tour ends with drop-off in Ho Chi Minh’s city center.",
      "additionalInformation": [
        "Confirmation will be received at time of booking",
        "Most travelers can participate",
        "You must be above the age of 18 to participate in shooting experience",
        "After the morning tour, visit a nearby restaurant for restroom, feel free to enjoy a light lunch on your own",
        "This tour/activity will have a maximum of 25 travelers"
      ],
      "accessibility": [
        "Not wheel chair accessible",
        "Near public transportation",
        "Infants must sit on laps"
      ],
      "departureAndReturn": {
        "id": 1,
        "startDetail": {
          "id": 1,
          "address": "123 Lý Tự Trọng, Phường Bến Thành, Quận 1, Hồ Chí Minh, Vietnam",
          "description": "Multiple pickup locations offered."
        },
        "pickupDetail": {
          "id": 1,
          "description": "Pickup is offered in the center of District 1. Other Districts, please come to the meeting point (Vietnam Adventure Tours office) at: 123 Ly Tu Trong street, District 1 by 8:00AM for Morning Tour or 12:10PM for Afternoon Tour.",
          "hotelPickupOffered": true,
          "hotelPickupNote": "During checkout you will be able to select from the list of included hotels."
        },
        "endDetail": {
          "id": 1,
          "description": "This activity ends back at the meeting point."
        }
      }
    }
  }
]
```

2. GET /tours/{id}

- General:
  - Get Tour with this id
- Path argument:
  - id: integer
- Returns:
  - Return the Tour with this id
- Sample request:

```json
curl GET http://localhost:8080/tours/1

```

- Sample response:

```json
{
  "id": 1,
  "name": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
  "cityId": 1,
  "cityName": "Quy Nhon city",
  "categoryId": 2,
  "categoryName": "skibidi category3",
  "subcategoryId": 10,
  "subcategoryName": "skibidi sub1",
  "numberOfReviews": 10403,
  "imageObject": {
    "primaryImage": {
      "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg"
    },
    "images": [
      {
        "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/47.jpg"
      },
      {
        "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/41.jpg"
      }
    ]
  },
  "languages": [
    {
      "id": 1,
      "name": "French"
    },
    {
      "id": 3,
      "name": "Chinese"
    },
    {
      "id": 2,
      "name": "English"
    }
  ],
  "minAge": 3,
  "maxAge": 99,
  "maxGroupSize": 25,
  "duration": 6.0,
  "price": 17.9,
  "rating": 4.5,
  "highlights": [
    {
      "id": 1,
      "description": "Guided tour of the Cu Chi Tunnels from Ho Chi Minh City"
    },
    {
      "id": 2,
      "description": "Incredible photo opportunities in the tunnels and with trapdoors"
    },
    {
      "id": 3,
      "description": "Save money on a group tour with entrance included"
    },
    {
      "id": 4,
      "description": "Hassle-free hotel pickup and round-trip transport from Ho Chi Minh City"
    }
  ],
  "days": [
    {
      "id": 1,
      "dayNumber": 1,
      "stops": [
        {
          "id": 1,
          "name": "Cu Chi Tunnels",
          "latitude": 11.061,
          "longitude": 106.526,
          "description": "Around 8:00AM or 12:10PM. Start with pickup from the center of Ho Chi Minh City or meet at the meeting point then depart for Cu Chi Tunnels. After 1.5 hour drive, we arrive at the Tunnels where You'll have the opportunity to explore the tunnel system, which includes narrow passageways, hidden entrances, and underground chambers. Learn about the daily life of the Cu Chi guerrilla fighters and how they managed to survive in the tunnels. You can crawl distances through the tunnels that were used by the guerrilla fighters during the Vietnam War. You may see kitchens, living quarters, among other things used during the war. Learn about how different types traps were created and set up. Visit the weapon rooms and learn how the ingenious soldiers made them. You can also safely try your hand at the shooting range with an AK-47. After exploration, we travel back to Ho Chi Minh City. Arrive approximately at 3:00pm for the morning tour and 6:50pm for the afternoon tour.",
          "isAttraction": false
        }
      ]
    }
  ],
  "description": "Used by the Viet Cong during the Vietnam War, the Cu Chi Tunnels are a network of underground tunnels stretching more than 124 miles (200 kilometers). For travelers on a budget, this group tour of up to 20 people offers great value, including hotel pickup, round-trip transport, and a guided tour of the tunnels. Choose from a morning or afternoon tour to suit your schedule.",
  "tourDetail": {
    "included": [
      "Transfer by Air-conditioned Bus",
      "English-speaking Tour Guide",
      "Entrance ticket",
      "Tapioca, hot tea, bottled water",
      "Hotel pickup in center of District 1 (except for Tan Dinh & Dakao Ward)",
      "Lunch (if VIP option selected)",
      "Entry/Admission - Cu Chi Tunnels"
    ],
    "notIncluded": [
      "Tips (optional & recommended)",
      "Bullets (if you try shooting the war gun)"
    ],
    "whatToExpect": "After pickup from your Ho Chi Minh City hotel in the morning or afternoon (depending on option selected), travel to the Cu Chi Tunnels and follow your guide on a tour of the tunnels. Learn how the Viet Cong soldiers used the vast network of underground tunnels during the Vietnam War/. Step inside the tunnels and see the former war bunkers, ammunition stores, and field hospitals. Then pose for photos peeking out of a camouflaged trapdoor, climb aboard an old American army tank, or visit the shooting range (optional: own expense). Your tour ends with drop-off in Ho Chi Minh’s city center.",
    "additionalInformation": [
      "Confirmation will be received at time of booking",
      "Most travelers can participate",
      "You must be above the age of 18 to participate in shooting experience",
      "After the morning tour, visit a nearby restaurant for restroom, feel free to enjoy a light lunch on your own",
      "This tour/activity will have a maximum of 25 travelers"
    ],
    "accessibility": [
      "Not wheel chair accessible",
      "Near public transportation",
      "Infants must sit on laps"
    ],
    "departureAndReturn": {
      "id": 1,
      "startDetail": {
        "id": 1,
        "address": "123 Lý Tự Trọng, Phường Bến Thành, Quận 1, Hồ Chí Minh, Vietnam",
        "description": "Multiple pickup locations offered."
      },
      "pickupDetail": {
        "id": 1,
        "description": "Pickup is offered in the center of District 1. Other Districts, please come to the meeting point (Vietnam Adventure Tours office) at: 123 Ly Tu Trong street, District 1 by 8:00AM for Morning Tour or 12:10PM for Afternoon Tour.",
        "hotelPickupOffered": true,
        "hotelPickupNote": "During checkout you will be able to select from the list of included hotels."
      },
      "endDetail": {
        "id": 1,
        "description": "This activity ends back at the meeting point."
      }
    }
  }
}
```

3. GET /cities/{cityName}/tours

- General:
  - Get all Tours within this City with cityName
- Path argument:
  - cityName: String
- Returns:
  - Return a List of all Tours within this City with cityName
- Sample request:

```json
curl GET http://localhost:8080/cities/Quy Nhon city/tours

```

- Sample response:

```json
[
  {
    "id": 1,
    "name": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
    "cityId": 1,
    "cityName": "Quy Nhon city",
    "categoryId": 2,
    "categoryName": "skibidi category3",
    "subcategoryId": 10,
    "subcategoryName": "skibidi sub1",
    "numberOfReviews": 10403,
    "imageObject": {
      "primaryImage": {
        "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg"
      },
      "images": [
        {
          "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/47.jpg"
        },
        {
          "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/41.jpg"
        }
      ]
    },
    "languages": [
      {
        "id": 1,
        "name": "French"
      },
      {
        "id": 3,
        "name": "Chinese"
      },
      {
        "id": 2,
        "name": "English"
      }
    ],
    "minAge": 3,
    "maxAge": 99,
    "maxGroupSize": 25,
    "duration": 6.0,
    "price": 17.9,
    "rating": 4.5,
    "highlights": [
      {
        "id": 1,
        "description": "Guided tour of the Cu Chi Tunnels from Ho Chi Minh City"
      },
      {
        "id": 2,
        "description": "Incredible photo opportunities in the tunnels and with trapdoors"
      },
      {
        "id": 3,
        "description": "Save money on a group tour with entrance included"
      },
      {
        "id": 4,
        "description": "Hassle-free hotel pickup and round-trip transport from Ho Chi Minh City"
      }
    ],
    "days": [
      {
        "id": 1,
        "dayNumber": 1,
        "stops": [
          {
            "id": 1,
            "name": "Cu Chi Tunnels",
            "latitude": 11.061,
            "longitude": 106.526,
            "description": "Around 8:00AM or 12:10PM. Start with pickup from the center of Ho Chi Minh City or meet at the meeting point then depart for Cu Chi Tunnels. After 1.5 hour drive, we arrive at the Tunnels where You'll have the opportunity to explore the tunnel system, which includes narrow passageways, hidden entrances, and underground chambers. Learn about the daily life of the Cu Chi guerrilla fighters and how they managed to survive in the tunnels. You can crawl distances through the tunnels that were used by the guerrilla fighters during the Vietnam War. You may see kitchens, living quarters, among other things used during the war. Learn about how different types traps were created and set up. Visit the weapon rooms and learn how the ingenious soldiers made them. You can also safely try your hand at the shooting range with an AK-47. After exploration, we travel back to Ho Chi Minh City. Arrive approximately at 3:00pm for the morning tour and 6:50pm for the afternoon tour.",
            "isAttraction": false
          }
        ]
      }
    ],
    "description": "Used by the Viet Cong during the Vietnam War, the Cu Chi Tunnels are a network of underground tunnels stretching more than 124 miles (200 kilometers). For travelers on a budget, this group tour of up to 20 people offers great value, including hotel pickup, round-trip transport, and a guided tour of the tunnels. Choose from a morning or afternoon tour to suit your schedule.",
    "tourDetail": {
      "included": [
        "Transfer by Air-conditioned Bus",
        "English-speaking Tour Guide",
        "Entrance ticket",
        "Tapioca, hot tea, bottled water",
        "Hotel pickup in center of District 1 (except for Tan Dinh & Dakao Ward)",
        "Lunch (if VIP option selected)",
        "Entry/Admission - Cu Chi Tunnels"
      ],
      "notIncluded": [
        "Tips (optional & recommended)",
        "Bullets (if you try shooting the war gun)"
      ],
      "whatToExpect": "After pickup from your Ho Chi Minh City hotel in the morning or afternoon (depending on option selected), travel to the Cu Chi Tunnels and follow your guide on a tour of the tunnels. Learn how the Viet Cong soldiers used the vast network of underground tunnels during the Vietnam War/. Step inside the tunnels and see the former war bunkers, ammunition stores, and field hospitals. Then pose for photos peeking out of a camouflaged trapdoor, climb aboard an old American army tank, or visit the shooting range (optional: own expense). Your tour ends with drop-off in Ho Chi Minh’s city center.",
      "additionalInformation": [
        "Confirmation will be received at time of booking",
        "Most travelers can participate",
        "You must be above the age of 18 to participate in shooting experience",
        "After the morning tour, visit a nearby restaurant for restroom, feel free to enjoy a light lunch on your own",
        "This tour/activity will have a maximum of 25 travelers"
      ],
      "accessibility": [
        "Not wheel chair accessible",
        "Near public transportation",
        "Infants must sit on laps"
      ],
      "departureAndReturn": {
        "id": 1,
        "startDetail": {
          "id": 1,
          "address": "123 Lý Tự Trọng, Phường Bến Thành, Quận 1, Hồ Chí Minh, Vietnam",
          "description": "Multiple pickup locations offered."
        },
        "pickupDetail": {
          "id": 1,
          "description": "Pickup is offered in the center of District 1. Other Districts, please come to the meeting point (Vietnam Adventure Tours office) at: 123 Ly Tu Trong street, District 1 by 8:00AM for Morning Tour or 12:10PM for Afternoon Tour.",
          "hotelPickupOffered": true,
          "hotelPickupNote": "During checkout you will be able to select from the list of included hotels."
        },
        "endDetail": {
          "id": 1,
          "description": "This activity ends back at the meeting point."
        }
      }
    }
  }
]
```

4. GET /tours/search?tourName={}&cityName={}

- General:
  - Get Tour with this tourName and cityName
- Request argument:
  - tourName: String
  - cityName: String
- Returns:
  - Return the Tour with this TourName and cityName
- Sample request:

```json
curl GET http://localhost:8080/tours/search?cityName=Quy Nhon city&tourName=Cu Chi Tunnels Luxury Tour - Morning or Afternoon

```

- Sample response:

```json
{
  "id": 1,
  "name": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
  "cityId": 1,
  "cityName": "Quy Nhon city",
  "categoryId": 2,
  "categoryName": "skibidi category3",
  "subcategoryId": 10,
  "subcategoryName": "skibidi sub1",
  "numberOfReviews": 10403,
  "imageObject": {
    "primaryImage": {
      "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg"
    },
    "images": [
      {
        "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/47.jpg"
      },
      {
        "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/41.jpg"
      }
    ]
  },
  "languages": [
    {
      "id": 1,
      "name": "French"
    },
    {
      "id": 3,
      "name": "Chinese"
    },
    {
      "id": 2,
      "name": "English"
    }
  ],
  "minAge": 3,
  "maxAge": 99,
  "maxGroupSize": 25,
  "duration": 6.0,
  "price": 17.9,
  "rating": 4.5,
  "highlights": [
    {
      "id": 1,
      "description": "Guided tour of the Cu Chi Tunnels from Ho Chi Minh City"
    },
    {
      "id": 2,
      "description": "Incredible photo opportunities in the tunnels and with trapdoors"
    },
    {
      "id": 3,
      "description": "Save money on a group tour with entrance included"
    },
    {
      "id": 4,
      "description": "Hassle-free hotel pickup and round-trip transport from Ho Chi Minh City"
    }
  ],
  "days": [
    {
      "id": 1,
      "dayNumber": 1,
      "stops": [
        {
          "id": 1,
          "name": "Cu Chi Tunnels",
          "latitude": 11.061,
          "longitude": 106.526,
          "description": "Around 8:00AM or 12:10PM. Start with pickup from the center of Ho Chi Minh City or meet at the meeting point then depart for Cu Chi Tunnels. After 1.5 hour drive, we arrive at the Tunnels where You'll have the opportunity to explore the tunnel system, which includes narrow passageways, hidden entrances, and underground chambers. Learn about the daily life of the Cu Chi guerrilla fighters and how they managed to survive in the tunnels. You can crawl distances through the tunnels that were used by the guerrilla fighters during the Vietnam War. You may see kitchens, living quarters, among other things used during the war. Learn about how different types traps were created and set up. Visit the weapon rooms and learn how the ingenious soldiers made them. You can also safely try your hand at the shooting range with an AK-47. After exploration, we travel back to Ho Chi Minh City. Arrive approximately at 3:00pm for the morning tour and 6:50pm for the afternoon tour.",
          "isAttraction": false
        }
      ]
    }
  ],
  "description": "Used by the Viet Cong during the Vietnam War, the Cu Chi Tunnels are a network of underground tunnels stretching more than 124 miles (200 kilometers). For travelers on a budget, this group tour of up to 20 people offers great value, including hotel pickup, round-trip transport, and a guided tour of the tunnels. Choose from a morning or afternoon tour to suit your schedule.",
  "tourDetail": {
    "included": [
      "Transfer by Air-conditioned Bus",
      "English-speaking Tour Guide",
      "Entrance ticket",
      "Tapioca, hot tea, bottled water",
      "Hotel pickup in center of District 1 (except for Tan Dinh & Dakao Ward)",
      "Lunch (if VIP option selected)",
      "Entry/Admission - Cu Chi Tunnels"
    ],
    "notIncluded": [
      "Tips (optional & recommended)",
      "Bullets (if you try shooting the war gun)"
    ],
    "whatToExpect": "After pickup from your Ho Chi Minh City hotel in the morning or afternoon (depending on option selected), travel to the Cu Chi Tunnels and follow your guide on a tour of the tunnels. Learn how the Viet Cong soldiers used the vast network of underground tunnels during the Vietnam War/. Step inside the tunnels and see the former war bunkers, ammunition stores, and field hospitals. Then pose for photos peeking out of a camouflaged trapdoor, climb aboard an old American army tank, or visit the shooting range (optional: own expense). Your tour ends with drop-off in Ho Chi Minh’s city center.",
    "additionalInformation": [
      "Confirmation will be received at time of booking",
      "Most travelers can participate",
      "You must be above the age of 18 to participate in shooting experience",
      "After the morning tour, visit a nearby restaurant for restroom, feel free to enjoy a light lunch on your own",
      "This tour/activity will have a maximum of 25 travelers"
    ],
    "accessibility": [
      "Not wheel chair accessible",
      "Near public transportation",
      "Infants must sit on laps"
    ],
    "departureAndReturn": {
      "id": 1,
      "startDetail": {
        "id": 1,
        "address": "123 Lý Tự Trọng, Phường Bến Thành, Quận 1, Hồ Chí Minh, Vietnam",
        "description": "Multiple pickup locations offered."
      },
      "pickupDetail": {
        "id": 1,
        "description": "Pickup is offered in the center of District 1. Other Districts, please come to the meeting point (Vietnam Adventure Tours office) at: 123 Ly Tu Trong street, District 1 by 8:00AM for Morning Tour or 12:10PM for Afternoon Tour.",
        "hotelPickupOffered": true,
        "hotelPickupNote": "During checkout you will be able to select from the list of included hotels."
      },
      "endDetail": {
        "id": 1,
        "description": "This activity ends back at the meeting point."
      }
    }
  }
}
```

5. POST /tours

- General:
  - Create a new Tour
- Request body:
- Returns:
  - Return the newly created Tour
- Sample request:

```json
curl POST http://localhost:8080/tours \
          -H "Content-Type: application/json" \
          -d '{
  "name": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
  "cityId": 5,
  "subcategoryId": 10,
  "numberOfReviews": 10403,
  "tourImages": [
    {
      "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "isPrimary": true
    },
    {
      "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/47.jpg",
      "isPrimary": false
    },
    {
      "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/41.jpg",
      "isPrimary": false
    }
  ],
  "languages": [
    {
      "name": "English"
    },
    {
      "name": "Chinese"
    },
    {
      "name": "French"
    }
  ],
  "minAge": 3,
  "maxAge": 99,
  "maxGroupSize": 25,
  "duration": 6,
  "price": 17.90,
  "rating": 4.5,
  "highlights": [
    {
      "description": "Guided tour of the Cu Chi Tunnels from Ho Chi Minh City"
    },
    {
      "description": "Incredible photo opportunities in the tunnels and with trapdoors"
    },
    {
      "description": "Save money on a group tour with entrance included"
    },
    {
      "description": "Hassle-free hotel pickup and round-trip transport from Ho Chi Minh City"
    }
  ],
  "days": [
    {
      "dayNumber": 1,
      "stops": [
        {
          "name": "Cu Chi Tunnels",
          "description": "Around 8:00AM or 12:10PM. Start with pickup from the center of Ho Chi Minh City or meet at the meeting point then depart for Cu Chi Tunnels. After 1.5 hour drive, we arrive at the Tunnels where You'll have the opportunity to explore the tunnel system, which includes narrow passageways, hidden entrances, and underground chambers. Learn about the daily life of the Cu Chi guerrilla fighters and how they managed to survive in the tunnels. You can crawl distances through the tunnels that were used by the guerrilla fighters during the Vietnam War. You may see kitchens, living quarters, among other things used during the war. Learn about how different types traps were created and set up. Visit the weapon rooms and learn how the ingenious soldiers made them. You can also safely try your hand at the shooting range with an AK-47. After exploration, we travel back to Ho Chi Minh City. Arrive approximately at 3:00pm for the morning tour and 6:50pm for the afternoon tour.",
          "latitude": 11.061,
          "longitude": 106.526
        }
      ]
    }
  ],
  "description": "Used by the Viet Cong during the Vietnam War, the Cu Chi Tunnels are a network of underground tunnels stretching more than 124 miles (200 kilometers). For travelers on a budget, this group tour of up to 20 people offers great value, including hotel pickup, round-trip transport, and a guided tour of the tunnels. Choose from a morning or afternoon tour to suit your schedule.",
  "tourDetail": {
    "includedItems": [
      {
        "item": "Transfer by Air-conditioned Bus"
      },
      {
        "item": "English-speaking Tour Guide"
      },
      {
        "item": "Entrance ticket"
      },
      {
        "item": "Tapioca, hot tea, bottled water"
      },
      {
        "item": "Hotel pickup in center of District 1 (except for Tan Dinh & Dakao Ward)"
      },
      {
        "item": "Lunch (if VIP option selected)"
      },
      {
        "item": "Entry/Admission - Cu Chi Tunnels"
      }
    ],
    "notIncludedItems": [
      {
        "item": "Tips (optional & recommended)"
      },
      {
        "item": "Bullets (if you try shooting the war gun)"
      }
    ],
    "whatToExpect": "After pickup from your Ho Chi Minh City hotel in the morning or afternoon (depending on option selected), travel to the Cu Chi Tunnels and follow your guide on a tour of the tunnels. Learn how the Viet Cong soldiers used the vast network of underground tunnels during the Vietnam War/. Step inside the tunnels and see the former war bunkers, ammunition stores, and field hospitals. Then pose for photos peeking out of a camouflaged trapdoor, climb aboard an old American army tank, or visit the shooting range (optional: own expense). Your tour ends with drop-off in Ho Chi Minh’s city center.",
    "additionalInformations": [
      {
        "item": "Confirmation will be received at time of booking"
      },
      {
        "item": "Most travelers can participate"
      },
      {
        "item": "You must be above the age of 18 to participate in shooting experience"
      },
      {
        "item": "After the morning tour, visit a nearby restaurant for restroom, feel free to enjoy a light lunch on your own"
      },
      {
        "item": "This tour/activity will have a maximum of 25 travelers"
      }
    ],
    "accessibilities": [
      {
        "item": "Not wheel chair accessible"
      },
      {
        "item": "Near public transportation"
      },
      {
        "item": "Infants must sit on laps"
      }
    ],
    "departureAndReturn": {
      "startDetail": {
        "description": "Multiple pickup locations offered.",
        "address": "123 Lý Tự Trọng, Phường Bến Thành, Quận 1, Hồ Chí Minh, Vietnam"
      },
      "pickupDetail": {
        "description": "Pickup is offered in the center of District 1. Other Districts, please come to the meeting point (Vietnam Adventure Tours office) at: 123 Ly Tu Trong street, District 1 by 8:00AM for Morning Tour or 12:10PM for Afternoon Tour.",
        "hotelPickupOffered": true,
        "hotelPickupNote": "During checkout you will be able to select from the list of included hotels."
      },
      "endDetail": {
        "description": "This activity ends back at the meeting point."
      }
    }
  }
}
'

```

- Sample response:

```json
{
  "id": 1,
  "name": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
  "cityId": 1,
  "cityName": "Quy Nhon city",
  "categoryId": 2,
  "categoryName": "skibidi category3",
  "subcategoryId": 10,
  "subcategoryName": "skibidi sub1",
  "numberOfReviews": 10403,
  "imageObject": {
    "primaryImage": {
      "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg"
    },
    "images": [
      {
        "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/47.jpg"
      },
      {
        "imageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/11/d8/64/41.jpg"
      }
    ]
  },
  "languages": [
    {
      "id": 1,
      "name": "French"
    },
    {
      "id": 3,
      "name": "Chinese"
    },
    {
      "id": 2,
      "name": "English"
    }
  ],
  "minAge": 3,
  "maxAge": 99,
  "maxGroupSize": 25,
  "duration": 6.0,
  "price": 17.9,
  "rating": 4.5,
  "highlights": [
    {
      "id": 1,
      "description": "Guided tour of the Cu Chi Tunnels from Ho Chi Minh City"
    },
    {
      "id": 2,
      "description": "Incredible photo opportunities in the tunnels and with trapdoors"
    },
    {
      "id": 3,
      "description": "Save money on a group tour with entrance included"
    },
    {
      "id": 4,
      "description": "Hassle-free hotel pickup and round-trip transport from Ho Chi Minh City"
    }
  ],
  "days": [
    {
      "id": 1,
      "dayNumber": 1,
      "stops": [
        {
          "id": 1,
          "name": "Cu Chi Tunnels",
          "latitude": 11.061,
          "longitude": 106.526,
          "description": "Around 8:00AM or 12:10PM. Start with pickup from the center of Ho Chi Minh City or meet at the meeting point then depart for Cu Chi Tunnels. After 1.5 hour drive, we arrive at the Tunnels where You'll have the opportunity to explore the tunnel system, which includes narrow passageways, hidden entrances, and underground chambers. Learn about the daily life of the Cu Chi guerrilla fighters and how they managed to survive in the tunnels. You can crawl distances through the tunnels that were used by the guerrilla fighters during the Vietnam War. You may see kitchens, living quarters, among other things used during the war. Learn about how different types traps were created and set up. Visit the weapon rooms and learn how the ingenious soldiers made them. You can also safely try your hand at the shooting range with an AK-47. After exploration, we travel back to Ho Chi Minh City. Arrive approximately at 3:00pm for the morning tour and 6:50pm for the afternoon tour.",
          "isAttraction": false
        }
      ]
    }
  ],
  "description": "Used by the Viet Cong during the Vietnam War, the Cu Chi Tunnels are a network of underground tunnels stretching more than 124 miles (200 kilometers). For travelers on a budget, this group tour of up to 20 people offers great value, including hotel pickup, round-trip transport, and a guided tour of the tunnels. Choose from a morning or afternoon tour to suit your schedule.",
  "tourDetail": {
    "included": [
      "Transfer by Air-conditioned Bus",
      "English-speaking Tour Guide",
      "Entrance ticket",
      "Tapioca, hot tea, bottled water",
      "Hotel pickup in center of District 1 (except for Tan Dinh & Dakao Ward)",
      "Lunch (if VIP option selected)",
      "Entry/Admission - Cu Chi Tunnels"
    ],
    "notIncluded": [
      "Tips (optional & recommended)",
      "Bullets (if you try shooting the war gun)"
    ],
    "whatToExpect": "After pickup from your Ho Chi Minh City hotel in the morning or afternoon (depending on option selected), travel to the Cu Chi Tunnels and follow your guide on a tour of the tunnels. Learn how the Viet Cong soldiers used the vast network of underground tunnels during the Vietnam War/. Step inside the tunnels and see the former war bunkers, ammunition stores, and field hospitals. Then pose for photos peeking out of a camouflaged trapdoor, climb aboard an old American army tank, or visit the shooting range (optional: own expense). Your tour ends with drop-off in Ho Chi Minh’s city center.",
    "additionalInformation": [
      "Confirmation will be received at time of booking",
      "Most travelers can participate",
      "You must be above the age of 18 to participate in shooting experience",
      "After the morning tour, visit a nearby restaurant for restroom, feel free to enjoy a light lunch on your own",
      "This tour/activity will have a maximum of 25 travelers"
    ],
    "accessibility": [
      "Not wheel chair accessible",
      "Near public transportation",
      "Infants must sit on laps"
    ],
    "departureAndReturn": {
      "id": 1,
      "startDetail": {
        "id": 1,
        "address": "123 Lý Tự Trọng, Phường Bến Thành, Quận 1, Hồ Chí Minh, Vietnam",
        "description": "Multiple pickup locations offered."
      },
      "pickupDetail": {
        "id": 1,
        "description": "Pickup is offered in the center of District 1. Other Districts, please come to the meeting point (Vietnam Adventure Tours office) at: 123 Ly Tu Trong street, District 1 by 8:00AM for Morning Tour or 12:10PM for Afternoon Tour.",
        "hotelPickupOffered": true,
        "hotelPickupNote": "During checkout you will be able to select from the list of included hotels."
      },
      "endDetail": {
        "id": 1,
        "description": "This activity ends back at the meeting point."
      }
    }
  }
}
```

6. DELETE /tours/{id}

- General:
  - Delete a Tour with this id
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Tour
- Sample request:

```json
curl DELETE http://localhost:8080/tours/1

```

- Sample response:

```json
{
  "deletedId": 1
}
```

### Attraction Review

1. GET /attraction-reviews

- General:
  - Get all Attraction Reviews
- Returns:
  - Return a List of all Attraction Reviews
- Sample request:

```json
curl GET http://localhost:8080/attraction-reviews

```

- Sample response:

```json
[
  {
    "id": 1,
    "reviewTitle": "Fantastic, Spectacular",
    "description": "Gorgeous sea peninsula views from the top of the big Buddha.",
    "rating": 5.0,
    "reviewDate": "2024-09-06",
    "user": {
      "id": 1,
      "firstName": "Abraham",
      "lastName": "Lincoln",
      "city": "New York",
      "country": "USA",
      "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1"
    },
    "attractionName": "Bitexco Financial Tower"
  }
]
```

2. POST /attraction-reviews

- General:
  - Create a new Attraction Review
- Returns:
  - Return the newly created Attraction Review
- Sample request:

```json
curl POST http://localhost:8080/attraction-reviews \
          -H "Content-Type: application/json" \
          -d '{
    "userId": 1,
    "attractionId": 1,
    "title": "Stunning views and peaceful",
    "description":
      "Gorgeous sea peninsula views from the top of the big Buddha.",
    "rating": 5
  }
'

```

- Sample response:

```json
{
  "id": 1,
  "reviewTitle": "Stunning views and peaceful",
  "description": "Gorgeous sea peninsula views from the top of the big Buddha.",
  "reviewDate": "2024-09-06",
  "user": {
    "id": 1,
    "firstName": "Abraham",
    "lastName": "Lincoln",
    "city": "New York",
    "country": "USA",
    "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1"
  },
  "attractionName": "Bitexco Financial Tower"
}
```

3. PUT /attraction-reviews/{id}

- General:
  - Update an existing Attraction Review
- Path argument:
  - id: integer
- Returns:
  - Return the updated Attraction Review
- Sample request:

```json
curl PUT http://localhost:8080/attraction-reviews/1 \
        -H "Content-Type: application/json" \
        -d '{
    "userId": 1,
    "attractionId": 1,
    "title": "Fantastic, Spectacular",
    "description":
      "Gorgeous sea peninsula views from the top of the big Buddha.",
    "rating": 5
  }
'

```

- Sample response:

```json
{
  "id": 1,
  "reviewTitle": "Fantastic, Spectacular",
  "description": "Gorgeous sea peninsula views from the top of the big Buddha.",
  "rating": 5,
  "reviewDate": "2024-09-06",
  "user": {
    "id": 1,
    "firstName": "Abraham",
    "lastName": "Lincoln",
    "city": "New York",
    "country": "USA",
    "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1"
  },
  "attractionName": "Bitexco Financial Tower"
}
```

4. DELETE /attraction-reviews/{id}

- General:
  - Delete an existing Attraction Review
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Attraction Review
- Sample request:

```json
curl DELETE http://localhost:8080/attraction-reviews/1

```

- Sample response:

```json
{
  "deletedId": 1
}
```

#### User

1. GET /users

- General:
  - Get all Users
- Returns:
  - Return a List of all Users
- Sample request:

```json
curl GET http://localhost:8080/users

```

- Sample response:

```json
[
  {
    "id": 1,
    "firstName": "Abraham",
    "lastName": "Lincoln",
    "city": "New York",
    "country": "USA",
    "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1"
  }
]
```

2. GET /users/{id}

- General:
  - Get the User with this id
- Path argument:
  - id: integer
- Returns:
  - Return the User with this id
- Sample request:

```json
curl GET http://localhost:8080/users/1

```

- Sample response:

```json
{
  "id": 1,
  "firstName": "Abraham",
  "lastName": "Lincoln",
  "city": "New York",
  "country": "USA",
  "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1"
}
```

3. POST /users

- General:
  - Create a new User
- Request body:
- Returns:
  - Return the newly created User
- Sample request:

```json
curl POST http://localhost:8080/users \
          -H "Content-Type: application/json" \
          -d '{
    "firstName": "Trump",
    "lastName": "Donald",
    "city": "New York",
    "country": "USA",
    "subject": "skibidi2",
    "imageUrl":
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1"
  }
'

```

- Sample response:

```json
{
  "id": 1,
  "firstName": "Trump",
  "lastName": "Donald",
  "city": "New York",
  "country": "USA",
  "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1"
}
```

4. PUT /users/{id}

- General:
  - Update an existing User with this id
- Path argument:
  - id: integer
- Returns:
  - Return the updated User
- Sample request:

```json
curl PUT http://localhost:8080/users/1 \
        -H "Content-Type: application/json" \
        -d '{
    "firstName": "Abraham",
    "lastName": "Lincoln",
    "city": "New York",
    "country": "USA",
    "imageUrl":
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1"
  }
'

```

- Sample response:

```json
{
  "id": 1,
  "firstName": "Abraham",
  "lastName": "Lincoln",
  "city": "New York",
  "country": "USA",
  "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1"
}
```

5. DELETE /users/{id}

- General:
  - Delete an existing User with this id
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted User
- Sample request:

```json
curl DELETE http://localhost:8080/users/1

```

- Sample response:

```json
{
  "deletedId": 1
}
```
