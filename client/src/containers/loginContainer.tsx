// import React from "react";
import { styled } from "styled-components";
import { Input } from "../components/input/Input";
import { AddButton } from "../components/button/AddButton";
import { ReactComponent as Google } from "../assets/svg/google.svg";
import { useNavigate } from "react-router-dom";

interface StyledProps {
  size: number;
  weight: number;
  margintop?: number;
  marginBottom?: number;
  cursor?: string;
}

const Main = styled.div`
  background-color: white;
  width: 132rem;
  /* height: 119rem; */
  border-radius: 6rem;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.div<StyledProps>`
  cursor: ${(props) => props.cursor && `${props.cursor}`};
  margin-top: ${(props) => props.margintop && `${props.margintop}rem`};
  font-size: ${(props) => props.size && `${props.size}rem`};
  font-weight: ${(props) => props.weight && `${props.weight}`};
  margin-bottom: ${(props) => props.marginBottom && `${props.marginBottom}rem`};
`;

const Bar = styled.div`
  width: 23rem;
  height: 1rem;
  background-color: #ffce0b;
  margin: 3rem 0px 7rem 0px;
`;

export default function LoginContainer() {
  const navigate = useNavigate();

  return (
    <Main>
      <Text size={5} weight={600} margintop={15} marginBottom={3}>
        MONEY MADE에 오신 것을 환영합니다
      </Text>
      <Text size={3} weight={300} marginBottom={3}>
        평생 무료로 개인 자산을 관리해보세요
      </Text>
      <Bar />
      <Input type="text" placeholder="이메일을 입력해주세요." />
      <Input type="text" placeholder="비밀번호를 입력해주세요." />
      <AddButton backgroundcolor="yellow" width={95} height={10} borderRadius={10} marginBottom={3}>
        로그인
      </AddButton>
      <AddButton width={95} height={10} borderRadius={10} marginBottom={9}>
        <Google />
        구글아이디로그인
      </AddButton>
      <Text
        size={3}
        weight={300}
        marginBottom={15}
        cursor="pointer"
        onClick={() => {
          navigate("/users/sign_up");
        }}
      >
        아직 회원이 아니신가요?
      </Text>
    </Main>
  );
}
