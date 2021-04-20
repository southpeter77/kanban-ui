import React from 'react';
import "./index.css"
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task"


const InProgress = ({tasks}) => {
  return (

    <div
      className="column__container">
                <p>In Progress</p>
      <Droppable droppableId="droppableId-IN_PROGRESS">
        {provided => (
          <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          >
            {tasks.length > 0 && tasks.map((task, index) => {
              return (
                <Task key={task._id} task={task} index={index}
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

export default InProgress;