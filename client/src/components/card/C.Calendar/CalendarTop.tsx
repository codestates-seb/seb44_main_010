import styled from "styled-components";
import Select from "react-select";

const TitleContainer = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  align-items:center;
  justify-content: flex-start;
`;

const Title = styled.div`
  font-size: 5rem;
  font-weight: 500;
  margin-left: 10rem;
`;

const SelectContainer = styled.div`

margin-left: 10rem;
  select {
    padding: 4px;
    border-radius: 4px;
    background-color: #f2f2f2;
    color: #333333;
    font-size: 14px;
    border: 1px solid #cccccc;
    outline: none;
  }

  .css-1dimb5e-singleValue{
        overflow: visible;
        font-size: 3rem;
    }
`;

interface CalendarTopProps {
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
}

interface MonthOption {
    value: number;
    label: string;
  }

  type ValueType<OptionType, IsMulti = false> = IsMulti extends true
  ? OptionType[]
  : OptionType | null;
  
export default function CalendarTop({ month, setMonth }: CalendarTopProps) {

   const handleChangeMonth = (selectedOption: ValueType<MonthOption, false>) => {
    if (selectedOption) {
      const { value } = selectedOption as MonthOption;
      setMonth(value);
    }
}

  const monthOptions = Array.from({ length: 12 }, (_, index) => ({
    value: index + 1,
    label: `${index + 1}월`,
  }));

  return (
    <TitleContainer>
      <Title>{month}월 내소비</Title>
      <SelectContainer>
        <Select
          value={monthOptions.find((option) => option.value === month)}
          options={monthOptions}
          onChange={handleChangeMonth}
        ></Select>
      </SelectContainer>
    </TitleContainer>
  );
}
