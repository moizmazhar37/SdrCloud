import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./card.module.scss";
import InfoBox from "../InfoBox/InfoBox";

const Card = ({ image, text, route, onClick, infoText }) => {
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
      {infoText && (
        <div className={styles.infoBox}>
          <InfoBox text={infoText} />
        </div>
      )}
      <div className={styles.iconContainer}>
        <img src={image} alt={text} className={styles.icon} />
      </div>
      <div className={styles.text}>{text}</div>
    </div>
  );
};

export default Card;
