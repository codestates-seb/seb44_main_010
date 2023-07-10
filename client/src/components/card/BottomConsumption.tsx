import styled from "styled-components";

export const BottomContainer = styled.div`
    width: 44vw;
    height: 23vh;
    display:flex;
    flex-direction:column;
    margin-left: 3vw;
    margin-right: 3vw;
    justify-content:center;
    
`;

export const IncomeContainer = styled.div`
  width: 44vw;
  height: 5vh;
  display:flex;
  justify-content: space-between;
  align-items:center;

  .수입{
  font-size: 3.5rem;
  }

  .수입액{
  font-size: 3.5rem;
  color:#2D36FD;
  font-weight:500;
  }
`;

export const SpenditureContainer = styled.div`
  width: 44vw;
  height: 5vh;
  justify-content: space-between;
  align-items:center;

  .지출{
  font-size: 3.5rem;
  }

  .지출액{
    font-size: 3.5rem;
    color: #414141;
    font-weight:500;
  }
`;

export const SumContainer = styled.div`
  width: 44vw;
  height: 5vh;
  justify-content: space-between;
  align-items:center;

  .합계{
  font-size: 3.5rem;
  }

  .합계액{
  font-size: 5rem;
  font-weight:500;
  color: #FF554B;
  }
`;


export default function BottomConsumption(){
  return(<BottomContainer>
    <IncomeContainer>
    <div className="수입">수입</div>
    <div className="수입액">2,500,000</div>
    </IncomeContainer>
    <SpenditureContainer>
    <div className="지출">지출</div>
    <div className="지출액">99,900</div>
    </SpenditureContainer>
    <SumContainer>
    <div className="합계">합계</div>
    <div className="합계액">2,400,100</div>
    </SumContainer>
  </BottomContainer>)
}