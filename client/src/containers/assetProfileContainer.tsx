import {styled} from "styled-components";
import UserBox from "../components/card/AssetProfile/UserBox";
import TotalAssetsBox from "../components/card/AssetProfile/TotalAssetsBox";
import AssetDoughnutChart from "../components/chart/AssetDoughnutChart";
import SavingAccountBox from "../components/card/AssetProfile/SavingAccountBox";
import StockBox from "../components/card/AssetProfile/StockBox";
import EtcBox from "../components/card/AssetProfile/EtcBox";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 25vw;
  height: 100%;
  border: 2px solid #e1e1e1;
  border-radius: 3rem;
  background-color: #f5f5ee;
  margin-left: 3rem;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

export default function AssetProfileContainer() {
  return (
    <div>
      <ProfileContainer>
        <UserBox />
        <TotalAssetsBox />
        <AssetDoughnutChart />
        <SavingAccountBox />
        <StockBox />
        <EtcBox />
      </ProfileContainer>
    </div>
  );
}
