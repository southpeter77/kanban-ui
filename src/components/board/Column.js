import React from 'react';
import "./index.css"
import { Droppable } from "react-beautiful-dnd";
import AllTasks from "./AllTasks"
const Column = ({ tasks, column }) => {
  return (
    <div
      className="column__container">
      <div style={{display:"flex", justifyContent:"center", marginTop:"10pt"}}><p>{`${column.split("_").join(" ")}`}</p></div>
      <Droppable droppableId={column}>
        {provided => (
          <div
          style={{minHeight:"100%"}}
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
