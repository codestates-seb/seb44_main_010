import styled from "styled-components";
import dot from "../../../assets/Rectangle 80.svg";
import { useEffect } from "react";
import { useRef } from "react";
import { CombinedData } from "../../../containers/monthConsumptionContainer.tsx";
import { CombinedItem } from "../../../containers/monthConsumptionContainer.tsx";

const ConsumptionDetailBox = styled.div`
  width: 50vw;
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
  width: 40vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5rem;
  border-bottom: 1px solid #dddddd;

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
  justify-content: center;
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5vh; // 아이템 한개당 정확한 높이를 명시해주기
`;

export default function MonthConsumptionDetail({
  isLoading,
  combinedData,
}: {
  isLoading: boolean;
  combinedData: CombinedData[];
}) {
  const detailBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (detailBoxRef.current) {
      const itemCount =
        combinedData?.reduce(
          (height, group) => height + group.data.length,
          0
        ) || 0;
      const 날짜갯수 = combinedData.length;
      const calculatedHeight = (itemCount + 날짜갯수 * 2 - 7) * 5;
      detailBoxRef.current.style.height = `${calculatedHeight}vh`;
      //console.log(itemCount)
    }
  }, [combinedData]);

  return isLoading === false && combinedData.length === 0 ? (
    <없다>소비 내역이 없습니다.</없다>
  ) : (
    <ConsumptionDetailBox ref={detailBoxRef}>
      {combinedData.map((group, index) => (
        <ConsumptionDetailContainer key={index}>
          <DateContainer>{parseInt(group.date.split("-")[2])}일</DateContainer>
          {group.data.map((item) => renderItem(item))}
          {/* <DayItem>
              <NameContainer>
                <img src={dot} alt="icon" />
                <div className="title">{item.}</div>
              </NameContainer>
              <PriceContainer>
                <div className="price">{item.}</div>
                <div className="source">{item.}</div>
          </PriceContainer>
          </DayItem>*/}
        </ConsumptionDetailContainer>
      ))}
    </ConsumptionDetailBox>
  );
}

function renderItem(item: CombinedItem) {
  if ("bankName" in item) {
    //계좌 데이터 처리
    return (
      <DayItem>
        <NameContainer>
          <img src={dot} alt="icon" />
          <div className="title">{item.paymentResponse.purpose}</div>
        </NameContainer>
        <PriceContainer>
          <div className="price">{item.paymentResponse.amount}</div>
          <div className="source">{item.bankName}</div>
        </PriceContainer>
      </DayItem>
    );
  } else {
    return (
      <DayItem>
        <NameContainer>
          <img src={dot} alt="icon" />
          <div className="title">{item.purpose}</div>
        </NameContainer>
        <PriceContainer>
          <div className="price">{item.amount}</div>
          <div className="source">{item.paymentType}</div>
        </PriceContainer>
      </DayItem>
    );
  }
}
