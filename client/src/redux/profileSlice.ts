import { createSlice } from "@reduxjs/toolkit";

interface UserResponseDto {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface PropertyResponse {
  propertyId: number;
  title: string;
  content: string;
  amount: number;
  propertyType: string;
  userId: number;
}

interface Account {
  accountId: number;
  acoountType: string;
  balance: number;
  accountStatement: string;
  userId: number;
  bankname: string;
  accountNum: string;
  cardNum: string;
}

interface MonthlyResponseDto {
  accountsList: Account[];
  input: number;
  stock: number;
  etc: number;
  total: number;
  prviousMinCurrent: number;
  monthSum: number[];
}

interface ApiResponse {
  data: {
    userResponseDto: UserResponseDto;
    propertyResponse: PropertyResponse[];
    monthlyResponseDto: MonthlyResponseDto;
  };
  states: string;
}

export type ProfileData = ApiResponse | null;

const initialState: { profileData: ProfileData } = {
  profileData: null,
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile(state, action) {
      state.profileData = action.payload;
    },
  },
});

export const { addProfile } = profile.actions;

export default profile;
