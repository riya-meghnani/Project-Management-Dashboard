import React from 'react'
import Task from './Task';
import { useDrop } from 'react-dnd';

function TaskColumn({ status, tasks, moveTask }) {

    const [, drop] = useDrop({
        accept: 'TASK',
        drop: (item) => moveTask(status, item),
    });

    
    return (
        <div ref={drop} className='flex-grow p-4 shadow-lg rounded-lg mx-2'>
            <h3>{status}</h3>
            {tasks.map((task, index) => (
                <Task key={task.id} index={index} task={task} moveTask={moveTask} />
            ))}
        </div>
    );
}

export default TaskColumn