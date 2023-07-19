import styled from "styled-components";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface BudgetInputProps {
  placeholder: string;
  onSave: (budget: number) => void;
}

export const Container = styled.div`
  display:flex;
  flex-direction:row;

`

const BudgetInput: React.FC<BudgetInputProps> = ({ placeholder, onSave }) => {
  const [budget, setBudget] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(parseInt(e.target.value));
  };

  const handleSaveClick = () => {
    onSave(budget);
    setBudget(0);
  };

  return (
    <Container>
      <TextField
        type="number"
        value={budget}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <Button variant="contained" color="primary" onClick={handleSaveClick}>
        등록
      </Button>
    </Container>
  );
};

export default BudgetInput;
