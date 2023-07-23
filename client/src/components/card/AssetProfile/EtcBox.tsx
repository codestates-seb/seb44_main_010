import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../../redux/store";

import etcImg from "../../../assets/svg/etc.svg";

const Main = styled.div`
  /* border: 2px solid #e1e1e1; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10rem;
  width: 90%;
  background-color: #c5f2ba;
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

const EtcImg = styled.div`
  background: url(${etcImg});
  background-size: 100% 100%;
  background-position: center;

  width: 8rem;
  height: 6rem;
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

export default function EtcBox() {
  const profileEtc = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.monthlyResponseDto?.etc;
  });

  function formatNumberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const formattedProfile = formatNumberWithCommas(Number(profileEtc));

  const profileTotal = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.monthlyResponseDto?.total;
  });

  const percent = (a: number, b: number) => {
    return Math.floor((a / b) * 100);
  };

  const etcPercent = percent(Number(profileEtc), Number(profileTotal));
  return (
    <Main>
      <Container>
        <Title>
          <Img>
            <EtcImg />
          </Img>
          <Text>기타 {etcPercent}%</Text>
        </Title>
        <Contents>
          <Total>{formattedProfile}원</Total>
          {/* <Text>지난 달보다 -10,000원</Text> */}
        </Contents>
      </Container>
    </Main>
  );
}
