import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./Header.module.css";
import { useState, useEffect } from "react";
import { fetchCoffees } from "../../API/CoffeeApi";
import CoffeeCard from "../CoffeeCard/CoffeeCard";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    fetchCoffees().then((data) => setCoffees(data.slice(0, 3)));
  }, []);

  return (
    <header>
      <NavBar />
      <section className={styles.sectionNewProducts}>
        <div className={styles.description}>
          Explore our new products
          <NavLink to={"/coffee"} className={styles.button}>
            <button>Shop Now</button>
          </NavLink>
        </div>

        <ul className={styles.list}>
          {coffees.map((coffee) => (
            <li className={styles.item}>
              <CoffeeCard item={coffee} key={coffee.id} />
            </li>
          ))}
        </ul>
      </section>
    </header>
  );
};

export default Header;
