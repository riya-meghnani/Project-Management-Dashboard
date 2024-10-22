// features/settingsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const settingSlice = createSlice({
  name: 'settings',
  initialState: {
    permission: true,
  },
  reducers: {
    setPermission: (state, action) => {
      state.permission = action.payload;
    },
  },
});

export const { setPermission } = settingSlice.actions;

export default settingSlice.reducer;
