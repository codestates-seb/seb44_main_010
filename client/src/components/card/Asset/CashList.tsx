import styled from "styled-components";
// import axios from "axios";
import { useState, useEffect, useRef } from "react";
// import DeleteIcon from "../../../assets/delete.svg";
import YellowLeft from "../../../assets/yellowleft.svg";
import YellowRight from "../../../assets/yellowright.svg";
import cashImg from "../../../assets/Cash.svg";
import { ApiResponse, PropertyResponse } from "../../../interface/asset";

// interface Item {
//   id: number;
//   cash_name: string;
//   cash_amount: number;
// }

interface SavingAccountProps {
  assetdata?: ApiResponse["data"];
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CashList = styled.div`
  display: flex;
  justify-content: center;
`;

const CashContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 8vh;
  width: 8vw;
  border-radius: 3rem;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  border: 1px solid #d9d9d9;
  padding: 3rem;
  margin: 5rem;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
`;

const CashName = styled.div`
  font-size: 3.5rem;
  margin: 2rem;
  color: #414141;
`;

// const Delete = styled.div`
//   cursor: pointer;
//   width: 3rem;
//   height: 3rem;
//   background-image: url(${DeleteIcon});
//   background-size: cover;
//   background-repeat: no-repeat;
//   margin-left: 10rem;
// `;

const CashAmount = styled.div`
  font-size: 3.5rem;
`;

const PageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeftButton = styled.img`
  cursor: pointer;
  margin-right: 5rem;
`;

const RightButton = styled.img`
  cursor: pointer;
  margin-left: 5rem;
`;

export default function Cash({ assetdata}: SavingAccountProps) {
  // const [data, setData] = useState<Item[]>([]);
  const [displayedData, setDisplayedData] = useState<PropertyResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cashFilter, setCashFilter] = useState<PropertyResponse[]>([]); // cashFilter 상태추가
  const CashBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (assetdata) {
      const propertyResponse = assetdata?.propertyResponse;
      const filter = propertyResponse?.filter((e) => {
        return e.propertyType === "현금";
      });
      if (filter && filter.length > 0) {
        setDisplayedData(filter.slice(currentIndex, currentIndex + 3));
        setCashFilter(filter);
      }
    }
  }, [assetdata, currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const handleNext = () => {
    if (currentIndex + 3 < (cashFilter?.length ?? 0)) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  if (cashFilter?.length === 0) {
    return null;
  }

  const CashImg = styled.div`
    background: url(${cashImg});
    background-size: 100% 100%;
    background-position: center;

    margin-right: 2rem;

    width: 4rem;
    height: 4rem;
  `;

  return (
    <Main ref={CashBoxRef}>
      <CashList>
        {displayedData.map((item) => (
          <CashContainer key={item.propertyId}>
            {/* <Delete onClick={() => handleDelete(item.id)} /> */}
            <Top>
              <CashImg />
              <CashName>{item.title}</CashName>
            </Top>
            <CashAmount>{item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</CashAmount>
          </CashContainer>
        ))}
      </CashList>
      <PageButton>
        <LeftButton src={YellowLeft} alt="Left" onClick={handlePrevious} />
        <RightButton src={YellowRight} alt="Right" onClick={handleNext} />
      </PageButton>
    </Main>
  );
}

// useEffect(() => {
//   getData();
// }, []);

// const getData = async () => {
//   try {
//     const response = await axios.get("http://localhost:3000/cash");
//     const data = response.data;
//     setData(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handleDelete = async (id: number) => {
//   try {
//     await axios.delete(`http://localhost:3000/cash/${id}`);
//     getData();
//   } catch (error) {
//     console.log(error);
//   }
// };
