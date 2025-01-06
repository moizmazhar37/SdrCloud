import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./card.module.scss";

const Card = ({ image, text, route, onClick }) => {
  const history = useHistory();

  const handleCardClick = () => {
    if (onClick) {
      onClick(); 
    } else if (route) {
      history.push(route);
    }
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.iconContainer}>
        <img src={image} alt={text} className={styles.icon} />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default Card;
