import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { GiCoffeeBeans } from "react-icons/gi";
import { VscAccount } from "react-icons/vsc";
import { BsCart3 } from "react-icons/bs";

function NavBar() {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.container}>
        <GiCoffeeBeans className={styles.logo} />

        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink to="/" className={styles.link}>
              Home
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink to="/coffee" className={styles.link}>
              Coffee
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink to="/tea" className={styles.link}>
              Tea
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.title}>CoffeeShop</div>
      <div className={styles.controls}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink to="/account" className={styles.link}>
              <VscAccount className={styles.logo} /> Account
            </NavLink>
          </li>

          <li className={styles.item}>
            <NavLink to="/cart" className={styles.link}>
              <BsCart3 className={styles.logo} /> Cart
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
