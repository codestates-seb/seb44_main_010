import styled from "styled-components";
import { DayMoveButtonRight } from "../../button/DayMoveButton";
import { DayMoveButtonLeft } from "../../button/DayMoveButton";
import AddButtonConsumption from "../../button/AddButtonConsumption";
import { Dispatch, SetStateAction } from "react";

export const TopContainer = styled.div`
  display: flex;
  width: 44vw;
  height: 15vh;
  justify-content: space-between;
  align-items: center;
  margin-left: 3vw;
  margin-right: 3vw;

  .month {
    font-size: 3.5rem;
    width: 5vh;
    height: 5vh;
    align-items: center;
    margin-left: 1vw;
    margin-bottom: 3rem;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25rem;
  height: 10rem;
`;

export const MoveDayButton = styled.div`
  display: flex;
  width: 25rem;
  height: 10rem;
  align-items: center;

  .day {
    font-weight: 500;
    font-size: 5rem;
    margin-left: 1vh;
    margin-right: 1vh;
    
  }
`;

export default function DayTopConsumption({
  showInput,
  setShowInput,
  years,
  month,
  date,
  setYears,
  setMonth,
  setDate,
}: {
  showInput: boolean;
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  years: number;
  month: number;
  date: number;
  setYears: Dispatch<SetStateAction<number>>;
  setMonth: Dispatch<SetStateAction<number>>;
  setDate: Dispatch<SetStateAction<number>>;
}) {
    const handleMoveDayRight = () =>{
    //현재 달의 마지막 날을 가져옵니다
    const lastDay = new Date(years, month, 0).getDate();
    // const lastDay = new Date(2023, 7, 0).getDate();을 입력하면  lastDay는 자동적으로 2023.6.30

    //날짜를 1일 증가시킵니다
    const nextDate = date +1 ;

    //다음 날짜가 현재 달의 마지막 날을 초과하는 지 확인합니다
    if(nextDate > lastDay){
      // 다음 달로 이동합니다.
      const nextMonth = month + 1;
      setMonth(nextMonth);

      // 다음 달이 1월인 경우 연도도 증가시킵니다.
      if (nextMonth > 12) {
        const nextYear = years + 1;
        setYears(nextYear);
      }
      // 날짜를 1로 설정합니다 (다음 달의 시작일).
      setDate(1);
    }else{
      // 다음 날짜를 현재 달 내에 설정합니다.
      setDate(nextDate);
    }
    }

    const handleMoveDayLeft = () => {
        // 이전 달의 마지막 날을 가져옵니다.
        const lastDayOfPreviousMonth = new Date(years, month - 1, 0).getDate();
    
        // 날짜를 1일 감소시킵니다.
        const previousDate = date - 1;
    
        // 이전 날짜가 1보다 작은지 확인합니다.
        if (previousDate < 1) {
          // 이전 달로 이동합니다.
          const previousMonth = month - 1;
          setMonth(previousMonth);
    
          // 이전 달이 12월인 경우 연도도 감소시킵니다.
          if (previousMonth < 1) {
            const previousYear = years - 1;
            setYears(previousYear);
          }
    
          // 날짜를 이전 달의 마지막 날로 설정합니다.
          setDate(lastDayOfPreviousMonth);
        } else {
          // 이전 날짜를 현재 달 내에 설정합니다.
          setDate(previousDate);
        }
    }

  return (
    <TopContainer>
      <DateContainer>
        <div className="month">{month}월</div>
        <MoveDayButton>
          <DayMoveButtonLeft handleMoveDayLeft={handleMoveDayLeft}/>
          <div className="day">{date}일</div>
          <DayMoveButtonRight handleMoveDayRight={handleMoveDayRight}/>
        </MoveDayButton>
      </DateContainer>
      <AddButtonConsumption showInput={showInput} setShowInput={setShowInput} />
    </TopContainer>
  );
}
