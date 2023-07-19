import { useState } from 'react';
import BudgetInput from './BudgetInput';

const BudgetInputBox = () => {
  const [savedBudget, setSavedBudget] = useState(0);

  const handleSaveBudget = (budget:number) => {
    setSavedBudget(budget);
  };

  return (
    <div>
      <h1>예산 입력</h1>
      <BudgetInput onSave={handleSaveBudget} />
      <p>저장된 예산: {savedBudget}원</p>
    </div>
  );
};

export default BudgetInputBox;