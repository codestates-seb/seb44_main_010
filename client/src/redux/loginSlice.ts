import { createSlice } from "@reduxjs/toolkit";
import { getLocalstorage } from "../util/localStorage";

interface LoginState {
  isLogined: boolean;
  acesstoken: undefined | string;
  refreshtoken: undefined | string;
}

interface Action {
  payload: { acessToken: string; refreshToken: string };
}

const refreshToken = getLocalstorage("refreshToken");
const acessToken = getLocalstorage("acessToken");

const initialState: LoginState = {
  isLogined: refreshToken && acessToken ? true : false,
  acesstoken: acessToken ? acessToken : undefined,
  refreshtoken: refreshToken ? refreshToken : undefined,
};

export const loginSlice = createSlice({
  name: "checkingLogin",
  initialState,
  reducers: {
    login: (state, action: Action) => {
      state.isLogined = true;
      state.acesstoken = action.payload.acessToken;
      state.refreshtoken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isLogined = false;
      state.acesstoken = undefined;
      state.refreshtoken = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions;

export default loginSlice;
