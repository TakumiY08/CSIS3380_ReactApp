import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import styles from "./ProductPage.module.css";
import { fetchCoffees } from "../../API/CoffeeApi";
import { fetchTeas } from "../../API/TeaApi";
import NavBar from "../../Components/NavBar/NavBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Item from "../../Components/Item/Item";

const ProductPage = (props) => {
  const [items, setItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation(); 

  useEffect(() => {
    if (location.pathname.includes("/coffee")) {
      fetchCoffees().then((data) => {
        setItems(data);
        setFilteredItems(data); 
      });
    } else if (location.pathname.includes("/tea")) {
      fetchTeas().then((data) => {
        setItems(data);
        setFilteredItems(data); 
      });
    }
  }, [location.pathname]); 

  useEffect(() => {
    if (!items) return;
    const searchFilter = searchTerm.toLowerCase();
    const filteredData = items.filter((item) =>
      item.name.toLowerCase().includes(searchFilter)
    );
    setFilteredItems(filteredData);
  }, [searchTerm, items]);

  const searchItemHandler = (itemName) => {
    setSearchTerm(itemName);
  };

  const pageTitle = location.pathname.includes("/tea") ? "Explore Our Tea Products" : "Explore Our Coffee Products";

  return (
    <>
      <NavBar />
      <section className={styles.coffeeSection}>
        <h1 className={styles.title}>{pageTitle}</h1>
        <SearchBar onSearchItem={searchItemHandler} />
        <ul className={styles.list}>
          {filteredItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <Item
                item={item}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default ProductPage;
