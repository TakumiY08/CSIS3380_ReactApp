import React from "react";
import styles from "./ReviewCard.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";

const ReviewCard = (props) => {
  const starsFilled = [];
  const starsEmpty = [];
  const review = props.itemReview;
  const name = review.reviewer;
  const comment = review.comment;
  const formattedDate = new Date(review.date).toISOString().split("T")[0];

  for(let i = 0; i < review.rate; i++){
    starsFilled.push(<FaStar key={i} className={styles.starFilled} />);
  }

  for (let i = 0; i < 10 - review.rate; i++) {
    starsEmpty.push(<FaRegStar key={i} className={styles.starEmpty} />);
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <span className={styles.user}>{name}</span> 
        <span className={styles.date}>{formattedDate}</span> 
        <ul className={styles.rate}>
          {starsFilled.map((starElement) => (
            <li key={starElement.key}>{starElement}</li>
          ))}
          {starsEmpty.map((starElement) => (
            <li key={starElement.key}>{starElement}</li>
          ))}
        </ul>
      </div>
      <p className={styles.comment}>{comment}</p>
    </div>
  );
};

export default ReviewCard;
