import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import navColor from "./navColorSlice";

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    navColor: navColor.reducer,
  },
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;
