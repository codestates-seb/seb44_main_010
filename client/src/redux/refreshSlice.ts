import { createSlice } from "@reduxjs/toolkit";

const refreshSlice = createSlice({
  name: "refreshKey",
  initialState: {
    key: 0,
  },
  reducers: {
    incrementRefreshKey(state) {
      return { ...state, key: state.key + 1 };
    },
  },
});

export const { incrementRefreshKey } = refreshSlice.actions;

export default refreshSlice;
