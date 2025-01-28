import React from "react";
import SectionCard from "./SectionCard";
import styles from "./section-card.module.scss";

const SectionCardContainer = ({
  elementsList,
  setSaveTriggered,
  handleEdit,
}) => {
  return (
    <div className={styles.cardContainer}>
      {elementsList?.map((element) => (
        <SectionCard
          key={element.id}
          id={element.id}
          sectionNumber={element.sequence}
          sectionName={element.section_name}
          duration={element.duration}
          scroll={element.scroll}
          previewContent={element.value}
          onDeleteSuccess={() => setSaveTriggered((prev) => !prev)}
          onEdit={() => handleEdit(element)}
        />
      ))}
    </div>
  );
};

export default SectionCardContainer;
