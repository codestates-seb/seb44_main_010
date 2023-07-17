import styled from "styled-components";

interface StyledProps {
  size?: number;
  weight?: number;
  margintop?: number;
  marginBottom?: number;
  cursor?: string;
  color?: string;
}

export const TextStyled = styled.div<StyledProps>`
  cursor: ${(props) => props.cursor && `${props.cursor}`};
  margin-top: ${(props) => props.margintop && `${props.margintop}rem`};
  font-size: ${(props) => props.size && `${props.size}rem`};
  font-weight: ${(props) => props.weight && `${props.weight}`};
  margin-bottom: ${(props) => props.marginBottom && `${props.marginBottom}rem`};
  color: ${(props) => (props.color ? `${props.color}` : null)};
`;
