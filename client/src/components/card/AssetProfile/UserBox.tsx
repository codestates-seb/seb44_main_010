import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../../redux/store";

import profileImg from "../../../assets/svg/profile1.svg";

const Main = styled.div`
  /* border: 1px solid; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3rem;
  background-color: #ffffff;
  /* width: 20vw; */
  /* height: 15vh; */
`;

const UserContainer = styled.div`
  /* border: 1px solid; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3rem 10rem 3rem 10rem;
  /* width: 80%; */
  /* height: 15vh; */
`;

const UserImg = styled.div`
  /* border: 2px solid #e1e1e1; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
`;

const ProfileImg = styled.div`
  background: url(${profileImg});
  background-size: 100% 100%;
  background-position: center;

  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  margin-left: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const UserName = styled.div`
  font-weight: 600;
  font-size: 6rem;

  span {
    font-size: 6rem;
    font-weight: 300;
  }
`;

const Text = styled.div`
  font-size: 3rem;
  margin-top: 2rem;
`;

export default function UserBox() {
  const profileName = useSelector((state: RootState) => {
    return state.proFile.profileData?.data?.userResponseDto?.name;
  });
  // console.log(profileName);
  return (
    <Main>
      <UserContainer>
        <UserImg>
          <ProfileImg />
        </UserImg>
        <Title>
          <UserName>
            {profileName}
            <span>님</span>
          </UserName>
          <Text>좋은 하루 되세요!</Text>
        </Title>
      </UserContainer>
    </Main>
  );
}
