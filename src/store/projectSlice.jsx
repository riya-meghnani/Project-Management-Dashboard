import {createSlice} from '@reduxjs/toolkit';

const projectSlice = createSlice({
    name: 'projects',
    initialState: {projects: [
        {
          id: 1,
          name: 'First project',
          description: 'First project description',
          tasks: [
            { id: 1, title: 'Task 1', state: 'To Do', description: 'Do something' },
            { id: 2, title: 'Task 2', state: 'In Progress', description: 'Work on this' },
          ],
          teamMembers: [
            {
                id: '1',
                name: 'Riya'
            },
            {
                id: '2',
                name: 'Priya'
            }
          ]
        },
        {
            id: 2,
            name: 'Second project',
            description: 'Second project description',
            tasks: [
              { id: 1, title: 'Task 1', state: 'To Do', description: 'Do something' },
              { id: 2, title: 'Task 2', state: 'Done', description: 'Completed' },
            ],
            teamMembers: [
              {
                  id: '1',
                  name: 'Riya'
              },
              {
                  id: '2',
                  name: 'Priya'
              }
            ]
          },
      ]},
   reducers: {
    addProject: (state, action) => {
        state.projects.push(action.payload.project);
    },
    addTask: (state, action) => {
        const project = state.projects.find((p) => p.id == action.payload.projectId);
        project.tasks.push(action.payload.task);
      },
    updateTaskState: (state, action) => {
        const project = state.projects.find((p) => p.id == action.payload.projectId);
        const task = project.tasks.find((t) => t.id == action.payload.taskId);
        task.state = action.payload.newState;
    },
    editTask: (state, action) => {
      const project = state.projects.find((p) => p.id == action.payload.projectId);
      const task = project.tasks.find((t) => t.id == action.payload.taskId);
      task.title = action.payload.editedTask.title;
      task.description = action.payload.editedTask.description
    }
   }
})

export const { addProject, addTask, updateTaskState, editTask } = projectSlice.actions;
export default projectSlice.reducer;
