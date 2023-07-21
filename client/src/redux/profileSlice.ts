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
    monthlyResponseDto: {
      accountsList: [],
      etc: "",
      input: "",
      monthSum: [],
      prviousMinCurrnet: "",
      stock: "",
      total: "",
    },
  },
  reducers: {
    addProfile(state, action) {
      state.data = action.payload;
    },
  },
});

export const { addProfile } = profile.actions;

export default profile;
