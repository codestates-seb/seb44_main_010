import {styled} from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50vw;
  margin: 5rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TotalName = styled.div`
  font-size: 7rem;
  font-weight: 600;
  text-align: center;
  color: #3f74b2;
`;

const TotalAsset = styled.div`
  font-size: 7rem;
  font-weight: 600;
  color: #414141;
`;

export default function TotalAssets() {
  return (
    <Main>
      <TotalContainer>
        <Title>
          <TotalName>총 자산</TotalName>
          <TotalAsset>7,000,000원</TotalAsset>
        </Title>
      </TotalContainer>
    </Main>
  );
}
