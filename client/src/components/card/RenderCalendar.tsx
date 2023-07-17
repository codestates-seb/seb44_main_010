import styled from "styled-components";

export const  Week = styled.div`
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
  color:#888181;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  margin-bottom: 2rem;

  .dayCount{
    font-size: 4rem;
    font-weight:500;
    color:#404040;
    margin-bottom: 2rem;
  }

  .출금{
    font-size: 2.5rem;
    margin-top:1rem;
    color:#FF7A72;
  }

  .입금{
    font-size: 2.5rem;
    color:#5F65FF;
  }
`;

const daysInMonth = 36;
const startDay = 6; // 7월 1일이 토요일이므로 6으로 설정

export default function RenderCalendar(){
    const calendar = [];
    let dayCount = 1;

    // 빈 셀 추가 (1일 이전)
    for (let i = 0; i < startDay; i++) {
      calendar.push(<EmptyCell key={`empty-${i}`} />);
    }

    // 날짜 셀 추가
    while (dayCount <= daysInMonth) {
        calendar.push(
            <Cell key={`day-${dayCount}`}>
              {dayCount <= 31 && <div className="dayCount">{dayCount}</div>}
              {dayCount <= 31 && <div className="입금">입금</div>}
              {dayCount <= 31 && <div className="출금">출금</div>}
            </Cell>
          );
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