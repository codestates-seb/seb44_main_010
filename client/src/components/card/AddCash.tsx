import styled from "styled-components";
import Cash from "../../assets/Cash.svg";

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
  }
`;

const CashImg = styled.img`
  width: 10vw;
  height: 10vh;
`;
const Title = styled.div`
  font-size: 3rem;
`;
export default function AddCar() {
  return (
    <Main>
      <CashImg src={Cash}></CashImg>
      <Title>현금 추가하기</Title>
    </Main>
  );
}
