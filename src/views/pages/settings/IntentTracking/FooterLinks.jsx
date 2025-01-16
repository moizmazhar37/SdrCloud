import React, { useState, useEffect } from "react";
import styles from "./footer-links.module.scss";
import { useAddFooter } from "./hooks/useAddFooter";
import useGetFooters from "./hooks/useGetFooter";
import useDeleteFooter from "./hooks/useDeleteFooter";
import useEditFooter from "./hooks/useEditFooter";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa"; 

const FooterLinks = () => {
  const { data: footers, loading: loadingFooters, error, refetch } = useGetFooters();
  const { addFooter, loading: addingFooter } = useAddFooter();
  const { deleteFooter, loading: deletingFooter } = useDeleteFooter(refetch);
  const { editFooter, loading: editingFooter } = useEditFooter(refetch);

  const [links, setLinks] = useState([]);
  const [editing, setEditing] = useState({});
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    if (footers) {
      setLinks(footers);
    }
  }, [footers]);

  const validateFields = (name, url) => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name cannot be empty";
    }
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)\.([a-z]{2,})([\/\w.-]*)*\/?$/;
    if (!urlPattern.test(url)) {
      errors.url = "Enter a valid URL";
    }
    setValidationError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const toggleEdit = (id) => {
    setEditing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSave = async (index) => {
    const { id, name, url, isNew } = links[index];
    if (!validateFields(name, url)) return;

    try {
      if (isNew) {
        await addFooter({ name, url });
      } else {
        await editFooter(id, { name, url });
      }
      toggleEdit(id);
      refetch();
    } catch (error) {
      console.error("Error saving footer link:", error);
    }
  };

  const handleAddNewLink = () => {
    setLinks((prev) => [
      ...prev,
      { id: Math.random().toString(), name: "", url: "", isNew: true },
    ]);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFooter(id);
    } catch (error) {
      console.error("Error deleting footer link:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.heading}>Footer Links</span>
      </div>
      <div className={styles.scrollable}>
        <div className={styles.content}>
          {loadingFooters && <p>Loading...</p>}
          {error && <p>Error loading footers: {error}</p>}
          {!loadingFooters &&
            links.map((link, index) => (
              <div key={link.id} className={styles.row}>
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Link Name</label>
                  <input
                    type="text"
                    placeholder="Enter Link Name"
                    className={`${styles.input} ${
                      validationError.name && !link.name ? styles.error : ""
                    }`}
                    value={link.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    disabled={!editing[link.id] && !link.isNew}
                  />
                  {validationError.name && !link.name && (
                    <span className={styles.errorMessage}>
                      {validationError.name}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label}>Link URL</label>
                  <input
                    type="url"
                    placeholder="Enter Link URL"
                    className={`${styles.input} ${
                      validationError.url && !link.url ? styles.error : ""
                    }`}
                    value={link.url}
                    onChange={(e) =>
                      handleInputChange(index, "url", e.target.value)
                    }
                    disabled={!editing[link.id] && !link.isNew}
                  />
                  {validationError.url && !link.url && (
                    <span className={styles.errorMessage}>
                      {validationError.url}
                    </span>
                  )}
                </div>

                <div className={styles.actions}>
                  {link.isNew || editing[link.id] ? (
                    <button
                      className={styles.iconButton}
                      onClick={() => handleSave(index)}
                      disabled={addingFooter || editingFooter}
                    >
                      <FaSave />
                    </button>
                  ) : (
                    <>
                      <button
                        className={styles.iconButton}
                        onClick={() => toggleEdit(link.id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className={styles.iconButton}
                        onClick={() => handleDelete(link.id)}
                        disabled={deletingFooter}
                      >
                        <FaTrash />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          <button className={styles.addButton} onClick={handleAddNewLink}>
            + Add More Footer Links
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;