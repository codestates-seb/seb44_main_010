import DayConsumptionDetail from "../components/card/C.Day/DayConsumptionDetail";
import DayTopConsumption from "../components/card/C.Day/DayTopConsumption";
import styled from "styled-components";
import DayBottomConsumption from "../components/card/C.Day/DayBottomConsumption";
import { useState, useRef, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { DaySumData } from "../pages/consumption/dayPage";
import { DayConsumptionItem } from "../pages/consumption/dayPage";
import { CashConsumption } from "../pages/consumption/dayPage";


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

export default function ConsumptionContainer({
  showInput,
  setShowInput,
  years,
  month,
  date,
  setYears,
  setMonth,
  setDate,
  dayConsumptionData,
  daySumData,
  cashConsumptionData
}: {
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  years: number;
  month: number;
  date: number;
  setYears: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  setDate: Dispatch<SetStateAction<number>>;
  dayConsumptionData: DayConsumptionItem[];
  daySumData: DaySumData | Record<string, never>
  cashConsumptionData: CashConsumption[];

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
      <DayTopConsumption
        showInput={showInput}
        setShowInput={setShowInput}
        years={years}
        month={month}
        date={date}
        setYears={setYears}
        setMonth={setMonth}
        setDate={setDate}
      />
      <DayConsumptionDetail
        detailBoxRef={detailBoxRef}
        dayConsumptionData={dayConsumptionData}
        cashConsumptionData={cashConsumptionData}
      />
      <DayBottomConsumption daySumData={daySumData}/>
    </ConsumptionBox>
  );
}
