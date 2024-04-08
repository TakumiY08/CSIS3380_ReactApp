import { CiSearch } from "react-icons/ci";
import styles from "./SearchBar.module.css";
import { useRef, useEffect } from "react";

const SearchBar = (props) => {
  const itemRef = useRef();

  useEffect(() => {
    const handleKeyUp = (event) => {
      const item = itemRef.current.value.trim();
      props.onSearchItem(item);
    };

    const input = itemRef.current;
    input.addEventListener("keyup", handleKeyUp);

    return () => input.removeEventListener("keyup", handleKeyUp);
  }, []);

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Enter the item..."
        className={styles.input}
        ref={itemRef}
      />
      <CiSearch className={styles.icon} />
    </div>
  );
};

export default SearchBar;
