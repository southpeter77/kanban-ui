import React from 'react';
import "./index.css"
import CreateTask from "./CreateTask"
import Task from "./Task"
import { Droppable } from "react-beautiful-dnd";
import AllTasks from "./AllTasks"
const Column = ({ tasks, column, index }) => {
  return (
    <div
      className="column__container">
      <div style={{display:"flex", justifyContent:"center", marginTop:"10pt"}}><p>{column}</p><CreateTask></CreateTask></div>
      <Droppable droppableId={column}>
        {provided => (
          <div
          style={{minHeight:"100pt"}}
          ref={provided.innerRef}
          {...provided.droppableProps}
          >
              <AllTasks tasks={tasks}></AllTasks>
                {provided.placeholder}
          </div>
        )}
      </Droppable>


    </div>
  );
}

export default Column;
