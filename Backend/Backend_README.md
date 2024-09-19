# Travel Advisor (Backend)

- The Backend app is built with Java Spring Boot, with Maven, and is currently deployed to Render cloud platform.

- The Backend app uses PostgreSQL as the database, and is currently deployed to Heroku cloud platform.

- The Backend techstack also includes: Spring Data JPA, Spring Security, Spring Web, Spring Boot Validation, Spring Boot DevTools, PostgreSQL, Lombok, Auth0 for Authentication/Authorization, and Stripe for payment processing.

## Getting Started

### Pre-requisite and Local Development

- Developers should have Java 21 installed in their local machine. If you don't have Java 11 installed, you can download it from [Java 21](https://www.oracle.com/java/technologies/javase-jdk21-downloads.html)

- Developers should have Docker installed in their local machine. If you don't have Docker installed, you can download it from [Docker](https://www.docker.com/products/docker-desktop)

- Developers should have Maven installed in their local machine. If you don't have Maven installed, you can download it from [Maven](https://maven.apache.org/download.cgi)

- Developers are recommended to use IntelliJ IDEA as the IDE for the Backend Java Spring Boot project. If you don't have IntelliJ IDEA installed, you can download it from [IntelliJ IDEA](https://www.jetbrains.com/idea/download/)

- The Backend uses PostgreSQL as the database. Developers should have PostgreSQL installed in their local machine. If you don't have PostgreSQL installed, you can download it from [PostgreSQL](https://www.postgresql.org/download/). We can also install the `psql` client, which is a terminal-based front-end to PostgreSQL. The `psql` client is used to connect to a PostgreSQL database and perform database operations.

#### Backend

- To run the Backend Java Spring Boot, follow these steps:

  - First, we need to create the PostgreSQL database. Open the terminal and run the following command:

  ```bash
  # Access psql client
  psql -U YOUR_DB_USERNAME -h YOUR_DB_HOST

  # Create the database using SQL command
  CREATE DATABASE YOUR_DB_NAME;
  ```

  - Then, because the Backend app uses Auth0 for Authentication/Authorization, and Stripe for payment processing, we need to create an Auth0 account, create an API in the Auth0 dashboard, create Auth0 Regular Web Application type, and get the Auth0 properties. We also need to create a Stripe account, and get the Stripe secret key.

  - After that, we should create a `.env` file in the root directory of the Backend, and update the Auth0 properties, and Stripe properties:

  ```properties
  # Development DB Credentials
  LOCAL_DB_NAME=YOUR_DB_NAME
  LOCAL_DB_USERNAME=YOUR_DB_USERNAME
  LOCAL_DB_PASSWORD=YOUR_DB_PASSWORD
  LOCAL_DB_PORT=5432

  # Auth0 Properties
  OKTA_OAUTH2_ISSUER=YOUR_AUTH0_ISSUER
  OKTA_OAUTH2_AUDIENCE=YOUR_AUTH0_AUDIENCE
  JWK_SET_URI=YOUR_AUTH0_JWK_SET_URI

  # Stripe Properties
  STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
  ```

- Now, we can run the Spring Boot Backend by using IntelliJ IDEA to run the Backend Java Spring Boot, by opening the `Edit Configuration` and set environment variable to be `spring.profiles.active=development`, and run the `TravelAdvisorBackendApplication` class.

Or: we can use the following command:

```bash
# Run the Backend
mvn spring-boot:run
```

- The Backend Java Spring Boot will start running on `http://localhost:8080/`. Open the browser and navigate to `http://localhost:8080/` to see the Backend Java Spring Boot.

### Backend Folder Structure

