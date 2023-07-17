import { createSlice } from "@reduxjs/toolkit";

const navColor = createSlice({
  name: "navColor",
  initialState: {
    service: "",
    asset: "",
    consumption: "",
  },
  reducers: {
    mainColor() {
      return { service: "", asset: "", consumption: "" };
    },
    serviceColor() {
      return { service: "yellow", asset: "", consumption: "" };
    },
    assetColor() {
      return { service: "", asset: "yellow", consumption: "" };
    },
    consumptionColor() {
      return { service: "", asset: "", consumption: "yellow" };
    },
  },
});

export const { mainColor, serviceColor, assetColor, consumptionColor } = navColor.actions;

export default navColor;
