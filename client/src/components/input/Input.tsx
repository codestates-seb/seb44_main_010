import { styled } from "styled-components";

interface Props {
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
}

export const Input = styled.input<Props>`
  width: ${(props) => `${props.width}rem`};
  height: 10rem;
  border: 1px solid #c9c9c9;
  border-radius: 2rem;
  display: flex;
  justify-content: center;

  font-size: 3rem;

  padding-left: 4rem;
  margin-top: ${(props) => `${props.marginTop}rem`};
  margin-right: ${(props) => `${props.marginRight}rem`};
  margin-bottom: ${(props) => `${props.marginBottom}rem`};

  &:focus {
    outline: none;
    border-color: #ffce0b;
  }
  &::placeholder {
    color: #c9c9c9;
  }
`;
