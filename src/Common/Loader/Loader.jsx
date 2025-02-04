import React from "react";
import styles from "./Loader.module.scss";

const Loader = ({ size = 150 }) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  const imageSize = Math.round(size * 0.75); // 50% of container size
  const imageStyle = {
    width: `${imageSize}px`,
    height: `${imageSize}px`,
  };

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader} style={containerStyle}>
        <div className={styles.loaderRing}></div>
        <div className={`${styles.loaderRing} ${styles.reverseRing}`}></div>
        <img
          src="images/template/SDR.png"
          alt="SDR"
          className={styles.loaderImage}
          style={imageStyle}
        />
      </div>
    </div>
  );
};

export default Loader;
