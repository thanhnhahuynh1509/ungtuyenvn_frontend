import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    data: { hasNew: false, notifications: null, showNotification: false },
  },
  reducers: {
    updateHasNew(state, action) {
      state.data.hasNew = action.payload;
    },
    updateShowNotification(state, action) {
      state.showNotification = action.payload;
    },
  },
});

export const selectHasNewNotification = (state) =>
  state.notification.data.hasNew;
export const { updateHasNew, updateShowNotification } =
  notificationSlice.actions;
export const notificationReducer = notificationSlice.reducer;
