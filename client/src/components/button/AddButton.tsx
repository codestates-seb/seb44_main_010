import { styled } from "styled-components";

interface Props {
  fontSize?: number;
  fontWeight?: number;
  backgroundcolor?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  marginBottom?: number;
  marginTop?: number;
}

export const AddButton = styled.button<Props>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}rem` : "3rem")};
  font-weight: ${(props) => (props.fontWeight ? `${props.fontWeight}` : null)};
  background-color: ${(props) => (props.backgroundcolor === "yellow" ? "#FFCE0B" : "white")};
  color: ${(props) => (props.backgroundcolor === "yellow" ? "white" : "black")};
  width: ${(props) => props.width && `${props.width}rem`};
  height: ${(props) => props.height && `${props.height}rem`};
  border-radius: ${(props) => props.borderRadius && `${props.borderRadius}`}px;
  border: 1px solid ${(props) => (props.backgroundcolor === "yellow" ? "#FFCE0B" : "#C9C9C9")};
  margin-bottom: ${(props) => props.marginBottom && `${props.marginBottom}rem`};
  margin-top: ${(props) => props.marginTop && `${props.marginTop}rem`};
  z-index: 9999;

  & > *:first-child {
    margin-right: 3rem;
  }
`;
