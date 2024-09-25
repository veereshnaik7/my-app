import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React from "react";
import Child from "./Child";

const Parent = ({ todos, onDelete ,onUpdate}) => {
  return (
    <div>
      <SortableContext
        strategy={verticalListSortingStrategy}
        items={todos.map((todo) => todo.id)}
      >
        {todos.map((todo, index) => (
          <Child id={todo.id} key={todo.id} todo={todo.name}  onDelete={onDelete} onUpdate={onUpdate} />
        ))}
      </SortableContext>
    </div>
  );
};

export default Parent;
