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
  height: 5vh;
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
  width: 15vw;
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
  align-items: flex-end;
  height: 5vh;
  width: 10vw;

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
        const calculatedHeight = itemHeight * itemCount + itemHeight * 2;
        detailBoxRef.current.style.height = `${calculatedHeight}vh`;
      }
    };
    setBoxHeight();
  }, [dayConsumptionData]);

  return dayConsumptionData.length === 0 ? (
    <없다>소비 내역이 없습니다.</없다>
  ) : (
    <ConsumptionDetailBox ref={detailBoxRef}>
      {dayConsumptionData.map((item: DayConsumptionDataItem) => (
        <ConsumptionDetailContainer key={item.paymentId}>
          <NameContainer>
            <img src={dot} alt="icon"></img>
            <div className="title">{item.category}</div>
          </NameContainer>
          <PriceContainer>
            <div className="price">{item.amount}</div>
            <div className="source">{item.purpose}</div>
          </PriceContainer>
        </ConsumptionDetailContainer>
      ))}
    </ConsumptionDetailBox>
  );
}