- The Backend Java Spring Boot has the following structure:

  - `src/` folder: contains all the src code of the Backend
    - `main/` folder: contains the main code of the Backend
      - `java/` folder: contains the Java code of the Backend
        - `com/` folder: contains the com code of the Backend
          - `project/` folder: contains the products code of the Backend
            - `travel_advisor/` folder
              - `config/` folder: contains the Configurations of the Backend
                - `MyAppConfig.java` file: contains the App Configuration of the Backend (for the Allowed Origins)
                - `SecurityConfig.java` file: contains the Security Configuration of the Backend (for the Auth0 Authentication/Authorization)
              - `controller/` folder: contains the Controllers of the Backend
              - `dto/` folder: contains the Data Transfer Objects of the Backend
              - `entity/` folder: contains the Entities of the Backend
              - `exception/` folder: contains the Exceptions of the Backend
              - `mapper/` folder: contains the Mappers of the Backend
              - `repository/` folder: contains the Repositories of the Backend
              - `service/` folder: contains the Services of the Backend
              - `utils/` folder: contains the Utils of the Backend
              - `TravelAdvisorBackendApplication.java` file: contains the main class of the Backend
      - `resources/` folder: contains the resources of the Backend
        - `application.properties` file: contains the properties of the Backend for both Development, and Production environment
        - `application-development.properties` file: contains the properties of the Backend for the Development environment
        - `application-production.properties` file: contains the properties of the Backend for the Production environment
    - `test/` folder: contains the test code of the Backend
      - `java/` folder: contains the Java test code of the Backend
        - `com/` folder: contains the com test code of the Backend
          - `travel_advisor/` folder: contains the test code of the Backend
            - `TravelAdvisorBackendApplicationTests.java` file: contains the test class of the Backend
    - `Dockerfile` file: contains the Dockerfile of the Backend
    - `.dockerignore` file: contains the dockerignore of the Backend
    - `pom.xml` file: contains the dependencies, plugins of the Backend
    - `Backend_README.md` file: contains the README of the Backend
    - `.gitignore` file: contains the gitignore of the Backend

## API Reference

### Introduction

- These APIs is for the Travel Advisor Application. We can use these APIs to perform CRUD with entities in the database

- Base URL: At present this app can only be run locally and is not hosted as a base URL. The backend app is hosted at the default, http://127.0.0.1/8080/, which is set as a proxy in the frontend configuration.

- This app has 2 types of Users: Admin, and Authenticated User. Each of them has their own Role, and their own permissions to be able to access resources of certain endpoints, as for Role-based access control (RBAC)

- The JWT access token is required for these endpoints (except the public endpoints), and we will get this JWT after we log in successfully in the Frontend React

### Error Handling:

- Errors are returns in JSON format as follows:

```json
{
  "success": false,
  "error": 404,
  "message": "Resource Not Found"
}
```

There are 5 types of errors:

- 400: Bad Request
- 404: Resource Not Found
- 401: Unauthorized
- 403: Forbidden
- 500: INTERNAL SERVER ERROR

### Endpoints:

- I will demonstrate the endpoints for each Entity, which are: Category, Subcategory, City, Restaurant, Attraction, Tour, Attraction Review, User, Tour Booking, and Payment

#### Category:

##### 1. GET /categories:

- General:
  - Get all Categories
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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

3. POST /secure/categories

- General:
  - Create a new Category
  - This is an Admin Endpoint, so the JWT access token is required
- Request body:

  - name: String
  - subcategories: List of Subcategory objects (in the format: {"name": subcategory_name}) (Optional)

- Returns:
  - Return the created Category object
- Sample request:

```json
curl -X POST http://localhost:8080/secure/categories \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <JWT_OF_ADMIN>" \
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

4. PUT /secure/categories/{id}

- General:
  - Update an existing Category
  - This is an Admin Endpoint, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the updated Category object
- Sample request:

```json
curl -X PUT http://localhost:8080/secure/categories/1 \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <JWT_OF_ADMIN>" \
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
    -H "Authorization: Bearer <JWT_OF_ADMIN>" \
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

5. DELETE /secure/categories/{id}

- General:
  - Delete an existing Category
  - This is an Admin Endpoint, so the JWT access token is required
- Returns:
  - Return the id of the deleted Category
- Sample request:

```json
curl -X DELETE http://localhost:8080/secure/categories/1 \
    -H "Authorization: Bearer <JWT_OF_ADMIN>"

```

- Sample response:

```json
{
  "deletedId": 12
}
```

6. DELETE /secure/categories

- General:
  - Delete all Categories
  - This is an Admin Endpoint, so the JWT access token is required
- Returns:
  - The String `All Category has been successfully deleted`
- Sample request:

  ```json
  curl -X DELETE http://localhost:8080/secure/categories \
      -H "Authorization: Bearer <JWT_OF_ADMIN>"
  ```

- Sample response:

```json
All Category has been successfully deleted
```

#### Subcategory

1. GET /subcategories

- General:
  - Get all Subcategories
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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

4. POST /secure/subcategories

