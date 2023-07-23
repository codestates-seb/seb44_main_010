import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../../redux/store";

import stockImg from "../../../assets/svg/stock.svg";

const Main = styled.div`
  /* border: 2px solid #e1e1e1; */
  /* margin-bottom: 2rem; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  width: 90%;
  background-color: #b5f2ff;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 1rem;
`;

const Img = styled.div`
  /* border: 2px solid #e1e1e1; */
  /* background-color: #ffffff; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  margin-right: 2rem;
`;

const StockImg = styled.div`
  background: url(${stockImg});
  background-size: 100% 100%;
  background-position: center;

  width: 10rem;
  height: 7rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Total = styled.div`
  font-size: 5rem;
  text-align: center;
  color: #ff4040;
  /* margin-bottom: 2rem; */
  font-weight: 500;
`;

const Text = styled.div`
  font-size: 3rem;
  text-align: center;
  font-weight: 400;
`;

export default function StockBox() {
  const profileStock = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.monthlyResponseDto?.stock;
  });

  function formatNumberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const formattedProfile = formatNumberWithCommas(Number(profileStock));

  const profileTotal = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.monthlyResponseDto?.total;
  });

  const percent = (a: number, b: number) => {
    return Math.floor((a / b) * 100);
  };

  const stockPercent = percent(Number(profileStock), Number(profileTotal));

  return (
    <Main>
      <Container>
        <Title>
          <Img>
            <StockImg />
          </Img>
          <Text>증권 {stockPercent}%</Text>
        </Title>
        <Contents>
          <Total>{formattedProfile}원</Total>
          {/* <Text>지난 달보다 +200,000원</Text> */}
        </Contents>
      </Container>
    </Main>
  );
}
