import React from "react";
import styles from "./Loader.module.scss";

const Loader = ({ size = 150 }) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  const imageSize = Math.round(size * 0.5);
  const imageStyle = {
    width: `${imageSize}px`,
    height: `${imageSize}px`,
  };

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} style={containerStyle}>
        {/* Clean animated rings */}
        <div className={styles.ring1}></div>
        <div className={styles.ring2}></div>
        <div className={styles.ring3}></div>
        
        {/* Elegant dots */}
        <div className={styles.dots}>
          <div className={styles.dot1}></div>
          <div className={styles.dot2}></div>
          <div className={styles.dot3}></div>
          <div className={styles.dot4}></div>
        </div>
        
        {/* Clean central image */}
        <div className={styles.imageContainer}>
          <img
            src="/images/template/SDR.png"
            alt="SDR"
            className={styles.loaderImage}
            style={imageStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
