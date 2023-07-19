import { useState } from "react";

interface BudgetInputProps {
  onSave: (budget: number) => void;
}

const BudgetInput: React.FC<BudgetInputProps> = ({ onSave }) => {
  const [budget, setBudget] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseInt(e.target.value));
  };

  const handleSaveClick = () => {
    onSave(budget);
    setBudget(0);
  };

  return (
    <div>
      <input
        type="number"
        value={budget}
        onChange={handleInputChange}
        placeholder="예산을 입력하세요"
      />
      <button onClick={handleSaveClick}>등록</button>
    </div>
  );
};

export default BudgetInput;
