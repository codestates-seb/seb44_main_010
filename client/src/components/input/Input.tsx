import { styled } from "styled-components";

export const Input = styled.input`
  width: 90rem;
  height: 10rem;
  border: 1px solid #c9c9c9;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  padding-left: 4rem;
  margin-bottom: 3rem;

  &:focus {
    outline: none;
    border-color: #ffce0b;
  }
  &::placeholder {
    color: #c9c9c9;
  }
`;
