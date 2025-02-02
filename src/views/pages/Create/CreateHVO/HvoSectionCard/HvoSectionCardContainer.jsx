import React, { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HvoSectionCard from "./HvoSectionCard";
import styles from "./container.module.scss";
import useSwapHvoSequence from "../Hooks/useSwapHvoSequence";

const HvoSectionCardContainer = ({
  elementsList = [],
  onSectionUpdate,
  handleEdit,
}) => {
  const { swapSequence } = useSwapHvoSequence();

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
                      previewContent={element.value}
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
