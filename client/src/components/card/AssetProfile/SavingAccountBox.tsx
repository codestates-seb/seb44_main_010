import {styled} from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #e1e1e1;
  border-radius: 10rem;
  width: 90%;
  background-color: #ffeb9b;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50vw;
  margin: 4rem;
`;

const Img = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 10rem;
  border: 2px solid #e1e1e1;
  background-color: #ffffff;
  border-radius: 50%;
  margin-right: 2rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Total = styled.div`
  font-size: 6rem;
  text-align: center;
  color: #ff4040;
  margin-bottom: 2rem;
  font-weight: 600;
`;

const Text = styled.div`
  font-size: 3rem;
  text-align: center;
  font-weight: 400;
`;

export default function SavingAccountBox() {
  return (
    <Main>
      <Container>
        <Title>
          <Img>Img</Img>
          <Text>입출금 40%</Text>
        </Title>
        <Contents>
          <Total>400,000원</Total>
          <Text>지난 달보다 -100,000원</Text>
        </Contents>
      </Container>
    </Main>
  );
}
