import React, { useMemo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import SectionCard from "./SectionCard";
import styles from "./container.module.scss";
import useSwapSequence from "../hooks/useSwapSequence";

const SectionCardContainer = ({
  elementsList = [],
  setSaveTriggered,
  handleEdit,
}) => {
  const { swapSequence } = useSwapSequence();

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
      elementId: item.id,
      sequence: index + 1,
    }));

    try {
      await swapSequence(updatedSequences);
      setSaveTriggered((prev) => !prev);
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
                    <SectionCard
                      id={element.id}
                      sectionNumber={element.sequence}
                      sectionName={element.section_name}
                      duration={element.duration}
                      scroll={element.scroll}
                      previewContent={element.value}
                      onDeleteSuccess={() => setSaveTriggered((prev) => !prev)}
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

export default SectionCardContainer;
