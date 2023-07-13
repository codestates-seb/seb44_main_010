import ConsumptionDetail from "../components/card/ConsumptionDetail";
import TopConsumption from "../components/card/TopConsumption";
import styled from "styled-components";
import BottomConsumption from "../components/card/BottomConsumption";
import { useState, useRef, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";
import { SumData } from "../pages/consumption/dayPage";

interface ConsumptionBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  dynamicHeight: string;
}

export const ConsumptionBox = styled.div<ConsumptionBoxProps>`
  width: 50vw;
  height: ${({ dynamicHeight }) => `calc(${dynamicHeight}+ 35vh)`};
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
export interface ConsumptionDataItem {
    // 객체의 속성에 대한 타입 선언
    paymentId: number,
    paymentTime: string,
    paymentType: string,
    counterPartyName: string,
    amount: number,
    purpose: string,
    category: string,
    accountId: number //나중에 삭제할수도
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
  consumptionData,
  sumData
}: {
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  years: number;
  month: number;
  date: number;
  setYears: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  setDate: Dispatch<SetStateAction<number>>;
  consumptionData: ConsumptionDataItem[]; // 객체를 담은 배열 형식으로 선언
  sumData: SumData | Record<string, never>

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
      <TopConsumption
        showInput={showInput}
        setShowInput={setShowInput}
        years={years}
        month={month}
        date={date}
        setYears={setYears}
        setMonth={setMonth}
        setDate={setDate}
      />
      <ConsumptionDetail
        detailBoxRef={detailBoxRef}
        consumptionData={consumptionData}
      />
      <BottomConsumption sumData={sumData}/>
    </ConsumptionBox>
  );
}
