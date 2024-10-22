import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "../components/TaskColumn";
import { updateTaskState } from "../store/projectSlice";
import AddTask from "../components/AddTask";
import { taskStatus } from "../constant";

const ProjectDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const hasPermission = useSelector(state => state.settings.permission)
  const project = useSelector((state) =>
    state.projects.projects.find((proj) => proj.id === parseInt(id))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const getTasksByState = (state) =>
    project.tasks.filter((task) => task.state === state);

  const moveTask = (currentStatus, droppedItem) => {
    if (droppedItem.state === currentStatus) return;
    dispatch(
      updateTaskState({
        taskId: droppedItem.id,
        projectId: id,
        newState: currentStatus,
      })
    );
  };

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  if (!project) {
    return <div className="text-center text-red-500">Project not found!</div>;
  }

  return (
    <div className="p-6 mx-auto max-w-screen-lg">
      {/* Project Info */}
      <div className="text-center mt-6">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          {project.name}
        </h1>
        <p className="text-lg text-gray-700 mb-6 italic">
          {project.description}
        </p>
      </div>

      {/* Tasks and Team Info */}
      <div className="flex flex-col lg:flex-row justify-center lg:space-x-10 mt-6">
        {/* Task List */}
        <div className=" shadow-md rounded-lg p-6 w-full lg:w-1/2 mb-6 lg:mb-0">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">Tasks</h2>
          <ul className="list-disc pl-6 space-y-2">
            {project.tasks.map((task) => (
              <li key={task.id} className="flex justify-between items-center text-lg">
              <div className="flex-grow">
                {task.title} -{" "}
                <span className="text-gray-500">{task.state}</span>
              </div>
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition duration-200"
                onClick={() => {setSelectedTask(task); setIsModalOpen(true)}}
              >
                Edit
              </button>
            </li>
            ))}
          </ul>
        </div>

        {/* Team Member List */}
        <div className=" shadow-md rounded-lg p-6 w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 text-blue-500">
            Team Members
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {project.teamMembers.map((member) => (
              <li key={member.id} className="text-lg">
                {member.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-center text-xl font-bold my-4">TASK STATUS</h1>
        <div className="flex justify-between mb-4">
          {
            hasPermission &&  <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleAddTask}
          >
            Add Task
          </button>
          }
         
        </div>
        <DndProvider backend={HTML5Backend}>
          <div className="flex justify-between">
            {taskStatus.map((status) => (
              <TaskColumn
                key={status}
                status={status}
                tasks={getTasksByState(status)}
                moveTask={moveTask}
              />
            ))}
          </div>
        </DndProvider>
        {isModalOpen && (
          <AddTask projectId={id} onClose={() => {setIsModalOpen(false); setSelectedTask(null)}} task={selectedTask}/>
        )}{" "}
      </div>
    </div>
  );
};

export default ProjectDetails;
