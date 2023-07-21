import MonthConsumptionDetail from "../components/card/C.Month/MonthComsumptionDetail";
import MonthTopConsumption from "../components/card/C.Month/MonthTopConsumption";
import styled from "styled-components";
import MonthBottomConsumption from "../components/card/C.Month/MonthBottomConsumption";
import { useState, useRef, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { MonthSumData } from "../pages/consumption/monthPage";

export const ConsumptionBox = styled.div<ConsumptionBoxProps>`
  width: 50vw;
  height: ${({ dynamicHeight }) => `calc(${dynamicHeight}+ 45vh)`};
  //65vh, 아이템 갯수에 따라서 박스의 높이가 달라져야 함
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 7rem;
  margin-right: 3rem;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  border: 1px #dddddd;
  border-radius: 3rem;
`;

interface ConsumptionBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  dynamicHeight: string;
}

export interface MonthConsumptionDataItem {
    // 객체의 속성에 대한 타입 선언
    paymentId: number,
    paymentTime: string,
    paymentType: string,
    counterPartyName: string,
    amount: number,
    purpose: string,
    category: string,
    accountId: number 
  }
  
export default function MonthConsumptionContainer({
  years,
  month,
  setYears,
  setMonth,
  monthConsumptionData,
  monthSumData,
  groupedData
}: {
  years: number;
  month: number;
  setYears: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  monthConsumptionData: MonthConsumptionDataItem[]; // 객체를 담은 배열 형식으로 선언
  monthSumData: MonthSumData | Record<string, never>
  groupedData: MonthConsumptionDataItem[][]; //2차원 배열

}) {
  const [dynamicHeight, setDynamicHeight] = useState("0");
  const detailBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (detailBoxRef.current && detailBoxRef.current.style.height) {
      setDynamicHeight(detailBoxRef.current.style.height);
    }
  }, []);

  return (
    <ConsumptionBox dynamicHeight={dynamicHeight}>
      <MonthTopConsumption
        years={years}
        month={month}
        setYears={setYears}
        setMonth={setMonth}
      />
      <MonthConsumptionDetail
        detailBoxRef={detailBoxRef}
        monthConsumptionData={monthConsumptionData}
        groupedData = {groupedData}
      />
      <MonthBottomConsumption monthSumData={monthSumData}/>
    </ConsumptionBox>
  );
}