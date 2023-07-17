import styled from "styled-components";
import CalendarTop from "../components/card/CalendarTop";
import CalendarDetail from "../components/card/CalendarDetail";
import CalendarBottom from "../components/card/CalendarBottom";

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
  total: number;
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
  console.log(JulyData);
  return (
    <ConsumptionBox>
      <CalendarTop month={month} setMonth={setMonth}/>
      <CalendarDetail />
      <CalendarBottom />
    </ConsumptionBox>
  );
}
