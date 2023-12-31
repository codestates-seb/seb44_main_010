import styled from "styled-components";
import 소비배경 from "../../../assets/소비배경.svg";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 5;
  max-height: 10rem;
`;

const ComsumptionHeaderBox = styled.div`
  height: 36rem;
  width: 100vw;
  background-image: url(${소비배경});
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

  .소비 {
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

export default function ConsumptionHeader() {
  return (
    <Main>
      <ComsumptionHeaderBox>
        <WordsContainer>
          <div className="소비">소비</div>
          <div className="알아봐요">나만의 소비패턴 알아봐요</div>
        </WordsContainer>
      </ComsumptionHeaderBox>
    </Main>
  );
}
