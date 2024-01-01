import React from "react";
import Layout from "../Layout/Layout";
import { FaMap, FaEnvelope, FaPhone } from "react-icons/fa";
import "../../Styles/contact.css";
import ElementDivider from '../ElementDivider';

const Contact = () => {
  return (
    <Layout>
      <div className="container">
        <div className="contact__container">
          <div className="details">
            <h1>Say Hello.</h1>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <ElementDivider/>
            <div className="contact-address">
              <div>
                <i>
                  <FaMap size={'1.2rem'}/>
                </i>
                212 7th St SE, Washington, DC 20003, USA
              </div>
              <div>
                <i>
                  <FaEnvelope size={'1.2rem'}/>
                </i>
                info@example.com
              </div>
              <div>
                <i>
                  <FaPhone size={'1.2rem'}/>
                </i>
                123-456-7890/91
              </div>
            </div>
          </div>
          <div className="queries">
            <form>
              <h2>Ask your queries</h2>
              <input type="email" placeholder="Your Email"/>
              <input type="text" placeholder="Subject"/>
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="Message"
              ></textarea>
              <button className="sendmssg">Send message</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
