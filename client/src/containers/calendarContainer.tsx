import styled from "styled-components";
import CalendarTop from "../components/card/C.Calendar/CalendarTop";
import CalendarDetail from "../components/card/C.Calendar/CalendarDetail";
import CalendarBottom from "../components/card/C.Calendar/CalendarBottom";

export const ConsumptionBox = styled.div`
  width: 50vw;
  height: 105vh;
  border: 1px solid #DDDDDD;
  display:flex;
  flex-direction:column;
  border-radius: 15px;
`;

export interface CalendarData {
  date: string;
  income: number;
  expense: number;
}

export interface CalendarContainerProps {
  JulyData: CalendarData[];
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}

export default function CalendarContainer({
  JulyData,
  month,
  setMonth
}: CalendarContainerProps) {
  return (
    <ConsumptionBox>
      <CalendarTop month={month} setMonth={setMonth}/>
      <CalendarDetail month={month} JulyData={JulyData}/>
      <CalendarBottom month={month}/>
    </ConsumptionBox>
  );
}
