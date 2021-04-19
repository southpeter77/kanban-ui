import React from 'react';
import "./index.css"
import CreateTask from "./CreateTask"
import Task from "./Task"

const ToDo = ({tasks}) => {

    return (
      <div className="column__container">
        <p>To Do<CreateTask></CreateTask></p>
        {tasks.length>0 && tasks.map(task=>{
          return (
            <Task task={task}></Task>
          )
        })}
      </div>
    );
}

export default ToDo;