- General:
  - Create a new Subcategory within an existing Category
  - This is an Admin Endpoint, so the JWT access token is required
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
curl POST http://localhost:8080/secure/subcategories \
          -H "Content-Type: application/json" \
          -H "Authorization: Bearer <JWT_OF_ADMIN>" \
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

5. DELETE /secure/subcategories/{id}

- General:
  - Delete an existing Subcategory from a Category
  - This is an Admin Endpoint, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Subcategory
- Sample request:

```json
curl DELETE http://localhost:8080/secure/subcategories/11 \
          -H "Authorization: Bearer <JWT_OF_ADMIN>"
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
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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

4. POST /secure/cities

- General:
  - Create a new City
  - This is an Admin Endpoint, so the JWT access token is required
- Request body:
  - In the sample request
- Returns:
  - Return the newly created City object
- Sample request:

```json
curl POST http://localhost:8080/secure/cities \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer <JWT_OF_ADMIN>" \
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

5. DELETE /secure/cities/{id}

- General:
  - Delete a City by id
  - This is an Admin Endpoint, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted City
- Sample request:

```json
curl DELETE http://localhost:8080/secure/cities/5 \
        -H "Authorization: Bearer <JWT_OF_ADMIN>"
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
  - This is a Public Endpoint, so no JWT access token is required
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
]
```

2. GET /restaurants/{id}

- General:
  - Get Restaurant with this id
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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

5. POST /secure/restaurants

- General:
  - Create a new Restaurant
  - This is an Admin Endpoint, so the JWT access token is required
- Request body:
  - In the sample request
- Returns:
  - Return the newly created Restaurant
- Sample request:

```json
curl POST http://localhost:8080/secure/restaurants \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer <JWT_OF_ADMIN>" \
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

6. DELETE /secure/restaurants/{id}

- General:
  - Delete an existing Restaurant with this id
  - This is an Admin Endpoint, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Restaurant
- Sample request:

```json
curl DELETE http://localhost:8080/restaurants/10 \
        -H "Authorization: Bearer <JWT_OF_ADMIN>"
```

- Sample response:

```json
{ "deletedId": 10 }
```

#### Attraction

1. GET /attractions

- General:
  - Get all Attractions
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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

4. POST /secure/attractions

- General:
  - Create a new Attraction
  - This is an Admin Endpoint, so the JWT access token is required
- Request body:
  - In the sample request
- Returns:
  - Return the newly created Attraction
- Sample request:

```json
curl POST http://localhost:8080/secure/attractions \
          -H "Content-Type: application/json" \
          -H "Authorization: Bearer <JWT_OF_ADMIN>" \
          -d '{
  "name": "Bitexco Financial Tower",
  "subcategoryId": 10,
  "cityId": 1,
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

5. DELETE /secure/attractions/{id}

- General:
  - Delete an existing Attraction with this id
  - This is an Admin Endpoint, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Attraction
- Sample request:

```json
curl DELETE http://localhost:8080/secure/attractions/10  \
        -H "Authorization: Bearer <JWT_OF_ADMIN>"
```

- Sample response:

```json
{ "deletedId": 10 }
```

#### Tour

1. GET /tours

- General:
  - Get all Tours
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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
  - This is a Public Endpoint, so no JWT access token is required
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

5. POST /secure/tours

- General:
  - Create a new Tour
  - This is an Admin Endpoint, so the JWT access token is required
- Request body:
  - In the sample request
- Returns:
  - Return the newly created Tour
- Sample request:

```json
curl POST http://localhost:8080/secure/tours \
          -H "Content-Type: application/json" \
          -H "Authorization: Bearer <JWT_OF_ADMIN>" \
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

6. DELETE /secure/tours/{id}

- General:
  - Delete a Tour with this id
  - This is an Admin Endpoint, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Tour
- Sample request:

```json
curl DELETE http://localhost:8080/secure/tours/1 \
          -H "Authorization: Bearer <JWT_OF_ADMIN>" \
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
  - This is a Public Endpoint, so no JWT access token is required
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

2. POST /secure/attraction-reviews

- General:
  - Create a new Attraction Review
  - This is an Authenticated User Endpoint, so the JWT access token is required
- Request body:
  - In the sample request
- Returns:
  - Return the newly created Attraction Review
- Sample request:

