import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import ElementDivider from '../ElementDivider';
import {
  FaGratipay,
  FaSnowflake,
  FaCodepen,
  FaRegHandPaper,
  FaGg,
} from "react-icons/fa";
import { BiSolidChevronRight } from "react-icons/bi";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import "../../Styles/about.css";
import RedButton from "../Button";

const About = () => {
  const [activeItem, setActiveItem] = useState(null);

  const handleClick = (index) => { //null is for closing and index is for changing and opening
    setActiveItem(index === activeItem ? null : index);
  };

  const accordians = [
    {
      title: "we can custom design your ideas",
      description:
        "Click1 edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus necullamcorper mattis, pulvinar dapibus leo.",
    },
    {
      title: "your payment is safe and secured",
      description:
        "Click2 edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
    {
      title: "we offer discounts and coupons",
      description:
        "Click3 edit button to change this text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    },
  ];
  return (
    <Layout>
      <section className="about_sections" id="about__section1">
        <div>
          <h1>About Us</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
      </section>
      <section className="about_sections" id="about__section2">
        <div>
          <div className="favourite">
            <h2>We are your favourite, online store.</h2>
            <p>
              Dui habitasse provident eu etiam praesent placeat maiores
              temporibus, accumsan parturient autem, mi animi ipsa. Lobortis
              maxime quos, pellentesq.
              <br />
              Ee platea animi commodo tincidunt ridiculus tempora, ornare lorem
              quam sit possimus? Quam cras facilisi officia fusce. Ac, excepteur
              excepteur fusce? Sunt minim expedita magnis!
            </p>
          </div>
          <div className="task">
            <div>
              <i>
                <FaSnowflake size={"1.7rem"} />
              </i>
              <h4>Eros imperdie</h4>
              <p>
                We'll generate a sitemap for your site, submit it to search
                engine is and track.
              </p>
            </div>
            <div>
              <i>
                <FaCodepen size={"1.7rem"} />
              </i>
              <h4>Proident congu</h4>
              <p>
                We'll generate a sitemap for your site, submit it to search
                engine is and track.
              </p>
            </div>
            <div>
              <i>
                <FaRegHandPaper size={"1.7rem"} />
              </i>
              <h4>Rerum rutrum</h4>
              <p>
                We'll generate a sitemap for your site, submit it to search
                engine is and track.
              </p>
            </div>
            <div>
              <i>
                <FaGg size={"1.7rem"} />
              </i>
              <h4>vero maecenas</h4>
              <p>
                We'll generate a sitemap for your site, submit it to search
                engine is and track.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="about_sections" id="about__section3">
        <div className="best-offers">
          <h2>Get best offers on customized designs!</h2>
          <RedButton text='get started'/>
        </div>
      </section>
      <section className="about_sections" id="about__section4">
        <div>
          <h2>meet our creative team</h2>
          <ElementDivider/>
          <div className="team-members">
            <div className="team-member">
              <img src="/assets/image-14.jpg" alt="member1" />
              <h4>Amanda Lee</h4>
              <p>Creative Head</p>
            </div>
            <div className="team-member">
              <img src="/assets/team-0.jpg" alt="member2" />
              <h4>Lee stoner</h4>
              <p>Marketing Head</p>
            </div>
            <div className="team-member">
              <img src="/assets/team-01.jpg" alt="member3" />
              <h4>monica gala</h4>
              <p>Graphic Designer</p>
            </div>
          </div>
        </div>
      </section>
      <img src="assets/graphic05-free-img.png" style={{ width: "98vw" }} />
      <section className="about_sections" id="about__section5">
        <div>
          <div className="items">
            <h3>best quality printed t-shirts & mugs at affordable price!</h3>
            <div className="gifts">
              <ul>
                <li>
                  <i>
                    <FaGratipay />
                  </i>
                  Personal Gifts
                </li>
                <li>
                  <i>
                    <FaGratipay />
                  </i>
                  occasional gifts
                </li>
                <li>
                  <i>
                    <FaGratipay />
                  </i>
                  corporate gifts
                </li>
              </ul>
              <ul>
                <li>
                  <i>
                    <FaGratipay />
                  </i>
                  Couple Tshirt
                </li>
                <li>
                  <i>
                    <FaGratipay />
                  </i>
                  wedding package
                </li>
                <li>
                  <i>
                    <FaGratipay />
                  </i>
                  corporate gifts
                </li>
              </ul>
            </div>
          </div>
          <div className="accordions">
            {accordians.map(({ title, description }, index) => {
              return (
                <div className="accordion" key={index}>
                  <span
                    onClick={() => handleClick(index)}
                    style={{ color: activeItem === index ? "red" : "#415161"}}
                  >
                    <i>
                    {activeItem === index ? <AiFillCaretDown/> : <AiFillCaretRight />}
                    </i>
                    {title}
                  </span>
                  <div className={activeItem === index && "open"}>
                    <p>{description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section
        className="about_sections"
        id="about__section6"
      >
        <div className="features">
          <div className="feature">
            <img src="/assets/shipping.png" alt="shipping" />
            <h4>worldwide shipping</h4>
            <p>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div className="feature">
            <img src="/assets/badge.png" alt="badge" />
            <h4>best quality</h4>
            <p>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div className="feature">
            <img src="/assets/discount.png" alt="discount" />
            <h4>best offers</h4>
            <p>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
          <div className="feature">
            <img src="/assets/lock.png" alt="lock" />
            <h4>secure payments</h4>
            <p>It elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
