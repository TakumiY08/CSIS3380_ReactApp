import React, { useEffect, useState } from "react";
import styles from "./Homepage.module.css";
import { fetchCoffees } from "../../API/CoffeeApi";
import CoffeeCard from "../../Components/CoffeeCard/CoffeeCard";
import Header from "../../Components/Header/Header";

const Homepage = () => {
  const [featuredItems, setFeaturedItems] = useState(null);

  useEffect(() => {
    fetchCoffees().then((data) => setFeaturedItems(data.slice(0, 5))); // Fetching first 5 coffees
  }, []);

  return (
    <>
      <Header />
      <div className={styles.homepage}>
        <section className={styles.sectionFeaturedItems}>
          <h1 className={styles.title}>Featured Items</h1>

          <ul className={styles.list}>
            {featuredItems &&
              featuredItems.map((coffee) => (
                <li className={styles.item}>
                  <CoffeeCard isGradient={true} item={coffee} key={coffee.id} />
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default Homepage;
