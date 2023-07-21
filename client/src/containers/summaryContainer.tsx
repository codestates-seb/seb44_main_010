import styled from "styled-components";
import SummaryTop from "../components/card/C.Summary/SummaryTop";
import SummaryDetail from "../components/card/C.Summary/SummaryDetail";
import SummaryBottom from "../components/card/C.Summary/SummaryBottom";
import { SummarySumData } from "../pages/consumption/summaryPage";
import { CategoryData } from "../pages/consumption/summaryPage";

export const ConsumptionBox = styled.div`
  width: 50vw;
  height: 110vh;
  border: 1px solid #dddddd;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
`;

export interface MonthData {
  paymentTime: string;
  paymentType: string;
  counterPartyName: string;
  amount: number;
  category: string;
  purpose: string;
  accountId: number;
}

export interface SummaryContainerProps {
  categoryData:CategoryData;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  years: number;
  setYears: React.Dispatch<React.SetStateAction<number>>;
  summarySumData: SummarySumData;
}

export default function SummaryContainer({
  categoryData,
  month,
  setMonth,
  years,
  setYears,
  summarySumData,
}: SummaryContainerProps) {
  return (
    <ConsumptionBox>
      <SummaryTop years={years} setYears={setYears} month={month} setMonth={setMonth} />
      <SummaryDetail categoryData={categoryData} summarySumData={summarySumData}/>
      <SummaryBottom summarySumData={summarySumData}/>
    </ConsumptionBox>
  );
}
