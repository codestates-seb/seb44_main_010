import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
  },
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;
