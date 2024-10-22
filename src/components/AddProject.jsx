import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useFormik } from 'formik';
import { addProject } from '../store/projectSlice';
import * as Yup from "yup";

function AddProject({onClose}) {
    const dispatch = useDispatch();
    const projects = useSelector(state => state.projects.projects);
  
    const getNextTaskId = () => {
      if (projects.length === 0) return 1; // If no tasks, start with ID 1
      const highestId = Math.max(...projects.map((project) => project.id));
      return highestId + 1;
    };
  
    const formik = useFormik({
      initialValues: {
        name: "",
        description: "",
        tasks: [],
        teamMembers: [],
      },
      validationSchema: Yup.object({
        name: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
      }),
      onSubmit: (values, { resetForm }) => {
        dispatch(
          addProject({
            project: {
              id: getNextTaskId(), // Generate a unique ID
              name: values.name,
              description: values.description,
              tasks: values.tasks,
              teamMembers: values.teamMembers
            },
          })
        );
        resetForm();
        onClose();
      },
    });
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-xl font-semibold mb-4">Add New Project</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className={`mt-1 block w-full border rounded-md p-2 ${formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"}`}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <input
                name="description"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.description}
                className={`mt-1 block w-full border rounded-md p-2 ${formik.touched.description && formik.errors.description ? "border-red-500" : "border-gray-300"}`}
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

export default AddProject