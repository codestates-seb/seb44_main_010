import styled from "styled-components";
import dot from "../../../assets/Rectangle 80.svg";
import { useEffect } from "react";
import { MonthConsumptionDataItem } from "../../../containers/monthConsumptionContainer.tsx";

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
  padding-top: 5rem;
`;

const ConsumptionDetailContainer = styled.div`
  height: auto;
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5rem;
  border-bottom: 1px solid #DDDDDD;

  &:last-child {
    border-bottom: none;
  }



  img {
    width: 1vh;
    height: 1vh;
  }

`;

const DateContainer = styled.div`
  width: 100%;
  height: 5vh;
  font-size: 3rem;
  display: flex;
  align-items: center;
  color: #787878;
  font-weight: 500;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 5vh;
  width: 50%;
  margin-left: 5%;
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
  align-items:center;
  justify-content:center;
  width:100%;
  height:100%;
`

export default function MonthConsumptionDetail({
  detailBoxRef,
  monthConsumptionData,
  groupedData,
}: {
  detailBoxRef: React.RefObject<HTMLDivElement>;
  monthConsumptionData: MonthConsumptionDataItem[];
  groupedData: MonthConsumptionDataItem[][];
}) {
  useEffect(() => {
    const setBoxHeight = () => {
      if (detailBoxRef.current) {
        const itemHeight = 4.5;
        const itemCount = groupedData.reduce((count, group) => count + group.length, 0);
        const calculatedHeight = itemHeight * itemCount + 4 * itemCount;
        detailBoxRef.current.style.height = `${calculatedHeight}vh`;
      }
    };
    setBoxHeight();
  }, [monthConsumptionData]);

  return monthConsumptionData.length === 0 ? (
    <없다>소비 내역이 없습니다.</없다>
  ) : (
    <ConsumptionDetailBox ref={detailBoxRef}>
      {groupedData.map((group, index) => (
        <ConsumptionDetailContainer key={index} >
          <DateContainer>
            {parseInt(group[0].paymentTime.split("-")[2])}일
          </DateContainer> {/* 날짜 표시 */}
          {group.map((item)=> (
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
          ))}
        </ConsumptionDetailContainer>
      ))}
    </ConsumptionDetailBox>
  );
}
