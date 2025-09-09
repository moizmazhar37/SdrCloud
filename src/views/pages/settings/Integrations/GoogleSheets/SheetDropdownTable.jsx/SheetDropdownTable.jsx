import React, { useState } from "react";
import styles from "./SheetDropdownTable.module.scss";

const SheetDropdownTable = ({
  title,
  SheetDropdownComponent,
  dropdownProps = {},
  edit = true,
}) => {
  const [isEditable, setIsEditable] = useState(edit);

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button className={styles.editButton} onClick={handleEditToggle}>
          {isEditable ? "Save" : "Edit"}
        </button>
      </div>

      <div className={styles.content}>
        <SheetDropdownComponent {...dropdownProps} disabled={!isEditable} />
      </div>
    </div>
  );
};

export default SheetDropdownTable;
