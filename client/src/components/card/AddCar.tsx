import styled from "styled-components";
import Car from "../../assets/Car.svg";

const Main = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 20vh;
  width: 8vw;
  border-radius: 3rem;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  border: 1px solid #d9d9d9;
  padding: 3rem;
  margin: 5rem;
  cursor: pointer;
  &:hover {
    background-color: #ffce0b;
    color: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  }
`;

const CarImg = styled.img`
  width: 10vw;
  height: 10vh;
`;
const Title = styled.div`
  font-size: 3rem;
`;
export default function AddCar() {
  return (
    <Main>
      <CarImg src={Car}></CarImg>
      <Title>자동차 추가하기</Title>
    </Main>
  );
}
