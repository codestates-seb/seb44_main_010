import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import navColor from "./navColorSlice";
import proFile from "./profileSlice";

export const store = configureStore({
  reducer: {
    loginSlice: loginSlice.reducer,
    navColor: navColor.reducer,
    proFile: proFile.reducer,
  },
});

// RootState 타입 정의
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
