import styled from "styled-components";
import { SummarySumData } from "../../../pages/consumption/summaryPage";

export const Container = styled.div`
  width: 50vw;
  height: 13vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid #AAAAAA;
`;

export const IncomeContainer = styled.div`
  width: 22vw;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .수입 {
    font-size: 3.5rem;
  }

  .수입액 {
    font-size: 3.5rem;
    color: #2d36fd;
    font-weight: 500;
    margin-left: 10rem;
  }
`;

export const SpenditureContainer = styled.div`
  display: flex;
  width: 22vw;
  height: 5vh;
  justify-content: center;
  align-items: center;

  .지출 {
    font-size: 3.5rem;
    margin-left: 20rem;
  }

  .지출액 {
    font-size: 3.5rem;
    color: #FF554B;
    font-weight: 500;
    margin-left: 10rem;
  }
`;

export const SumContainer = styled.div`
  display: flex;
  width: 44vw;
  height: 5vh;
  justify-content:center;
  align-items: center;

  .합계 {
    font-size: 3.5rem;
    margin-left: 15rem;
  }

  .합계액 {
    font-size: 5rem;
    font-weight: 500;
    color: #414141;
    margin-left: 10rem;
  }
`;
export const SmallContainer = styled.div`
  display:flex;
  flex-direction:row;
`;

export default function SumBox({
  summarySumData,
}: {
  summarySumData: SummarySumData;
}) {
  return (
    <Container key={summarySumData.date}>
      <SmallContainer>
        <IncomeContainer>
          <div className="수입">수입</div>
          <div className="수입액">{summarySumData.income}</div>
        </IncomeContainer>
        <SpenditureContainer>
          <div className="지출">지출</div>
          <div className="지출액">{summarySumData.expense}</div>
        </SpenditureContainer>
      </SmallContainer>
      <SumContainer>
        <div className="합계">합계</div>
        <div className="합계액">{summarySumData.total}</div>
      </SumContainer>
    </Container>
  );
}
