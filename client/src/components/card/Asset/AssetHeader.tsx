import styled from "styled-components";
import 자산배경 from "../../../assets/자산배경.svg";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 5;
  margin-top: -20rem; //
  max-height: 10rem;
`;

const AssetHeaderBox = styled.div`
  height: 36rem;
  width: 100vw;
  background-image: url(${자산배경});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
`;

const WordsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30rem;
  margin-top: 10rem;

  .자산 {
    font-size: 7rem;
    color: #4073b2;
    font-weight: 500;
    margin-right: 1vw;
  }

  .알아봐요 {
    font-size: 3rem;
    color: #fbfcff;
  }
`;

export default function AssetHeader() {
  return (
    <Main>
      <AssetHeaderBox>
        <WordsContainer>
          <div className="자산">자산</div>
          <div className="알아봐요">나의 자산을 관리해봐요</div>
        </WordsContainer>
      </AssetHeaderBox>
    </Main>
  );
}
