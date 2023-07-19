import styled from "styled-components";
import { MonthMoveButtonRight } from "../../button/MonthMoveButton";
import { MonthMoveButtonLeft } from "../../button/MonthMoveButton";
import { Dispatch, SetStateAction } from "react";

export const TopContainer = styled.div`
  display: flex;
  width: 44vw;
  height: 13vh;
  justify-content: space-between;
  align-items: center;
  margin-left: 3vw;
  margin-right: 3vw;

  .years {
    font-size: 3.5rem;
    width: 10vh;
    height: 10vh;
    align-items: center;
    margin-left: 1vw;
    margin-bottom: 3rem;
  }
`;

export const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 10rem;
`;

export const MoveMonthButton = styled.div`
  display: flex;
  width: 25rem;
  height: 10rem;
  align-items: center;

  .month {
    font-weight: 500;
    font-size: 5rem;
    margin-left: 1vh;
    margin-right: 1vh;
    
  }
`;

export default function SummaryTop({
  years,
  month,
  setYears,
  setMonth,
}: {
  years: number;
  month: number;
  setYears: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
}) {
  const handleMoveMonthRight = () => {
    const nextMonth = month + 1;

    if (nextMonth > 12) {
      const nextYear = years + 1;
      setYears(nextYear);
      setMonth(1);
    } else {
      setMonth(nextMonth);
    }
  }

    const handleMoveMonthLeft = () => {
      const previousMonth = month - 1;
  
      if (previousMonth < 1) {
        const previousYear = years - 1;
        setYears(previousYear);
        setMonth(12);
      } else {
        setMonth(previousMonth);
      }
    };

  return (
    <TopContainer>
      <MonthContainer>
        <div className="years">{years}년</div>
        <MoveMonthButton>
          <MonthMoveButtonLeft handleMoveMonthLeft={handleMoveMonthLeft}/>
          <div className="month">{month}월</div>
          <MonthMoveButtonRight handleMoveMonthRight={handleMoveMonthRight}/>
        </MoveMonthButton>
      </MonthContainer>
    </TopContainer>
  );

}