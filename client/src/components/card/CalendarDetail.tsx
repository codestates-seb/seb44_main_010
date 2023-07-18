import styled from "styled-components";
import renderCalendar from "../card/RenderCalendar";
import { CalendarData } from "../../containers/calendarContainer";

export const CalendarBox = styled.div`
  width: 50vw;
  height: 100%;
  border-bottom: 1px solid #DDDDDD;
`;

export const Weekdays = styled.div`
  width: 50vw;
  height: 10%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  .weekday {
    width: 5vw;
    height: 5vw;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 4rem;
    color: #888181;
    font-weight: 500;
  }
`;

export const Days = styled.div`
  width: 50vw;
  height: 54vh;
`;

export interface CalendarDetailProps {
  month: number;
  JulyData: CalendarData[];
}
export default function CalendarDetail({month, JulyData}:CalendarDetailProps) {

  return (
    <CalendarBox>
      <Weekdays>
        <div className="weekday">일</div>
        <div className="weekday">월</div>
        <div className="weekday">화</div>
        <div className="weekday">수</div>
        <div className="weekday">목</div>
        <div className="weekday">금</div>
        <div className="weekday">토</div>
      </Weekdays>
      <Days>{renderCalendar({ month, JulyData })}</Days>
    </CalendarBox>
  );
}
