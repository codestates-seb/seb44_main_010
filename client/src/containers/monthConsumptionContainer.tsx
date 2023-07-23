import MonthConsumptionDetail from "../components/card/C.Month/MonthComsumptionDetail";
import MonthTopConsumption from "../components/card/C.Month/MonthTopConsumption";
import styled from "styled-components";
import MonthBottomConsumption from "../components/card/C.Month/MonthBottomConsumption";
import { Dispatch, SetStateAction } from "react";
import {
  MonthConsumptionDataItem,
  MonthSumData,
} from "../pages/consumption/monthPage";
import { GroupedData } from "../pages/consumption/monthPage";
import { CashGroupedData } from "../pages/consumption/monthPage";
import { CashMonthConsumptionDataItem } from "../pages/consumption/monthPage";

export const ConsumptionBox = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 7rem;
  margin-right: 3rem;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  border: 1px #dddddd;
  border-radius: 3rem;
`;

export type CombinedItem = MonthConsumptionDataItem | CashMonthConsumptionDataItem;

export interface CombinedData {
  date: string;
  data: CombinedItem[];
}

export default function MonthConsumptionContainer({
  years,
  month,
  setYears,
  setMonth,
  monthSumData,
  groupedData,
  cashGroupedData,
  isLoading
}: {
  years: number;
  month: number;
  setYears: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  monthSumData: MonthSumData | Record<string, never>;
  groupedData: GroupedData[];
  cashGroupedData: CashGroupedData[];
  isLoading: boolean;
}) {
  //6월 데이터와 7월 데이터를 나눠서, 6월 박스의 높이만 커지게 하지 않게 합니다
  const monthData = groupedData.filter(
    (group) => parseInt(group.date.split("-")[1]) === month
  );
  const cashMonthData = cashGroupedData.filter(
    (group) => parseInt(group.date.split("-")[1]) === month
  );

  // 계좌그룹핑 + 현금 그룹핑 데이터 합치기
  const combinedData: CombinedData[] = combineDataByDate(
    monthData,
    cashMonthData
  );

  //console.log(combinedData);

  return (
    <ConsumptionBox>
      <MonthTopConsumption
        years={years}
        month={month}
        setYears={setYears}
        setMonth={setMonth}
      />
      <MonthConsumptionDetail combinedData={combinedData} isLoading={isLoading}/>
      <MonthBottomConsumption monthSumData={monthSumData} />
    </ConsumptionBox>
  );
}

/*
{date: '2023-07-01', data: Array(2)} //계좌
{date: '2023-07-01', data: Array(10)} //현금
{date: '2023-07-01', data: Array(12)} 이렇게 나오면 좋겠다
*/

function combineDataByDate(
  monthData: GroupedData[],
  cashMonthData: CashGroupedData[]
): CombinedData[] {

  //빈객체를 초기값으로 설정
  const combinedDataMap:{[date: string]:(MonthConsumptionDataItem|CashMonthConsumptionDataItem)[]} = {};

  //계좌데이터 그룹별로 합치기
  monthData.forEach((group)=>{
  if(!combinedDataMap[group.date]){
    combinedDataMap[group.date] =[];
  }
  combinedDataMap[group.date].push(...group.data);
  });

  //현금데이터 그룹별로 합치기
  cashMonthData.forEach((group)=>{
    if(!combinedDataMap[group.date]){
      combinedDataMap[group.date]=[];
    }
    combinedDataMap[group.date].push(...group.data);
  });

  //CombinedData 형식으로 변환하여 배열담기
  const combinedData = Object.entries(combinedDataMap).map(([date, data])=>({
  date, data
  }))
  return combinedData;
}
