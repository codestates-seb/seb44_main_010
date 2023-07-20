import styled from "styled-components";
import 자산배경 from "../../../assets/자산배경.svg";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 5;
  margin: 0;
  padding: 0;
`;

const AssetHeaderBox = styled.div`
  height: 15vh; /* Try increasing the height if needed */
  background-image: url(${자산배경});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain; /* Keep only one background-size property */
  display: flex;
  align-items: center;
  border: 1px solid;
`;

const WordsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10vw;

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
