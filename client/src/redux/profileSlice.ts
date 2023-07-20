import { createSlice } from "@reduxjs/toolkit";

const profile = createSlice({
  name: "profile",
  initialState: {
    data: {
      userResponseDto: {
        name: "",
        email: "",
        createdAt: "",
        updatedAt: "",
      },
      propertyResponse: null,
      monthlyResponseDto: {
        accountsList: [],
        inputAccount: 0,
        jungunAccount: 0,
        aashAccount: 0,
        prviousMinCurrent: 0,
        monthSum: [],
      },
    },
    states: "",
  },
  reducers: {
    addProfile(state, actions) {
      Object.assign(state, actions.payload);
    },
  },
});

export const { addProfile } = profile.actions;

export default profile;
