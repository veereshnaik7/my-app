import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import React, { useState } from "react";
import Parent from "./Parent";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      name: "todo1",
    },
    {
      id: 2,
      name: "todo2",
    },
    {
      id: 3,
      name: "todo3",
    },
    {
      id: 4,
      name: "todo4",
    },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: Math.floor(Math.random() * 100),
        name: todo,
      },
    ]);
    setTodo("");
  };

  const sensors = useSensors(
    useSensor(TouchSensor),
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const getpos = (id) => todos.findIndex((todos) => todos.id === id);

  const handledragend = (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    setTodos((todos) => {
      const originalPos = getpos(active.id);
      const newPos = getpos(over.id);
      return arrayMove(todos, originalPos, newPos);
    });
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleUpdate = (id, updatedText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, name: updatedText } : todo
      )
    );
  };

  return (
    <div className="main">
      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          style={{ height: "30px" }}
          type="text"
          value={todo}
          placeholder="Enter todo"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button type="submit" style={{ height: "30px" ,width:"40px"}}>
          Add
        </button>
      </form>

      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handledragend}
      >
        <Parent todos={todos} onDelete={handleDelete} onUpdate={handleUpdate} />
      </DndContext>
    </div>
  );
};

export default App;
