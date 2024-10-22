// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice';
import settingReducer from './settingSlice'

const store = configureStore({
  reducer: {
    projects: projectReducer,
    settings: settingReducer,

  },
});

export default store;
