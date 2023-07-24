import styled from "styled-components";
import CalendarTop from "../components/card/C.Calendar/CalendarTop";
import CalendarDetail from "../components/card/C.Calendar/CalendarDetail";
import CalendarBottom from "../components/card/C.Calendar/CalendarBottom";
import { CalendarSumData } from "../pages/consumption/calendarPage";

export const ConsumptionBox = styled.div`
  width: 50vw;
  height: 105vh;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
`;

export interface CalendarData {
  date: string;
  income: number;
  expense: number;
  total:  null | number;
}

export interface CashCalendarData{
  id: number;
  date : string;
  monthlyIncome: string;
  monthlyExpense: number;
  monthlyTotal: number;
  propertyId: number;
}

export interface CalendarContainerProps {
  calenderData: CalendarData[];
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  calendarSumData: CalendarSumData;
  cashCalenderData :CashCalendarData[];
}

export default function CalendarContainer({
  calenderData,
  month,
  setMonth,
  calendarSumData,
  cashCalenderData
}: CalendarContainerProps) {
  return (
    <ConsumptionBox>
      <CalendarTop month={month} setMonth={setMonth} />
      <CalendarDetail month={month} calenderData={calenderData} cashCalenderData={cashCalenderData}/>
      <CalendarBottom calendarSumData={calendarSumData}/>
    </ConsumptionBox>
  );
}
