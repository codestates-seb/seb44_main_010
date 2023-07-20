import styled from "styled-components";

interface StyledProps {
  size?: number;
  weight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  cursor?: string;
  color?: string;
}

export const TextStyled = styled.div<StyledProps>`
  cursor: ${(props) => props.cursor && `${props.cursor}`};
  margin-top: ${(props) => props.marginTop && `${props.marginTop}rem`};
  font-size: ${(props) => props.size && `${props.size}rem`};
  font-weight: ${(props) => props.weight && `${props.weight}`};
  margin-left: ${(props) => props.marginLeft && `${props.marginLeft}rem`};
  margin-bottom: ${(props) => props.marginBottom && `${props.marginBottom}rem`};
  color: ${(props) => (props.color ? `${props.color}` : null)};
`;
