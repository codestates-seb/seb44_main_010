import styled from "styled-components";
//import BudgetChart from "../../chart/BudgetChart";
import { TextStyled } from "../../default/TextStyled";
import BudgetInputBox from "../../input/BudgetInputBox";

export const BottomBox = styled.div`
  width: 50vw;
  height: 27vh;
`;
export const Top = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function SummaryBottom() {

  return (
    <BottomBox>
      <Top>
        <TextStyled size={7} weight={500} color={"#414141"}>
          예산
        </TextStyled>
        <BudgetInputBox />
      </Top>
    </BottomBox>
  );
}
