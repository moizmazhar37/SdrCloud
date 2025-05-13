import React, { useMemo } from "react";
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
  if (!element) return null;

  switch (element.section_name) {
    case "Header":
      return isValidUrl(element.company_logo)
        ? element.company_logo
        : apiData?.LOGO || null;

    case "Hero":
      return isValidUrl(element.hero_img)
        ? element.hero_img
        : apiData?.["Hero Image"] || null;

    case "Right Text Left Image":
      return isValidUrl(element.left_image_right_text)
        ? element.left_image_right_text
        : apiData?.RIGHT_TEXT_LEFT_IMAGE || null;

    case "Left Text Right Image":
      return isValidUrl(element.left_text_right_image_url)
        ? element.left_text_right_image_url
        : apiData?.["LEFT TEXT RIGHT IMAGE"] || null;

    case "Highlight Banner":
      return null;

    case "Highlight Banner 2":
      return isValidUrl(element.static_url)
        ? element.static_url
        : apiData?.BANNER_CTA_URL2 || null;

    case "HVO Video":
      return isValidUrl(element.video) ? element.video : null;

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
  sectionRefs,
}) => {
  const { swapSequence } = useSwapHvoSequence();
  const { data: apiData } = useGetFirstRowData(templateId);

  const sortedElements = useMemo(() => {
    if (!elementsList?.length) return [];
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
            {sortedElements.map((element, index) => {
              const previewUrl = getPreviewContent(element, apiData);

              return (
                <Draggable
                  key={element.id}
                  draggableId={element.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={(el) => {
                        // Store ref for scrolling functionality
                        if (sectionRefs && el) {
                          sectionRefs.current[`section-${element.sequence}`] =
                            el;
                        }
                        // Also maintain drag-drop ref
                        provided.innerRef(el);
                      }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${styles.draggableCard} ${
                        snapshot.isDragging ? styles.dragging : ""
                      }`}
                      style={provided.draggableProps.style}
                    >
                      <HvoSectionCard
                        key={`${element.id}-${element.sequence}-${previewUrl}`}
                        id={element.id}
                        sectionSequnece={element.sequence}
                        sectionNumber={element.section_number}
                        sectionName={element.section_name}
                        duration={element.duration}
                        scroll={element.scroll}
                        previewContent={previewUrl}
                        onDeleteSuccess={onSectionUpdate}
                        onEdit={() => handleEdit(element)}
                      />
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default HvoSectionCardContainer;
