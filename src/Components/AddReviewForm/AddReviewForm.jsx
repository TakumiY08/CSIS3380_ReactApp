import { useRef } from "react";
import styles from "./AddReviewForm.module.css";

const AddReviewForm = (props) => {
  const rateRef = useRef();
  const commentRef = useRef();

  const submitReviewHandler = (event) => {
    event.preventDefault();
    const rate = +rateRef.current.value;
    const comment = commentRef.current.value.trim();

    if (!rate || !comment) {
      return;
    }

    props.onAddReview({
      rate,
      comment,
      date: new Date(Date.now()),
    });
  };

  return (
    <form className={styles.form}>
      <h3 className={styles.heading}>Let us know what you think!</h3>
      <div className={styles.rateContainer}>
        <label for="review" className={styles.label}>
          Rate the product from 1 to 10
        </label>
        <input
          min={1}
          max={10}
          type="number"
          ref={rateRef}
          className={styles.inputRate}
        />
      </div>

      <textarea
        placeholder="Enter your comment here"
        className={styles.inputComment}
        ref={commentRef}
      />

      <button
        className={styles.button}
        type="button"
        onClick={submitReviewHandler}
      >
        Submit
      </button>
    </form>
  );
};

export default AddReviewForm;