```json
curl POST http://localhost:8080/secure/attraction-reviews \
          -H "Content-Type: application/json" \
          -H "Authorization: Bearer <JWT_OF_AUTHENTICATED_USER>" \
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

3. PUT /secure/attraction-reviews/{id}

- General:
  - Update an existing Attraction Review
  - This is an Endpoint for both Admin and Authenticated User, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the updated Attraction Review
- Sample request:

```json
curl PUT http://localhost:8080/secure/attraction-reviews/1 \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer <JWT_OF_ADMIN_OR_AUTHENTICATED_USER>" \
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

4. DELETE /secure/attraction-reviews/{id}

- General:
  - Delete an existing Attraction Review
  - This is an Endpoint for both Admin and Authenticated User, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Attraction Review
- Sample request:

```json
curl DELETE http://localhost:8080/secure/attraction-reviews/1 \
          -H "Authorization: Bearer <JWT_OF_ADMIN_OR_AUTHENTICATED_USER>" \
```

- Sample response:

```json
{
  "deletedId": 1
}
```

#### User

1. GET /secure/users

- General:
  - Get all Users
  - This is an Admin Endpoint, so the JWT access token is required
- Returns:
  - Return a List of all Users
- Sample request:

```json
curl GET http://localhost:8080/secure/users \
          -H "Authorization: Bearer <JWT_OF_ADMIN>" \
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

2. GET /secure/users/{id}

- General:
  - Get the User with this id
  - This is an Endpoint for both Admin and Authenticated User, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the User with this id
- Sample request:

```json
curl GET http://localhost:8080/secure/users/1 \
          -H "Authorization: Bearer <JWT_OF_ADMIN_OR_AUTHENTICATED_USER>" \
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

3. POST /secure/users

- General:
  - Create a new User
  - This is an Endpoint for both Admin and Authenticated User, so the JWT access token is required
- Request body:
  - In the sample request
- Returns:
  - Return the newly created User
- Sample request:

```json
curl POST http://localhost:8080/secure/users \
          -H "Content-Type: application/json" \
          -H "Authorization: Bearer <JWT_OF_ADMIN_OR_AUTHENTICATED_USER>" \
          -d '{
    "firstName": "Trump",
    "lastName": "Donald",
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
  "firstName": "Trump",
  "lastName": "Donald",
  "city": "New York",
  "country": "USA",
  "imageUrl": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/5a/3f/f6/mm-153.jpg?w=100&h=-1&s=1"
}
```

4. PUT /secure/users/{id}

- General:
  - Update an existing User with this id
  - This is an Endpoint for both Admin and Authenticated User, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the updated User
- Sample request:

```json
curl PUT http://localhost:8080/secure/users/1 \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer <JWT_OF_ADMIN_OR_AUTHENTICATED_USER>" \
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

5. DELETE /secure/users/{id}

- General:
  - Delete an existing User with this id
  - This is an Admin Endpoint, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted User
- Sample request:

```json
curl DELETE http://localhost:8080/secure/users/1 \
          -H "Authorization: Bearer <JWT_OF_ADMIN>" \
```

- Sample response:

```json
{
  "deletedId": 1
}
```

6. GET /secure/users/search/findBySubject?subject={}

- General:
  - Get the User with this subject
  - This is an Endpoint for both Admin and Authenticated User, so the JWT access token is required
- Request argument:
  - subject: String
- Returns:
  - Return the User with this subject
- Sample request:

  ```json
  curl GET http://localhost:8080/secure/users/search/findBySubject?subject=google-oauth2|100000000000000000000 \
          -H "Authorization: Bearer <JWT_OF_ADMIN_OR_AUTHENTICATED_USER>" \
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

#### Tour Booking

1. GET /secure/tour-bookings

- General:
  - Get all Tour Bookings of all Authenticated Users
  - This is an Admin Endpoint, so the JWT access token is required
- Returns:
  - Return a List of all Tour Bookings of all Authenticated Users
- Sample request:

  ```json
  curl GET http://localhost:8080/secure/tour-bookings \
          -H "Authorization: Bearer <JWT_OF_ADMIN>" \
  ```

