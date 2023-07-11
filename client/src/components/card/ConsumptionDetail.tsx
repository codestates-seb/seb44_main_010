import styled from "styled-components";
import dot from "../../assets/Rectangle 80.svg";
import axios from "axios";
import { useState, useEffect } from "react";

const ConsumptionDetailBox = styled.div`
  width: 50vw;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #DDDDDD;
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

interface Item {
  id: number;
  title: string;
  price: number;
  source: string;
}

export default function ConsumptionDetail({detailBoxRef}) {
  const [data, setData] = useState([]);
 

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setBoxHeight();
  }, [data]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      const data = response.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setBoxHeight = () => {
    if (detailBoxRef.current) {
      const itemHeight = 5;
      const itemCount = data.length;
      const calculatedHeight = itemHeight * itemCount + itemHeight * 2;
      detailBoxRef.current.style.height = `${calculatedHeight}vh`;
    }
  };

  return (
    <ConsumptionDetailBox ref={detailBoxRef}>
      {data.map((item: Item) => (
        <ConsumptionDetailContainer key={item.id}>
          <NameContainer>
            <img src={dot} alt="icon"></img>
            <div className="title">{item.title}</div>
          </NameContainer>
          <PriceContainer>
            <div className="price">{item.price}</div>
            <div className="source">{item.source}</div>
          </PriceContainer>
        </ConsumptionDetailContainer>
      ))}
    </ConsumptionDetailBox>
  );
}
