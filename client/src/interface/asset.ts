export interface UserResponseDto {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyResponse {
  propertyId: number;
  title: string;
  content: string;
  amount: number;
  propertyType: string;
  userId: number;
}

export interface Account {
  accountId: number;
  acoountType: string;
  balance: number;
  accountStatement: string;
  userId: number;
  bankname: string;
  accountNum: string;
  cardNum: string;
}

export interface MonthlyResponseDto {
  accountsList: Account[];
  input: number;
  stock: number;
  etc: number;
  total: number;
  prviousMinCurrent: number;
  monthSum: number[];
}

export interface ApiResponse {
  data: {
    userResponseDto: UserResponseDto;
    propertyResponse: PropertyResponse[];
    monthlyResponseDto: MonthlyResponseDto;
  };
  states: string;
}

export type AssetData = ApiResponse | null;
