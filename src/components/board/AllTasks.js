import React, { useEffect } from "react";
import Task from "./Task";

const AllTasks = (({ tasks }) => {
  useEffect(() => {}, [tasks]);
  return tasks.map((task, index) => (
      <>
    <Task key={task._id} task={task} index={index} />
    </>
  ));
});

export default AllTasks;