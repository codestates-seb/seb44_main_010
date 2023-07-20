import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState } from "../../../redux/store";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3rem;
  width: 20vw;
  background-color: #ffffff;
  border: 1px solid;
  height: 15vh;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 20vw;
  margin: 5rem;
  height: 15vh;
  border: 1px solid;
`;

const UserImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 20rem;
  border: 2px solid #e1e1e1;
  border-radius: 50%;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const UserName = styled.div`
  font-size: 6rem;
`;

const Text = styled.div`
  font-size: 3rem;
  margin-top: 5rem;
`;

export default function UserBox() {
  const profileName = useSelector((state: RootState) => {
    return state.proFile.data.userResponseDto.name;
  });
  // const accountsList = profileName?.accountsList;
  // console.log(profileName);
  return (
    <Main>
      <UserContainer>
        <UserImg>프로필 사진</UserImg>
        <Title>
          <UserName>{profileName}님</UserName>
          <Text>좋은 하루 되세요!</Text>
        </Title>
      </UserContainer>
    </Main>
  );
}
