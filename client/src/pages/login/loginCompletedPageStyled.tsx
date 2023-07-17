import styled from "styled-components";
import background from "../../assets/svg/completeImg.svg";

interface Props {
  fontsize?: number;
  fontweight?: number;
  color?: string;
}

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin-bottom: -20rem;
`;

export const Container = styled.div`
  background-image: url(${background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.div<Props>`
  font-size: ${(props) => (props.fontsize ? `${props.fontsize}rem` : null)};
  font-weight: ${(props) => (props.fontweight ? `${props.fontweight}` : null)};
  color: ${(props) => (props.color === "black" ? "#424242" : "white")};
  text-shadow: 0px 4px 4px rgb(0, 0, 0, 0.25);
  margin-bottom: 4rem;
  span {
    font-size: 15rem;
    font-weight: 500;
    color: white;
    text-shadow: 0px 4px 4px rgb(0, 0, 0, 0.25);
  }
`;
