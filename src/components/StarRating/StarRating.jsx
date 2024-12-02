import styles from "./StarRating.module.css";

const StarRating = ({ rating, totalStars = 5 }) => {
  const getStarType = (index) => {
    if (rating >= index + 1) return "full"; // Повна зірка
    if (rating > index && rating < index + 1) return "half"; // Половина зірки
    return "empty"; // Порожня зірка
  };

  return (
    <div className={styles.starRating}>
      {[...Array(totalStars)].map((_, index) => (
        <Star key={index} type={getStarType(index)} />
      ))}
    </div>
  );
};

const Star = ({ type }) => (
  <span
    className={`${styles.star} ${
      type === "full" ? styles.filled : type === "half" ? styles.half : ""
    }`}
  >
    ★
  </span>
);

export default StarRating;
