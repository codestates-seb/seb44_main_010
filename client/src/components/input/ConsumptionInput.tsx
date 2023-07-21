import { styled } from "styled-components";
import Select, { Props as SelectProps } from 'react-select';

export const ContentInput = styled.textarea`
  width: 60rem;
  height: 14rem;
  border: 1px solid #c9c9c9;
  border-radius: 2rem; 
  padding: 2rem 2rem;
  font-family: "SCDream", sans-serif;

  &::placeholder{
    font-size: 2.5rem;
    color: gray; 
    font-family: "SCDream", sans-serif;
  }
`;

export const PriceInput = styled.input`
  width: 40rem;
  height: 3rem;
  border: 1px solid #c9c9c9;
  border-radius: 2rem; 
  padding: 2rem 2rem;
  font-family: "SCDream", sans-serif;
`;

// OptionType 타입 정의
type OptionType = { value: string; label: string };

// CustomSelect 컴포넌트 타입 선언
type CustomSelectProps = SelectProps<OptionType, false>;

export const CustomSelect = styled(Select)<CustomSelectProps>`
  width: 65rem;
  .css-art2ul-ValueContainer2 {
    height: 7rem;
    box-sizing: none;
  }
  .css-1dimb5e-singleValue {
    overflow: visible;
    font-size: 3rem;
  }
`;