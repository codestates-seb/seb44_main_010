import styled from "styled-components";
import { Link } from "react-router-dom";
//display:flex; position: absolute 사용해서 그리드 옆으로 빼기


export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DayButton = styled(Link)`
  display: flex;
  width: 13rem;
  height: 13rem;
  border-radius: 50%; /* 동그라미 모양으로 설정 */
  color: #000000;
  font-size: 3rem;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s; /* 트랜지션 효과 설정 */
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  cursor: pointer;
  
  &:hover{
    background-color:#FFCE0B;
    color:#FFFFFF;

  }

`;

export default function SideButtons() {
  return(<ButtonContainer>
    <DayButton to="/consumption/day_upload">일일</DayButton>
    <DayButton to="/consumption/month_upload">월별</DayButton>
    <DayButton to="/consumption/calendar">달력</DayButton>
    <DayButton to ="/consumption/summary">요약</DayButton>
  </ButtonContainer>);
  
}
