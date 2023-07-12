import {styled} from "styled-components";
import UserBox from "../components/card/AssetProfile/UserBox";
import ProgressBar from "../components/card/AssetProfile/ProgressBar";
import TotalAssets from "../components/card/AssetProfile/TotalAssets";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 25vw;
  height: 60vh;
  border: 2px solid #e1e1e1;
  border-radius: 3rem;
  background-color: #f5f5ee;
  margin-left: 3rem;
`;

const testData = [
  {bgcolor: "#6a1b9a", completed: 60},
  {bgcolor: "#00695c", completed: 30},
  {bgcolor: "#ef6c00", completed: 10},
];

export default function AssetProfileContainer() {
  return (
    <div>
      <ProfileContainer>
        <UserBox />
        <TotalAssets />
        {testData.map((item, idx) => (
          <ProgressBar key={idx} bgcolor={item.bgcolor} completed={item.completed} />
        ))}
      </ProfileContainer>
    </div>
  );
}
