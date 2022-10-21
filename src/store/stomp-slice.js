import { createSlice } from "@reduxjs/toolkit";

const stompSlice = createSlice({
  name: "stomp",
  initialState: { data: null },
  reducers: {
    updateStomp(state, action) {
      state.data = action.payload;
    },
  },
});

export const selectStomp = (state) => state.stomp.data;
export const { updateStomp } = stompSlice.actions;
export const stompReducer = stompSlice.reducer;
