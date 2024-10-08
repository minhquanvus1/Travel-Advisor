import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="about-links">
        <div className="about-links-title">About Travel Advisor</div>
        <div className="about-links-contents">
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Resources and Policies</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Investors Relations</a>
            </li>
            <li>
              <a href="#">Trust & Safety</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">Accessibility Statement</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="explore-links">
        <div className="explore-links-title">Explore</div>
        <div className="explore-links-contents">
          <ul>
            <li>
              <a href="#">Write a review</a>
            </li>
            <li>
              <a href="#">Add a place</a>
            </li>
            <li>
              <a href="#">Join</a>
            </li>
            <li>
              <a href="#">Travelers' Choice</a>
            </li>
            <li>
              <a href="#">Green Leaders</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">Travel Articles</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="do-business-links-container">
        <div className="do-business-links">
          <div className="do-business-links-title">Do Business With Us</div>
          <div className="do-business-links-contents">
            <ul>
              <li>
                <a href="#">Owners</a>
              </li>
              <li>
                <a href="#">Business Advantage</a>
              </li>
              <li>
                <a href="#">Sponsored Placement</a>
              </li>
              <li>
                <a href="#">Advertised with Us</a>
              </li>
              <li>
                <a href="#">Access our Content API</a>
              </li>
              <li>
                <a href="#">Become an Affiliate</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="get-the-app-links">
          <div className="get-the-app-links-title">Get The App</div>
          <div className="get-the-app-links-contents">
            <ul>
              <li>
                <a href="#">iPhone App</a>
              </li>
              <li>
                <a href="#">Android App</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="partners-links">
        <div className="partners-links-title">Travel Advisor Sites</div>
        <div className="partners-links-contents">
          <ul>
            <li>
              <a href="#">Discover your dream destination with Jetsetter</a>
            </li>
            <li>
              <a href="#">Book the best restaurants with TheFork</a>
            </li>
            <li>
              <a href="#">Book tours and attraction tickets on Viator</a>
            </li>
            <li>
              <a href="#">Read cruise reviews on Cruise Critic</a>
            </li>
            <li>
              <a href="#">Get airline seating charts on Seat Guru</a>
            </li>
            <li>
              <a href="#">Find vacation rentals on FlipKey</a>
            </li>
            <li>
              <a href="#">Search for holiday rentals on Holiday Lettings</a>
            </li>
            <li>
              <a href="#">
                Plan and book your next trip with Reco Trip Designers
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="legals">
        <div className="legals-top">
          <div className="legals-top-image-container">
            <img src={assets.small_logo} alt="travel advisor logo" />
          </div>
          <div className="legals-top-contents">
            <div
              style={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#333",
                marginTop: "4px",
              }}
            >
              © {new Date().getFullYear()} Travel Advisor LLC All rights
              reserved.
            </div>
            <div className="legals-item-list">
              <span className="legals-item">
                <a href="#">Terms of Use</a>
              </span>
              <span className="legals-item">
                <a href="#">Privacy and Cookies Statement</a>
              </span>
              <span className="legals-item">
                <a href="#">Cookies consent</a>
              </span>
              <span className="legals-item">
                <a href="#">Site Map</a>
              </span>
              <span className="legals-item">
                <a href="#">How the site works</a>
              </span>
              <span className="legals-item">
                <a href="#">Contact us</a>
              </span>
            </div>
          </div>
        </div>
        <div
          className="legals-bottom"
          style={{ fontSize: "12px", fontWeight: "400", color: "#333" }}
        >
          This is the version of our website addressed to speakers of English in
          the United States. If you are a resident of another country or region,
          please select the appropriate version of Travel Advisor for your
          country or region in the drop-down menu
        </div>
      </div>
      <div className="socials">
        <a href="#">
          <svg viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.093 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.563V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
          </svg>
        </a>
        <a href="#">
          <svg viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M13.905 10.47L21.35 2h-1.764L13.12 9.353 7.956 2H2l7.809 11.12L2 22h1.764l6.827-7.766L16.044 22H22M4.4 3.302h2.71l12.476 17.46h-2.71"></path>
          </svg>
        </a>
        <a href="#">
          <svg viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M12.008 2C6.481 2 2 6.474 2 11.992c0 4.235 2.636 7.853 6.36 9.309-.091-.79-.166-2.007.032-2.87.181-.781 1.17-4.967 1.17-4.967s-.297-.6-.297-1.48c0-1.39.807-2.426 1.812-2.426.857 0 1.269.641 1.269 1.406 0 .855-.544 2.138-.832 3.33-.239.995.503 1.81 1.483 1.81 1.779 0 3.146-1.875 3.146-4.573 0-2.393-1.721-4.062-4.184-4.062-2.85 0-4.522 2.13-4.522 4.334 0 .855.329 1.776.74 2.278.083.098.092.189.067.287-.074.313-.247.995-.28 1.135-.041.181-.149.222-.338.132-1.252-.584-2.035-2.401-2.035-3.873 0-3.15 2.29-6.045 6.615-6.045 3.468 0 6.17 2.467 6.17 5.773 0 3.446-2.175 6.217-5.19 6.217-1.013 0-1.969-.526-2.29-1.151l-.626 2.377c-.222.871-.832 1.957-1.244 2.623.94.288 1.928.444 2.966.444C17.519 22 22 17.526 22 12.008 22.016 6.474 17.535 2 12.008 2z"></path>
          </svg>
        </a>
        <a href="#">
          <svg viewBox="0 0 24 24" width="24px" height="24px">
            <path d="M12 3.803c2.67 0 2.986.01 4.04.059.976.044 1.505.207 1.858.344.435.16.828.416 1.151.748.332.323.588.716.748 1.151.137.353.3.882.344 1.857.049 1.055.059 1.37.059 4.041 0 2.67-.01 2.986-.059 4.041-.044.975-.207 1.505-.344 1.857A3.316 3.316 0 0117.9 19.8c-.352.137-.882.3-1.857.344-1.054.048-1.37.058-4.04.058s-2.987-.01-4.041-.058c-.975-.044-1.505-.207-1.857-.344a3.095 3.095 0 01-1.151-.748 3.095 3.095 0 01-.749-1.151c-.137-.353-.3-.883-.344-1.857-.048-1.055-.058-1.371-.058-4.041 0-2.67.01-2.987.058-4.041.045-.975.207-1.505.344-1.857.16-.435.416-.829.749-1.151a3.096 3.096 0 011.15-.749c.353-.137.883-.3 1.858-.344 1.054-.048 1.37-.058 4.04-.058L12 3.803zM12.002 2c-2.716 0-3.057.012-4.124.06-1.066.05-1.793.22-2.428.466A4.91 4.91 0 003.678 3.68a4.91 4.91 0 00-1.153 1.772c-.247.635-.416 1.363-.465 2.427C2.012 8.943 2 9.286 2 12.002c0 2.715.012 3.056.06 4.123.05 1.066.218 1.791.465 2.426a4.91 4.91 0 001.153 1.772c.5.508 1.105.902 1.772 1.153.635.248 1.363.417 2.428.465 1.064.049 1.407.06 4.123.06s3.056-.01 4.123-.06c1.067-.049 1.79-.217 2.426-.465a5.111 5.111 0 002.925-2.925c.247-.635.416-1.363.465-2.427.048-1.064.06-1.407.06-4.123s-.012-3.057-.06-4.123c-.05-1.067-.218-1.791-.465-2.426a4.903 4.903 0 00-1.153-1.771 4.91 4.91 0 00-1.772-1.155c-.635-.247-1.364-.416-2.428-.464-1.064-.048-1.406-.06-4.122-.06L12.002 2z"></path>
            <path d="M12 6.866a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.47a3.334 3.334 0 110-6.669 3.334 3.334 0 010 6.669zM17.338 7.863a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Footer;
