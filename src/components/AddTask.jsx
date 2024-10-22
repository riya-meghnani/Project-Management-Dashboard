import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../store/projectSlice";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function AddTask({ projectId, onClose, task}) {
  const dispatch = useDispatch();
  const project = useSelector((state) =>
    state.projects.projects.find((proj) => proj.id === parseInt(projectId))
  );

  const getNextTaskId = () => {
    if (project.tasks.length === 0) return 1; // If no tasks, start with ID 1
    const highestId = Math.max(...project.tasks.map((task) => task.id));
    return highestId + 1;
  };

  const formik = useFormik({
    initialValues: {
      title: task? task.title: "",
      description: task ? task.description: "",
      state: task ? task.state : "To Do",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if(task){
        dispatch(editTask({projectId, 'taskId':task.id, editedTask: {id: task.id, title: values.title,
          description: values.description, }}))
      }
      else{
        dispatch(
          addTask({
            projectId,
            task: {
              id: getNextTaskId(), // Generate a unique ID
              title: values.title,
              description: values.description,
              state: values.state,
            },
          })
        );
      }
     
      resetForm();
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
              className={`mt-1 block w-full border rounded-md p-2 ${formik.touched.title && formik.errors.title ? "border-red-500" : "border-gray-300"}`}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <ReactQuill
              theme="snow"
              value={formik.values.description}
              onChange={(content) => formik.setFieldValue('description', content)}
              className="rounded-lg border"
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <button
              type="button"
              className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
