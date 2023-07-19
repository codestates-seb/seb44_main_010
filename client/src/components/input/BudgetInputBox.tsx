import { useState } from "react";
import BudgetInput from "./BudgetInput";
import { SummarySumDataProps } from "../card/C.Summary/SummaryBottom";
import BudgetChart from "../chart/BudgetChart";

const BudgetInputBox = ({ summarySumData }: SummarySumDataProps) => {
  const [savedBudget, setSavedBudget] = useState(0);

  const handleSaveBudget = (budget: number) => {
    setSavedBudget(budget);
  };

  return (
    <div>
      <h1>예산 입력</h1>
      <BudgetInput onSave={handleSaveBudget} />
      <p>저장된 예산: {savedBudget}원</p>
      <BudgetChart summarySumData={summarySumData} savedBudget={savedBudget}/>
    </div>
  );
};

export default BudgetInputBox;
