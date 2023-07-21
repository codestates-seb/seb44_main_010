import { styled } from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #e1e1e1;
  border-radius: 10rem;
  width: 90%;
  background-color: #b5f2ff;
  margin-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50vw;
  margin: 1rem;
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
  font-size: 5rem;
  text-align: center;
  color: #ff4040;
  /* margin-bottom: 2rem; */
  font-weight: 500;
`;

const Text = styled.div`
  font-size: 3rem;
  text-align: center;
  font-weight: 400;
`;

export default function StockBox() {
  return (
    <Main>
      <Container>
        <Title>
          <Img>Img</Img>
          <Text>증권 25%</Text>
        </Title>
        <Contents>
          <Total>250,000원</Total>
          {/* <Text>지난 달보다 +200,000원</Text> */}
        </Contents>
      </Container>
    </Main>
  );
}
