import React from "react";
import { ArrowLeft } from "lucide-react";
import ColorInput from "src/Common/ColorInput/ColorInput";
import InputField from "src/Common/InputField/InputField";
import styles from "./Footer.module.scss";

const Footer = () => {
  const handleSizeChange = (e, maxSize) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value === "" || Number(value) <= maxSize) {
      e.target.value = value;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton}>
            <ArrowLeft size={16} />
            Footer | Section 1
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.colorRow}>
            <div className={styles.colorField}>
              <label>Choose Footer Background Color</label>
              <ColorInput />
            </div>
            <div className={styles.colorField}>
              <label>Choose Footer Heading Text Color</label>
              <ColorInput />
            </div>
            <div className={styles.sizeField}>
              <label>Size</label>
              <InputField
                placeholder="00"
                onChange={(e) => handleSizeChange(e, 20)}
              />
              <span className={styles.maxSize}>(Max 20 px.)</span>
            </div>
          </div>

          <div className={styles.colorRow}>
            <div className={styles.colorField}>
              <label>Choose Footer Text Color</label>
              <ColorInput />
            </div>
            <div className={styles.colorField}>
              <label>Choose Footer Text Hover Color</label>
              <ColorInput />
            </div>
            <div className={styles.sizeField}>
              <label>Size</label>
              <InputField
                placeholder="00"
                onChange={(e) => handleSizeChange(e, 20)}
              />
              <span className={styles.maxSize}>(Max 20 px.)</span>
            </div>
          </div>

          <div className={styles.colorRow}>
            <div className={styles.colorField}>
              <label>Choose Icon Background Color</label>
              <ColorInput />
            </div>
            <div className={styles.colorField}>
              <label>Choose Icon Color</label>
              <ColorInput />
            </div>
          </div>

          <div className={styles.colorRow}>
            <div className={styles.colorField}>
              <label>Choose Benchmark Color</label>
              <ColorInput />
            </div>
            <div className={styles.sizeField}>
              <label>Size</label>
              <InputField
                placeholder="00"
                onChange={(e) => handleSizeChange(e, 22)}
              />
              <span className={styles.maxSize}>(Max 22 px.)</span>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <div className={styles.linkField}>
              <label>Instagram Link</label>
              <InputField placeholder="Enter Instagram link" />
            </div>
            <div className={styles.linkField}>
              <label>Facebook Link</label>
              <InputField placeholder="Enter Facebook link" />
            </div>
            <div className={styles.linkField}>
              <label>LinkedIn Link</label>
              <InputField placeholder="Enter LinkedIn link" />
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.saveButton}>Save</button>
          <button className={styles.nextButton}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
