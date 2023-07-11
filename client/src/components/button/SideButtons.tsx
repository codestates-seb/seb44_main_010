import styled from "styled-components";
//display:flex; position: absolute 사용해서 그리드 옆으로 빼기


export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DayButton = styled.div`
  display: flex;
  width: 13rem;
  height: 13rem;
  border-radius: 50%; /* 동그라미 모양으로 설정 */
  color: #000000;
  font-size: 3rem;
  border: 1px solid;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: background-color 0.3s, color 0.3s; /* 트랜지션 효과 설정 */

  &:hover{
    background-color:#FFCE0B;
    color:#FFFFFF;
    cursor: pointer;
  }

`;

export default function SideButtons() {
  return(<ButtonContainer>
    <DayButton>일일</DayButton>
    <DayButton>월별</DayButton>
    <DayButton>달력</DayButton>
    <DayButton>요약</DayButton>
  </ButtonContainer>);
  
}
