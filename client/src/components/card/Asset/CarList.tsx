import styled from "styled-components";
// import axios from "axios";
import { useState, useEffect, useRef } from "react";
// import DeleteIcon from "../../../assets/delete.svg";
import YellowLeft from "../../../assets/yellowleft.svg";
import YellowRight from "../../../assets/yellowright.svg";
import carImg from "../../../assets/Car.svg";

import { ApiResponse, PropertyResponse } from "../../../interface/asset";

// interface Item {
//   id: number;
//   car_name: string;
//   car_amount: number;
// }

interface SavingAccountProps {
  assetdata?: ApiResponse["data"];
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CarList = styled.div`
  display: flex;
  justify-content: center;
`;

const CarContainer = styled.div`
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

const CarName = styled.div`
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

const CarAmount = styled.div`
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

const CarImg = styled.div`
  background: url(${carImg});
  background-size: 100% 100%;
  background-position: center;

  margin-right: 2rem;

  width: 4rem;
  height: 4rem;
`;

export default function Car({ assetdata }: SavingAccountProps) {
  // const [data, setData] = useState<Item[]>([]);
  const [displayedData, setDisplayedData] = useState<PropertyResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carFilter, setCarFilter] = useState<PropertyResponse[]>([]); // carFilter 상태추가
  const CarBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (assetdata) {
      const propertyResponse = assetdata?.propertyResponse;
      const filter = propertyResponse?.filter((e) => {
        return e.propertyType === "차";
      });
      if (filter && filter.length > 0) {
        setDisplayedData(filter.slice(currentIndex, currentIndex + 3));
        setCarFilter(filter);
      }
    }
  }, [assetdata, currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const handleNext = () => {
    if (currentIndex + 3 < (carFilter?.length ?? 0)) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  if (carFilter?.length === 0) {
    return null;
  }

  return (
    <Main ref={CarBoxRef}>
      <CarList>
        {displayedData.map((item) => (
          <CarContainer key={item.propertyId}>
            {/* <Delete onClick={() => handleDelete(item.id)} /> */}
            <Top>
              <CarImg />
              <CarName>{item.title}</CarName>
            </Top>
            <CarAmount>{item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</CarAmount>
          </CarContainer>
        ))}
      </CarList>
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
//     const response = await axios.get("http://localhost:3000/car");
//     const data = response.data;
//     setData(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handleDelete = async (id: number) => {
//   try {
//     await axios.delete(`http://localhost:3000/car/${id}`);
//     getData();
//   } catch (error) {
//     console.log(error);
//   }
// };
