import styled from "styled-components";
import { CalendarDetailProps } from "./CalendarDetail";

export const Week = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  &:first-child {
    margin-top: 5rem;
  }
`;

export const EmptyCell = styled.div`
  width: 5vw;
  height: 5vw;
  margin-bottom: 2rem;
`;

export const Cell = styled.div`
  width: 5vw;
  height: 5vw;
  color: #888181;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;

  .dayCount {
    font-size: 4rem;
    font-weight: 500;
    color: #404040;
    margin-bottom: 2rem;
  }

  .출금 {
    font-size: 2.5rem;
    margin-top: 1rem;
    color: #ff7a72;
  }

  .입금 {
    font-size: 2.5rem;
    color: #5f65ff;
  }
`;

const daysInMonth = 37;

export default function RenderCalendar({month, JulyData}:CalendarDetailProps) {
  let startDay: number;
  if (month === 7 || month === 4) {
    //토
    startDay = 6;
  } else if (month === 9 || month === 12) {
    //금
    startDay = 5;
  } else if (month === 6) {
    //목
    startDay = 4;
  } else if (month === 2 || month === 3 || month === 11) {
    //수
    startDay = 3;
  } else if (month === 8) {
    //화
    startDay = 2;
  } else if (month === 5) {
    startDay = 1; //월
  } else {
    startDay = 0; //일
  }

  const calendar = [];
  let dayCount = 1;

  // 빈 셀 추가 (1일 이전)
  for (let i = 0; i < startDay; i++) {
    calendar.push(<EmptyCell key={`empty-${i}`} />);
  }


  // 날짜 셀 추가
  while (dayCount <= daysInMonth) {

    let income = 0;
    let expense = 0;
    
    if (
      month === 1 ||
      month === 3 ||
      month === 5 ||
      month === 7 ||
      month === 8 ||
      month === 10 ||
      month === 12
        ? dayCount <= 31
        : month === 2
        ? dayCount <= 28
        : dayCount <= 30
    ) {
      const currentDate = new Date(`2023-${month.toString().padStart(2, "0")}-${dayCount.toString().padStart(2, "0")}T12:00:00`);
      const matchingData = JulyData.find(data => new Date(data.date).getDate() === currentDate.getDate());

      if (matchingData) {
        income = matchingData.income;
        expense = matchingData.expense;
      }

      calendar.push(
        <Cell key={`day-${dayCount}`}>
          <div className="dayCount">{dayCount}</div>
          <div className="입금">{income}</div>
          <div className="출금">{expense}</div>
        </Cell>
      );
    } else {
      calendar.push(<EmptyCell key={`empty-${dayCount}`} />);
    }
    dayCount++;
  }

  // 일차원 배열을 7개씩 나누어 Week 컴포넌트로 감싸기
  const weeks = [];
  for (let i = 0; i < calendar.length; i += 7) {
    const week = calendar.slice(i, i + 7);
    weeks.push(<Week key={`week-${i / 7}`}>{week}</Week>);
  }

  return weeks;
}