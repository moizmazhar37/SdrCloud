import React from "react";
import styles from "./InputField.module.scss";

const InputField = ({
  value,
  onChange,
  placeholder,
  className,
  type = "text",
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${styles.input} ${className || ""}`}
      {...props}
    />
  );
};

export default InputField;
