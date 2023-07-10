// import React from "react";
import styled from "styled-components";
import { Input } from "../components/input/Input";
import { AddButton } from "../components/button/AddButton";
// import { useNavigate } from "react-router-dom";

interface StyledProps {
  size: number;
  weight: number;
  margintop?: number;
  marginBottom?: number;
  cursor?: string;
  color?: string;
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
  cursor: ${(props) => (props.cursor ? `${props.cursor}` : null)};
  margin-top: ${(props) => (props.margintop ? `${props.margintop}rem` : null)};
  font-size: ${(props) => (props.size ? `${props.size}rem` : null)};
  font-weight: ${(props) => (props.weight ? `${props.weight}` : null)};
  margin-bottom: ${(props) => (props.marginBottom ? `${props.marginBottom}rem` : null)};
  color: ${(props) => (props.color ? `${props.color}` : null)};
`;

const Bar = styled.div`
  width: 23rem;
  height: 1rem;
  background-color: #ffce0b;
  margin: 3rem 0px 7rem 0px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const RequiredText = styled(Text)`
  position: absolute;
  top: -3rem;
  right: 0;
`;

const Star = styled.div`
  font-size: 4rem;
  color: red;
  margin-right: 4rem;
  margin-bottom: 3rem;
`;

export default function SignUpContainer() {
  //   const navigate = useNavigate();

  return (
    <Main>
      <Text size={5} weight={600} margintop={15} marginBottom={3}>
        MONEY MADE에 오신 것을 환영합니다
      </Text>
      <Text size={3} weight={300} marginBottom={3}>
        평생 무료로 개인 자산을 관리해보세요
      </Text>
      <Bar />
      <Text size={5} weight={600} marginBottom={3}>
        회원가입
      </Text>

      <InputBox>
        <RequiredText size={2} weight={300} color="red" marginBottom={3}>
          * 표는 필수 항목입니다.
        </RequiredText>
        <Star>*</Star>
        <Input type="text" placeholder="이름(실명)" />
      </InputBox>
      <InputBox>
        <Star>*</Star>
        <Input type="text" placeholder="아이디(이메일 형식)" />
      </InputBox>
      <Text size={2} weight={600} color="red" marginBottom={3}>
        아이디가 이메일 형식이 아닙니다/ 중복된 아이디 입니다
      </Text>
      <InputBox>
        <Star>*</Star>
        <Input type="text" placeholder="비밀번호 (영문과 숫자 조합, 6자 이상, 15자 이하)" />
      </InputBox>
      <Text size={2} weight={600} color="red" marginBottom={3}>
        비밀번호가 6자 이상이어야 합니다.
      </Text>

      <InputBox>
        <Star>*</Star>
        <Input type="text" placeholder="비밀번호 확인" marginBottom={10} />
      </InputBox>
      <Text size={2} weight={600} color="red" marginBottom={3}>
        비밀번호가 일치하지 않습니다.
      </Text>
      <AddButton backgroundcolor="yellow" width={95} height={10} borderRadius={10} marginBottom={15}>
        가입 완료
      </AddButton>
    </Main>
  );
}
