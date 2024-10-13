# Travel Advisor Application

- This is the fantastic Travel Advisor application, where users can discover and book captivating tours across Vietnam. Also, they can view Top Travel Destinations, Restaurants to try out local cuisine, the essence of Vietnam's rich cultural tapestry, and breathtaking landscapes. This application ensures a comprehensive and engaging user experience, catering to the discerning traveler seeking both convenience and authenticity. User can write Review, give Rating to their favorite places, and book tours and pay with credit card seamlessly, view Attractions, Tours by Category, search for their favorite places, filter the Restaurants by criteria, and view the details of the place, manage their Profile, and view their Booking History, receive real-time notifications from Admin, and get recommendations of nearby Attractions from their current location in real-time

- The application also has Views for Admin, where Admin can manage all the Tours, Places, Reviews, and Users. Admin can also add/update/delete Category, Subcategory, manage Users, Tours, Places, manage existing ones, and send Notifications/Announcements to all Users in real-time, and delete existing Notifications. Also, Admin can also see a beautiful Dashboard, which is updated every 1 minute, showing the key indicators of the Tour Booking to help Admin make informed decisions.

- The application utilizes Redis as an in-memory data store. Redis is used for caching frequently accessed data, such as popular attractions, restaurants, categories,... which significantly speeds up response time and reduces the load on the primary database. This ensures a smoother experience for users while allowing for real-time data processing and notifications.

- The Application is built with:

  - Frontend: React, with raw HTML, and CSS
  - Backend: Java Spring Boot
  - Deploy: Render, AWS
  - Other techstack: Axios, Vite, React Router, MapBox gl, React-Slick, React-Toastify, Chart.js, react-chartjs-2, WebSocket, stompjs, sockjs-client, Redis, font-awesome, Auth0 for Authentication/Authorization, and Stripe for payment processing

- For more details about Frontend, please refer to [Frontend_README.md](Frontend/Frontend_README.md).

- For more details about Backend, please refer to [Backend_README.md](Backend/Backend_README.md).

  - The Fullstack Application has been deployed on Render, and AWS. To access, use the following URL:
    - Render: https://travel-advisor-62it.onrender.com/
    - AWS: https://dymgvl500pqso.cloudfront.net/
  - The Backend has been deployed on Render, and AWS. To access, use the following URL:
    - Render: https://travel-advisor-duio.onrender.com/
    - AWS EKS: http://a907a159697b04d46a72125a9f224ece-191732125.us-east-2.elb.amazonaws.com:8080/

**Notice that: because the App's Backend is deployed on Render, the first time you access the App, it may take a few seconds to wake up the Backend server.**

**Tip: you can try: https://travel-advisor-duio.onrender.com/tours on the browser until it sends the response on the Browser to wake up the Backend server, before you access the Website**

Since the app requires Authentication, these are the accounts (username, password) for logging in, as for different Role:

**Authenticated User (this is already a User in Backend database):**

- username: tohixew898@nimadir.com
- password: Guitarbadon1

**Authenticated User (this is for new User that does not exist in Backend database, so you can register as a new User):**

- username: lomav42443@ikumaru.com
- password: Guitarbadon1

**Admin:**

- username: wobigeg207@glaslack.com
- password: Guitarbadon1

## Author:

Quan Tran

## Acknowledgements:

- Thanks Dr. Tran Hong Ngoc, and Msc. Le Duc Loc for their dedicated, fantastic support, and guidance
