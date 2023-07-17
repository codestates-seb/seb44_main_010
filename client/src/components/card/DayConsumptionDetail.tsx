import styled from "styled-components";
import dot from "../../assets/Rectangle 80.svg";
import { useEffect } from "react";
import { DayConsumptionDataItem } from "../../containers/dayConsumptionContainer.tsx";

const ConsumptionDetailBox = styled.div`
  width: 50vw;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #dddddd;
  border-right: none;
  border-left: none;
  justify-content: center;
`;

const ConsumptionDetailContainer = styled.div`
  height: 6vh;
  width: 40vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  img {
    width: 1vh;
    height: 1vh;
  }
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 5vh;
  width: 50%;
  img {
    margin-right: 1vh;
  }
  .title {
    font-size: 3rem;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: flex-end;
  height: 5vh;
  width: 50%;

  .price {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 0.5vh;
  }
`;

const 없다 = styled.div`
  width: 50vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`;

const DayItem = styled.div`
  display: flex;
  flex-direction:row;
  width:100%;
  height:100%;
`

export default function DayConsumptionDetail({
  detailBoxRef,
  dayConsumptionData
}: {
  detailBoxRef: React.RefObject<HTMLDivElement>;
  dayConsumptionData: DayConsumptionDataItem[]; 
}) {

  useEffect(() => {
    const setBoxHeight = () => {
      if (detailBoxRef.current) {
        const itemHeight = 5;
        const itemCount = dayConsumptionData.length;
        const calculatedHeight = itemHeight * itemCount + 4 * itemCount;
        detailBoxRef.current.style.height = `${calculatedHeight}vh`;
      }
    };
    setBoxHeight();
  }, [dayConsumptionData]);

  return (
    dayConsumptionData.length === 0  ? (
  <없다>소비 내역이 없습니다.</없다>
  ) : 
    <ConsumptionDetailBox ref={detailBoxRef}>
      {dayConsumptionData.map((item: DayConsumptionDataItem) => (
        <ConsumptionDetailContainer key={item.paymentId}>
          <DayItem>
          <NameContainer>
            <img src={dot} alt="icon"></img>
            <div className="title">{item.purpose}</div>
          </NameContainer>
          <PriceContainer>
            <div className="price">{item.amount}</div>
            <div className="source">{item.accountId}</div>
          </PriceContainer>
          </DayItem>
        </ConsumptionDetailContainer>
      ))}
    </ConsumptionDetailBox>
  );
}
