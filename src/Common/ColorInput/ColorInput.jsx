import React, { useState, useRef } from "react";
import { Pen } from "lucide-react";
import styles from "./ColorInput.module.scss";

const ColorInput = ({ value, onChange }) => {
  const pickerRef = useRef(null);

  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  const handlePickerClick = () => {
    pickerRef.current?.click();
  };

  const handleColorChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        {value && (
          <div
            className={styles.colorPreview}
            style={{ backgroundColor: value }}
          />
        )}
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Choose Color"
          className={`${styles.input} ${value ? styles.hasValue : ""}`}
        />
        <button className={styles.penButton} onClick={handlePickerClick}>
          <Pen size={16} />
        </button>
      </div>
      <input
        ref={pickerRef}
        type="color"
        value={value || "#000000"}
        onChange={handleColorChange}
        className={styles.hiddenPicker}
      />
    </div>
  );
};

export default ColorInput;
