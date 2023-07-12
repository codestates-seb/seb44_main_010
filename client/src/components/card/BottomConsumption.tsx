import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

export const EmptyBottomContainer = styled.div`
    width: 44vw;
    height: 23vh;
`;

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
  display:flex;
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
  display:flex;
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

interface Item {
  id: number;
  수입: number;
  지출: number;
  합계: number;
}


export default function BottomConsumption(){
  const [sumData, setSumData] = useState([]);

  useEffect(() => {
    getSumData();
  }, []);

  const getSumData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/daySum");
      const data = response.data;
      setSumData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    sumData.length === 0 ? <EmptyBottomContainer /> :
      sumData.map((item :Item) => (
        <BottomContainer key={item.id}>
          <IncomeContainer>
            <div className="수입">수입</div>
            <div className="수입액">{item.수입}</div>
          </IncomeContainer>
          <SpenditureContainer>
            <div className="지출">지출</div>
            <div className="지출액">{item.지출}</div>
          </SpenditureContainer>
          <SumContainer>
            <div className="합계">합계</div>
            <div className="합계액">{item.합계}</div>
          </SumContainer>
          </BottomContainer>
      ))
  );
}