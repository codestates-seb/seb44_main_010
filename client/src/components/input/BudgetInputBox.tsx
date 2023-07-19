import styled from "styled-components";
import { useState } from "react";
import BudgetInput from "./BudgetInput";
import { SummarySumDataProps } from "../card/C.Summary/SummaryBottom";
import BudgetChart from "../chart/BudgetChart";


const InputBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 50vw;
  height: 25vh;
`;

export const SavedBudget = styled.div`
  width: 15vw;
  height: 10vh;
  border: 1px solid #E1E1E1;
  border-radius: 15px;
  display:flex;
  flex-direction:column;
  justify-content:center;

  .title{
    font-size: 4rem;
    color:#3C7AF0;
    font-weight:500;
    margin-left: 3rem;
  }

  .price{
    font-size: 5rem;
    display:flex;
    justify-content:flex-end;
    margin-right: 3rem;
  }
`;

export const InputContainer = styled.div`
  width: 15vw;
  height: 10vh;
  display:flex;
  align-items:center;
  justify-content:space-evenly;
  margin-top: 3rem;
`;

export default function BudgetInputBox({ summarySumData }: SummarySumDataProps){
  const [savedBudget, setSavedBudget] = useState(0);

  const handleSaveBudget = (budget: number) => {
    setSavedBudget(budget);
  };

  return (
    <Wrapper>
      <BudgetChart summarySumData={summarySumData} savedBudget={savedBudget} />
      <InputBox>
        <SavedBudget>
          <div className="title">한달 예산</div>
          <div className="price">{savedBudget}원</div>
        </SavedBudget>
        <InputContainer>
          <BudgetInput placeholder="예산을 입력해주세요" onSave={handleSaveBudget} />
        </InputContainer>
      </InputBox>
    </Wrapper>
  );
}

