import styled from "styled-components";
import { MonthData } from "../../../containers/summaryContainer";
import IncomeChart from "../../chart/IncomeChart";
import ExpenseChart from "../../chart/ExpenseChart";
import SumBox from "./SumBox";
import { SummarySumData } from "../../../pages/consumption/summaryPage";

export const SummaryBox = styled.div`
  width: 50vw;
  height: 60vh;
`;

export const ChartBox = styled.div`
  width: 50vw;
  height: 45vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export interface SummaryDetailProps {
  JulyData: MonthData[];
  summarySumData: SummarySumData;
}

export default function SummaryDetail({ JulyData, summarySumData }: SummaryDetailProps) {
  return (
    <SummaryBox>
      <ChartBox>
        <IncomeChart />
        <ExpenseChart />
      </ChartBox>
      <SumBox summarySumData={summarySumData}/>
    </SummaryBox>
  );
}
