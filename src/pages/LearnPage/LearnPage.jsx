import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import styles from "./LearnPage.module.css";
import { fetchCoffee } from "../../API/CoffeeApi";
import { fetchTea } from "../../API/TeaApi";
import { fetchReivews } from "../../API/ReviewApi";
import { addReview } from "../../API/ReviewApi";
import { getSession } from "../../utilities/session";
import AddReviewForm from "../../Components/AddReviewForm/AddReviewForm";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import DetailCard from "../../Components/DetailCard/DetailCard";

const LearnMorePage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [items, setItems] = useState(null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    console.log("Product ID:", id); 
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = null;
        if (pathname.includes("/coffee")) {
          data = await fetchCoffee(id);
        } else if (pathname.includes("/tea")) {
          data = await fetchTea(id);
        }

        if(await getSession() !== null) {
          const data = await getSession();
          if(data.user.fullName !== null) {
            setUserName(data.user.fullName);
          } else {
            setUserName("GUEST USER");
          }
        } else {
          setUserName("GUEST USER");
        }
        let valReviews = await fetchReivews(id);
        setReviews(valReviews);
        setItems(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching item data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [id, pathname]);

  const addReviewHandler = async(review) => {
    const newReview = {
      ...review,
      itemId: id,
      reviewer: userName,
    };

    await addReview(newReview);

    const reviewList = [newReview, ...reviews];

    setReviews(reviewList);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!items) {
    return <div>Loading...</div>;
  }

  console.log("Product:", items);

  return (
    <div
      className={`${styles.page} ${
        pathname.startsWith("/tea") ? styles.tea : ""
      }`}
    >
      <NavBar />
      <div>
        <DetailCard
          item={items}
          key={items.id}
          isTea={pathname.startsWith("/tea")}
        />
      </div>

      <h2 className={styles.heading}>Product Reviews</h2>
      <section className={styles.reviewsSection}>
        <AddReviewForm onAddReview={addReviewHandler} itemId={id} reviewer={userName}/>
        <ul className={styles.list}>  
          {reviews.map((review, i) => (
            <li key={i}>
              <ReviewCard
                itemReview={review}
              />
            </li>
          ))}
        </ul>
      </section>

      <NavLink to={pathname.startsWith("/tea") ? "/tea" : "/coffee"} className={styles.backButton}>
        {pathname.startsWith("/tea") ? "Back to Tea" : "Back to Coffee"}
      </NavLink>
    </div>
  );
};

export default LearnMorePage;
