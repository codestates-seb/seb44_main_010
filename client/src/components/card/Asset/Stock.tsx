import styled from "styled-components";
import axios from "axios";
import {useState, useEffect, useRef} from "react";
import DeleteIcon from "../../../assets/delete.svg";
import YellowLeft from "../../../assets/yellowleft.svg";
import YellowRight from "../../../assets/yellowright.svg";

interface Item {
  id: number;
  stock_name: string;
  stock_amount: number;
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StockList = styled.div`
  display: flex;
  justify-content: center;
`;

const StockContainer = styled.div`
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
`;

const StockName = styled.div`
  font-size: 4rem;
  margin: 2rem;
  color: #414141;
`;

const Delete = styled.div`
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  background-image: url(${DeleteIcon});
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 10rem;
`;

const StockAmount = styled.div`
  font-size: 4rem;
`;

const EmptyText = styled.div`
  font-size: 3rem;
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
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

export default function Stock() {
  const [data, setData] = useState<Item[]>([]);
  const [displayedData, setDisplayedData] = useState<Item[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const StockBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setDisplayedData(data.slice(currentIndex, currentIndex + 3));
    }
  }, [data, currentIndex]);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/stock");
      const data = response.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/stock/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const handleNext = () => {
    if (currentIndex + 3 < data.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  return (
    <Main ref={StockBoxRef}>
      {displayedData.length > 0 ? (
        <StockList>
          {displayedData.map((item: Item) => (
            <StockContainer key={item.id}>
              <Top>
                <StockName>{item.stock_name}</StockName>
                <Delete onClick={() => handleDelete(item.id)} />
              </Top>
              <StockAmount>{item.stock_amount}원</StockAmount>
            </StockContainer>
          ))}
        </StockList>
      ) : (
        <EmptyText>표시할 내용이 없습니다.</EmptyText>
      )}
      <PageButton>
        <LeftButton src={YellowLeft} alt="Left" onClick={handlePrevious} />
        <RightButton src={YellowRight} alt="Right" onClick={handleNext} />
      </PageButton>
    </Main>
  );
}
