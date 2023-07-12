import {styled} from "styled-components";

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #e1e1e1;
  border-radius: 3rem;
  width: 90%;
  background-color: #ffffff;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 50vw;
  margin: 5rem;
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
  return (
    <Main>
      <UserContainer>
        <UserImg>프로필 사진</UserImg>
        <Title>
          <UserName>OOO님</UserName>
          <Text>좋은 하루 되세요!</Text>
        </Title>
      </UserContainer>
    </Main>
  );
}
