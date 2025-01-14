import React, { useState } from "react";
import styles from "./CategoryModal.module.scss";

const CategoryModal = ({ isOpen, onClose, onAdd }) => {
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    if (category.trim()) {
      onAdd(category);
      setCategory("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <p>Add New Category</p>
        </div>
        <input
          type="text"
          placeholder="Enter Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.addButton} onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
