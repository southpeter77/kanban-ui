import React from 'react';
import "./index.css"
import CreateTask from "./CreateTask"
import Task from "./Task"
import { Droppable } from "react-beautiful-dnd";

const ToDo = ({ tasks }) => {
  return (
    <div
      className="column__container">
      <div style={{display:"flex", justifyContent:"center", marginTop:"10pt"}}><p>To Do</p><CreateTask></CreateTask></div>
      <Droppable droppableId="droppableId-TO_DO">
        {provided => (
          <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          >
            {tasks.length > 0 && tasks.map((task, index) => {
              return (
                <Task key={index} task={task} index={index}
                ></Task>
              )
            })}
                {provided.placeholder}
          </div>
        )}
      </Droppable>


    </div>
  );
}

export default ToDo;
