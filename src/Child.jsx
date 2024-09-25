import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CSS } from "@dnd-kit/utilities";
import { GoGrabber } from "react-icons/go";
import { MdOutlineDelete } from "react-icons/md";

const Child = ({ todo, id, onDelete, onUpdate }) => {
  const {
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
    listeners,
  } = useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const childStyle = {
    backgroundColor: isDragging ? "lightgray" : "white",
    padding: 10,
    border: isDragging ? "5px solid black" : "0px solid black",
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
  };
  const handleBlur = (e) => {
    const updatedText = e.target.innerText;
    onUpdate(id, updatedText);
  };
  return (
    <div ref={setNodeRef} style={style}>
      <div {...attributes} style={childStyle}>
        <div>
          <span {...listeners} style={{ cursor: "grab", marginRight: 10 }}>
            <GoGrabber />
          </span>
          <span
            contentEditable={true}
            suppressContentEditableWarning={true}
            onBlur={handleBlur}
            style={{ padding: "10px", border: "0px" }}
          >
            {todo}
          </span>
        </div>
        <button onClick={() => onDelete(id)}>
          <MdOutlineDelete />
        </button>
      </div>
    </div>
  );
};

export default Child;
