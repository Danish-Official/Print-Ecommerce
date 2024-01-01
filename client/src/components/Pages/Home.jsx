import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import "../../Styles/home.css";
import RedButton from "../Button";
import ElementDivider from "../ElementDivider";
import StarRating from "../StarRating";
import ProductCard from "../ProductCard";
import { LiaStarSolid } from "react-icons/lia";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [mostLovedProducts, setMostLovedProducts] = useState([]);
  const [ourFeaturedProducts, setOurFeaturedProducts] = useState([]);

  const productsHandler = async () => {
    try {
      const response = await axios.get(
        `/api/v1/product/get-products/'Default sorting'`
      );
      if (response.status === 200) {
        const lovedProducts = response.data.Products.filter(
          (item) => item.mostLoved
        );
        setMostLovedProducts(lovedProducts);
        const featuredProducts = response.data.Products.filter(
          (item) => item.featured
        );
        setOurFeaturedProducts(featuredProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    productsHandler();
  }, []);
  return (
    <Layout>
      <section className="home__banner">
        <div className="banner__container">
          <div className="textSide">
            <ElementDivider />
            <h5>best quality products</h5>
            <h1>we print what you want!</h1>
            <p>
              Click edit button to change this text. Lorem ipsum dolor sit amet,
              consetetur adipiscing elit. Sapien.
            </p>
            <RedButton text="get started" />
          </div>
          <div className="imageSide">
            <img src="/assets/image26-free.png" alt="banner-model" />
          </div>
        </div>
      </section>
      <section className="home__categories">
      <div className="categories__container">
          <div className="most-loved">
            <div>
              <img src="assets/categories1.jpg" alt="" />
            </div>
            <p>most loved designs</p>
            <h5>Customize your t-shirts</h5>
          </div>
          <div className="design-week">
            <p>Design of the week</p>
            <h5>rubber print your t-shirt</h5>
            <div>
              <img src="assets/categories2.jpg" alt="" />
            </div>
          </div>
          <div className="customize-colors">
            <div>
              <img src="assets/categories3.jpg" alt="" />
            </div>
            <p>new t-shirt edition</p>
            <h5>customize plain colors</h5>
          </div>
        </div>
      </section>
      <section className="home__featuredProducts">
        <div className="featuredProducts__container">
          <h3>our featured products</h3>
          <ElementDivider />
          <div className="cups-cards">
            {ourFeaturedProducts?.map((p) => (
              <Link to={`/product/${p._id}`} key={p._id}>
                <ProductCard
                  pid={p._id}
                  cid={p.cid}
                  productName={p.name}
                  price={p.price}
                  discountedPrice={p.discountedPrice}
                  sale={p.sale}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="home__deal">
        <div className="background-banner">
          <div>
            <div className="text-overlay">
              <h3>
                hurry up! <br />
                deal of the day!
              </h3>
              <h5>buy this t-shirt at 20% discount, use code off20</h5>
              <RedButton text={"shop now"} />
            </div>
          </div>
        </div>
      </section>
      <section className="home__mostLoved">
        <div className="most-loved-products">
          <h3>most loved products</h3>
          <ElementDivider />
          <div className="shirts-cards">
          {mostLovedProducts?.map((p) => (
              <Link to={`/product/${p._id}`} key={p._id}>
                <ProductCard
                  pid={p._id}
                  cid={p.cid}
                  productName={p.name}
                  price={p.price}
                  discountedPrice={p.discountedPrice}
                  sale={p.sale}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <img
        src="assets/graphic05-free-img.png"
        style={{ width: "98vw", margin: "2rem 0" }}
      />

      <section className="home__clients">
        <h3>our happy clients!</h3>
        <ElementDivider />
        <div className="clients__container">
          <div className="clientsCards__container">
            <div className="clientCard">
              <p>
                "Lectus, nonummy et. Occaecat delectus erat, minima dapibus
                ornare nunc, autem."
              </p>
              <div className="ratedStars">
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
              </div>
              <div className="clientProfile">
                <div className="clientPic">
                  <img src="assets/client1.jpg" alt="" />
                </div>
                <div className="clientName">diana burnwood</div>
              </div>
            </div>
            <div className="clientCard">
              <p>
                "Lectus, nonummy et. Occaecat delectus erat, minima dapibus
                ornare nunc, autem."
              </p>
              <div className="ratedStars">
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
              </div>
              <div className="clientProfile">
                <div className="clientPic">
                  <img src="assets/client2.png" alt="" />
                </div>
                <div className="clientName">jessica foxx</div>
              </div>
            </div>
            <div className="clientCard">
              <p>
                "Lectus, nonummy et. Occaecat delectus erat, minima dapibus
                ornare nunc, autem."
              </p>
              <div className="ratedStars">
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
                <i>
                  <LiaStarSolid />
                </i>
              </div>
              <div className="clientProfile">
                <div className="clientPic">
                  <img src="assets/client3.png" alt="" />
                </div>
                <div className="clientName">lily granger</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home__featuredBrands">
        <div className="featuredBrands__container">
          <h5>featured in:</h5>
          <div className="featuredBrands">
            <div className="brand">
              <img src="assets/logo1.png" alt="" />
            </div>
            <div className="brand">
              <img src="assets/logo2.png" alt="" />
            </div>
            <div className="brand">
              <img src="assets/logo3.png" alt="" />
            </div>
            <div className="brand">
              <img src="assets/logo4.png" alt="" />
            </div>
            <div className="brand">
              <img src="assets/logo5.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