- Sample response:

  ```json
  [
    {
      "id": 1,
      "userId": 1,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "3aa8c78c-68aa-4ecd-a6ec-af56ef13cb7a",
      "numberOfPeople": 3,
      "totalPrice": 250.0,
      "tourStartDate": "2024-10-15"
    },
    {
      "id": 2,
      "userId": 1,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "5ce01d99-d5bf-479d-b4ae-2bd97c26729e",
      "numberOfPeople": 3,
      "totalPrice": 250.0,
      "tourStartDate": "2024-10-15"
    },
    {
      "id": 3,
      "userId": 1,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "7e997046-e1a5-40a3-adf6-f51e3adcdd32",
      "numberOfPeople": 3,
      "totalPrice": 250.0,
      "tourStartDate": "2024-10-15"
    },
    {
      "id": 6,
      "userId": 15,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "89d58dfa-d302-4f54-ab50-c826a3b097ce",
      "numberOfPeople": 4,
      "totalPrice": 71.6,
      "tourStartDate": "2024-09-11"
    },
    {
      "id": 7,
      "userId": 15,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "3b835c0b-3924-468c-9492-3bfd6b50f2ae",
      "numberOfPeople": 3,
      "totalPrice": 53.7,
      "tourStartDate": "2024-09-11"
    },
    {
      "id": 9,
      "userId": 15,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "1a27be35-9e5f-4a05-b2ee-14ee8426a8e6",
      "numberOfPeople": 3,
      "totalPrice": 53.7,
      "tourStartDate": "2024-09-11"
    },
    {
      "id": 10,
      "userId": 15,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "a50cfe52-921f-4267-8952-19f6e7c612d0",
      "numberOfPeople": 3,
      "totalPrice": 53.7,
      "tourStartDate": "2024-09-12"
    },
    {
      "id": 11,
      "userId": 15,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "52c50961-1dc8-4957-8fac-3aa3b7a49cf3",
      "numberOfPeople": 3,
      "totalPrice": 53.7,
      "tourStartDate": "2024-09-12"
    },
    {
      "id": 12,
      "userId": 15,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "055654c2-bc5f-4fc1-816d-9dc82aa91474",
      "numberOfPeople": 2,
      "totalPrice": 35.8,
      "tourStartDate": "2024-09-14"
    },
    {
      "id": 13,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "322e5fc8-3328-4788-a5c6-e4337992e652",
      "numberOfPeople": 5,
      "totalPrice": 89.5,
      "tourStartDate": "2024-09-12"
    },
    {
      "id": 14,
      "userId": 15,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "d7d424e4-39df-4822-a2dc-ac788c3af383",
      "numberOfPeople": 1,
      "totalPrice": 17.9,
      "tourStartDate": "2024-09-21"
    },
    {
      "id": 18,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "75ccd37d-a908-4270-96f1-8e5ce9fec60e",
      "numberOfPeople": 2,
      "totalPrice": 35.8,
      "tourStartDate": "2024-09-22"
    },
    {
      "id": 19,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "6215e66d-62ce-44fb-adef-75784498a9f8",
      "numberOfPeople": 1,
      "totalPrice": 17.9,
      "tourStartDate": "2024-09-28"
    },
    {
      "id": 20,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "a78f97ab-27e2-4e62-b78b-271404d57f37",
      "numberOfPeople": 1,
      "totalPrice": 17.9,
      "tourStartDate": "2024-09-21"
    },
    {
      "id": 21,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "ddde58d7-f418-4627-bc54-b43ffcb092d8",
      "numberOfPeople": 2,
      "totalPrice": 35.8,
      "tourStartDate": "2024-09-22"
    },
    {
      "id": 22,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "c0d3f95c-f9bd-42bc-a711-3ffe804c2b43",
      "numberOfPeople": 2,
      "totalPrice": 35.8,
      "tourStartDate": "2024-09-22"
    },
    {
      "id": 23,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "1b0dc383-c05a-410f-a5b8-50dd6f2f8e70",
      "numberOfPeople": 1,
      "totalPrice": 17.9,
      "tourStartDate": "2024-09-20"
    }
  ]
  ```

2. GET /secure/tour-bookings/search/findByUserId?userId={}

- General:
  - Find all Tour Bookings of this Authenticated User with this userId
  - This is an Endpoint for both Admin and Authenticated User, so the JWT access token is required
- Request argument:
  - userId: integer
- Returns:
  - Return a List of all Tour Bookings of this Authenticated User with this userId
- Sample request:

  ```json
  curl GET http://localhost:8080/secure/tour-bookings/search/findByUserId?userId=1 \
          -H "Authorization: Bearer <JWT_OF_ADMIN_OR_AUTHENTICATED_USER>" \
  ```

