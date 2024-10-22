import React, { useContext } from "react";
import { useDrag } from "react-dnd";

function Task({ task, index, moveTask }) {

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: task,
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
    
  })
  return (
    <div
      className={`p-2.5 mb-2 rounded border border-solid ${isDragging? "opacity-50" : "opacity-100"}`}
      ref={drag}
    >
      {task.title}
    </div>
  );
}

export default Task;
