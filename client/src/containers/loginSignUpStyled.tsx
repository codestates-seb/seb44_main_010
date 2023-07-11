import styled from "styled-components";

interface StyledProps {
  size: number;
  weight: number;
  margintop?: number;
  marginBottom?: number;
  cursor?: string;
  color?: string;
}

export const Main = styled.div`
  background-color: white;
  width: 132rem;
  border-radius: 6rem;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Text = styled.div<StyledProps>`
  cursor: ${(props) => props.cursor && `${props.cursor}`};
  margin-top: ${(props) => props.margintop && `${props.margintop}rem`};
  font-size: ${(props) => props.size && `${props.size}rem`};
  font-weight: ${(props) => props.weight && `${props.weight}`};
  margin-bottom: ${(props) => props.marginBottom && `${props.marginBottom}rem`};
  color: ${(props) => (props.color ? `${props.color}` : null)};
`;

export const Bar = styled.div`
  width: 23rem;
  height: 1rem;
  background-color: #ffce0b;
  margin: 3rem 0px 7rem 0px;
`;
