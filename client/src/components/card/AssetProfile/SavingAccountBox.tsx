import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../../redux/store";

import depositImg from "../../../assets/svg/deposit.svg";

const Main = styled.div`
  /* border: 2px solid #e1e1e1; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  width: 90%;
  /* height: 8vh; */
  background-color: #ffeb9b;
  /* margin-bottom: 2rem; */
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

const DepositImg = styled.div`
  background: url(${depositImg});
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

export default function SavingAccountBox() {
  const profileInput = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.monthlyResponseDto?.input;
  });

  function formatNumberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const formattedProfile = formatNumberWithCommas(Number(profileInput));

  const profileTotal = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.monthlyResponseDto?.total;
  });

  const percent = (a: number, b: number) => {
    return Math.floor((a / b) * 100);
  };

  const inputPercent = percent(Number(profileInput), Number(profileTotal));
  return (
    <Main>
      <Container>
        <Title>
          <Img>
            <DepositImg />
          </Img>
          <Text>입출금 {inputPercent}%</Text>
        </Title>
        <Contents>
          <Total>{formattedProfile}원</Total>
          {/* <Text>지난 달보다 -100,000원</Text> */}
        </Contents>
      </Container>
    </Main>
  );
}
