import React from "react";
import "./footer.css";
import { AiOutlineInstagram } from "react-icons/ai";
import { IoLogoTwitter } from "react-icons/io";
import { AiFillLinkedin } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="footer__container">
        <div className="columns__container">
          <div className="footer-cols">
            <div className="logo2">
              <img src="/assets/print-favicon-free-img.png" alt="logo" />
            </div>
            <h4>Custom Print Store</h4>
            <div className="social-media">
              <Link to={'https://www.instagram.com/'} target="_blank"><i>
                <AiOutlineInstagram />
              </i></Link>
              <Link to={'https://twitter.com/'} target="_blank"><i>
                <IoLogoTwitter />
              </i></Link>
              <Link to={'https://www.linkedin.com/'} target="_blank"><i>
                <AiFillLinkedin />
              </i></Link>
              <Link to={'https://www.facebook.com/'} target="_blank"><i>
                <FaFacebookSquare />
              </i></Link>
            </div>
          </div>
          <div className="footer-cols">
            <h4>
              Get in Touch with Us for the Best Quality Custom Prints &
              Supplies.
            </h4>
            <p>
              Qui dolore ipsum quia dolor sit amet, consec tetur adipisci velit,
              sed quia non numquam eius modi tempora incidunt lores ta porro
              ame.
            </p>
          </div>
          <div className="footer-cols">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link>Know More About Us</Link>
              </li>
              <li>
                <Link>Visit Store</Link>
              </li>
              <li>
                <Link>Let's Connect</Link>
              </li>
            </ul>
          </div>
          <div className="footer-cols">
            <h4>Important Links</h4>
            <ul>
              <li>
                <Link>Privacy Policy</Link>
              </li>
              <li>
                <Link>Shipping Details</Link>
              </li>
              <li>
                <Link>Terms & Conditions</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        <span>Copyright &copy; 2023 | Custom Printing</span>
        <span>Powered By Custom Printing</span>
      </div>
    </footer>
  );
};

export default Footer;
