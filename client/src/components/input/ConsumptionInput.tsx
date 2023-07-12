import { styled } from "styled-components";

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
  

