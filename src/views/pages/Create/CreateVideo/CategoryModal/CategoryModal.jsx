import React, { useState } from "react";
import styles from "./CategoryModal.module.scss";
import { useAddCateogry } from "../hooks/useAddCategory"; // Make sure the path is correct

const CategoryModal = ({ isOpen, onClose, onAdd }) => {
  const [category, setCategory] = useState("");
  const { addCategory, loading } = useAddCateogry(); // Use the hook here

  const handleAdd = async () => {
    if (category.trim()) {
      const payload = { category_name: category };
      try {
        await addCategory(payload); // Call the hook to add category
        onAdd(category); // Optional: Notify the parent component if needed
        setCategory("");
        onClose(); // Close the modal after successful addition
      } catch (err) {
        // Handle any errors here, if necessary
      }
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
          <button
            className={styles.addButton}
            onClick={handleAdd}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
