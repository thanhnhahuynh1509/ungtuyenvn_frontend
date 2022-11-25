import { createSlice } from "@reduxjs/toolkit";

const chatUISlice = createSlice({
  name: "chatUI",
  initialState: { data: [] },
  reducers: {
    addChatUI(state, action) {
      const chatUI = state.data.find((s) => s.id === action.payload.id);
      if (!chatUI) {
        state.data = [...state.data, action.payload];
      }
    },
    deleteChatUI(state, action) {
      state.data = [...state.data.filter((m) => m.id !== action.payload)];
    },
  },
});

export const selectChatUI = (state) => state.chatUI.data;
export const { addChatUI, deleteChatUI } = chatUISlice.actions;
export const chatUIReducer = chatUISlice.reducer;
