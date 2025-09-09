import React, { useState, useRef, useEffect } from "react";
import image from "src/images/dataNotFound.png";
import styles from "./NoData.module.scss";
const NoData = () => {
  return (
    <div className={styles.NoDataContainer}>
      {" "}
      <div>
        <img src={image} />
      </div>{" "}
      <p className={styles.text}> No data Available </p>
    </div>
  );
};

export default NoData;
