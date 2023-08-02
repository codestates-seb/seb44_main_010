import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../../redux/store";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  height: 10vh;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50vw;
  margin: 5rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const TotalName = styled.div`
  font-size: 5rem;
  font-weight: 600;
  text-align: center;
  color: #3f74b2;
  margin-bottom: 2rem;
`;

const TotalAsset = styled.div`
  font-size: 5rem;
  font-weight: 600;
  color: #414141;
`;

export default function TotalAssetsBox() {
  const profileTotal = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.monthlyResponseDto?.total;
  });
  function formatNumberWithCommas(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const formattedProfile = formatNumberWithCommas(Number(profileTotal));
  return (
    <Main>
      <TotalContainer>
        <Title>
          <TotalName>총 자산</TotalName>
          <TotalAsset>{formattedProfile}원</TotalAsset>
        </Title>
      </TotalContainer>
    </Main>
  );
}
