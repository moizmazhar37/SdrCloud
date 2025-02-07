import React, { useMemo, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HvoSectionCard from "./HvoSectionCard";
import styles from "./container.module.scss";
import useSwapHvoSequence from "../Hooks/useSwapHvoSequence";
import useGetFirstRowData from "../Hooks/useGetFirstRowData";

const isValidUrl = (url) => {
  if (!url) return false;
  return url.startsWith("http://") || url.startsWith("https://");
};

const getPreviewContent = (element, apiData) => {
  let previewUrl;

  switch (element.section_name) {
    case "Header":
      previewUrl = element.company_logo;
      if (!isValidUrl(previewUrl) && apiData) {
        previewUrl = apiData.LOGO;
      }
      return previewUrl;

    case "Hero":
      previewUrl = element.hero_img;
      if (!isValidUrl(previewUrl) && apiData) {
        previewUrl = apiData["Hero Image"];
      }
      return previewUrl;

    case "Right Text Left Image":
      previewUrl = element.left_image_right_text;
      if (!isValidUrl(previewUrl) && apiData) {
        previewUrl = apiData.RIGHT_TEXT_LEFT_IMAGE;
      }
      return previewUrl;

    case "Left Text Right Image":
      previewUrl = element.left_text_right_image_url;
      if (!isValidUrl(previewUrl) && apiData) {
        previewUrl = apiData["LEFT TEXT RIGHT IMAGE"];
      }
      return previewUrl;

    case "Highlight Banner":
      return null;

    case "Highlight Banner 2":
      previewUrl = element.static_url;
      if (!isValidUrl(previewUrl) && apiData) {
        previewUrl = apiData.BANNER_CTA_URL2;
      }
      return previewUrl;

    case "Footer":
      return null;

    default:
      return null;
  }
};

const HvoSectionCardContainer = ({
  elementsList = [],
  onSectionUpdate,
  handleEdit,
  templateId,
}) => {
  const { swapSequence } = useSwapHvoSequence();
  const { data: apiData, error, loading } = useGetFirstRowData(templateId);

  const sortedElements = useMemo(() => {
    if (!elementsList) return [];
    return [...elementsList].sort((a, b) => a.sequence - b.sequence);
  }, [elementsList]);

  const handleDragEnd = async (result) => {
    if (!result.destination || !sortedElements.length) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    const items = Array.from(sortedElements);
    const [movedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, movedItem);

    const updatedSequences = items.map((item, index) => ({
      element_id: item.id,
      sequence: index + 1,
      section_number: item.section_number,
    }));

    try {
      await swapSequence(updatedSequences);
      onSectionUpdate();
    } catch (error) {
      console.error("Error updating sequences:", error);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!elementsList.length) {
    return (
      <div className={styles.emptyContainer}>
        <p>No sections available</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided, snapshot) => (
          <div
            className={`${styles.cardContainer} ${
              snapshot.isDraggingOver ? styles.draggingOver : ""
            }`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {sortedElements.map((element, index) => (
              <Draggable
                key={element.id}
                draggableId={element.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${styles.draggableCard} ${
                      snapshot.isDragging ? styles.dragging : ""
                    }`}
                    style={provided.draggableProps.style}
                  >
                    <HvoSectionCard
                      id={element.id}
                      sectionSequnece={element.sequence}
                      sectionNumber={element.section_number}
                      sectionName={element.section_name}
                      duration={element.duration}
                      scroll={element.scroll}
                      previewContent={getPreviewContent(element, apiData)}
                      onDeleteSuccess={onSectionUpdate}
                      onEdit={() => handleEdit(element)}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default HvoSectionCardContainer;
