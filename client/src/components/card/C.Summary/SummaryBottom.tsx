import styled from "styled-components";
import { TextStyled } from "../../default/TextStyled";
import BudgetInputBox from "../../input/BudgetInputBox";
import { SummarySumData } from "../../../pages/consumption/summaryPage";

export const BottomBox = styled.div`
  width: 50vw;
  height: 27vh;
`;
export const Top = styled.div`
  display: flex;
  flex-direction: row;
`;

export interface SummarySumDataProps{
 summarySumData:SummarySumData;
}

export default function SummaryBottom({summarySumData}:SummarySumDataProps) {

  return (
    <BottomBox>
      <Top>
        <TextStyled size={7} weight={500} color={"#414141"}>
          예산
        </TextStyled>
        <BudgetInputBox summarySumData={summarySumData}/>
      </Top>
    </BottomBox>
  );
}