- Sample response:

  ```json
  [
    {
      "id": 13,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "322e5fc8-3328-4788-a5c6-e4337992e652",
      "numberOfPeople": 5,
      "totalPrice": 89.5,
      "tourStartDate": "2024-09-12"
    },
    {
      "id": 18,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "75ccd37d-a908-4270-96f1-8e5ce9fec60e",
      "numberOfPeople": 2,
      "totalPrice": 35.8,
      "tourStartDate": "2024-09-22"
    },
    {
      "id": 19,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "6215e66d-62ce-44fb-adef-75784498a9f8",
      "numberOfPeople": 1,
      "totalPrice": 17.9,
      "tourStartDate": "2024-09-28"
    },
    {
      "id": 20,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "a78f97ab-27e2-4e62-b78b-271404d57f37",
      "numberOfPeople": 1,
      "totalPrice": 17.9,
      "tourStartDate": "2024-09-21"
    },
    {
      "id": 21,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "ddde58d7-f418-4627-bc54-b43ffcb092d8",
      "numberOfPeople": 2,
      "totalPrice": 35.8,
      "tourStartDate": "2024-09-22"
    },
    {
      "id": 22,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "c0d3f95c-f9bd-42bc-a711-3ffe804c2b43",
      "numberOfPeople": 2,
      "totalPrice": 35.8,
      "tourStartDate": "2024-09-22"
    },
    {
      "id": 23,
      "userId": 16,
      "tourId": 1,
      "tourName": "Cu Chi Tunnels Luxury Tour - Morning or Afternoon",
      "tourPrimaryImageUrl": "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/fb/9b/d2.jpg",
      "tourBookingTrackingNumber": "1b0dc383-c05a-410f-a5b8-50dd6f2f8e70",
      "numberOfPeople": 1,
      "totalPrice": 17.9,
      "tourStartDate": "2024-09-20"
    }
  ]
  ```

3. POST /secure/book-tour

- General:
  - Book a Tour
  - This is an Authenticated User Endpoint, so the JWT access token is required
- Request body:
  - In the sample request
- Returns:
  - Return a unique Tour Tracking Number
- Sample request:

  ```json
  curl POST http://localhost:8080/secure/book-tour \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer <JWT_OF_AUTHENTICATED_USER>" \
            -d '{
  "userId": 15,
  "tourId": 1,
  "numberOfPeople": 2,
  "totalPrice": 1500.00,
  "tourStartDate": "2024-12-01"
  }
  '
  ```

- Sample response:

  ```json
  {
    "tourBookingTrackingNumber": "322e5fc8-3328-4788-a5c6-e4337992e652"
  }
  ```

4. DELETE /secure/tour-bookings/{id}

- General:
  - Delete a booked tour
  - This is an Endpoint for both Admin and Authenticated User, so the JWT access token is required
- Path argument:
  - id: integer
- Returns:
  - Return the id of the deleted Tour Booking
- Sample request:

  ```json
  curl DELETE http://localhost:8080/secure/tour-bookings/1 \
            -H "Authorization: Bearer <JWT_OF_ADMIN_OR_AUTHENTICATED_USER>" \
  ```

- Sample response:

  ```json
  {
    "deletedId": 1
  }
  ```

#### Payment

1. POST /secure/payment-intent

- General:
  - Create a Stripe Payment Intent
  - This is an Authenticated User Endpoint, so the JWT access token is required
- Request body:
  - In the sample request
- Returns:
  - Return a String representation of Stripe Payment Intent
- Sample request:

  ```json
  curl POST http://localhost:8080/secure/payment-intent \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer <JWT_OF_AUTHENTICATED_USER>" \
            -d '{
  "amount": 1000,
  "currency": "USD",
  "receiptEmail": "customer@example.com"
  }
  '
  ```

- Sample response:

  ```json
  {
    "client_secret": "pi_1J2e5fc8-3328-4788-a5c6-e4337992e652"
  }
  ```

## Deployment

- The Backend of the app has been deployed on Render. You can access it by clicking on this link: `https://travel-advisor-duio.onrender.com/`

## Author:

Quan Tran

## Acknowledgements

- Thanks Dr. Tran Hong Ngoc, and Msc. Le Duc Loc for your dedicated, and fantastic support, and guidance
