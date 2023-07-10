// import React from "react";
import styled from "styled-components";
import { Input } from "../components/input/Input";
import { AddButton } from "../components/button/AddButton";
import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
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
  color: ${(props) => (props.color ? "red" : "white")};
  margin-right: 4rem;
  margin-bottom: 3rem;
`;

export default function SignUpContainer() {
  //   const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isValid, setIsValid] = useState({
    isEmail: false,
    isPassword: false,
    isPasswordConfirm: false,
  });

  useEffect(() => {
    const exp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (form.email === "") {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isEmail: true }));
    } else if (exp.test(form.email)) {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isEmail: true }));
    } else {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isEmail: false }));
    }
  }, [form.email]);

  useEffect(() => {
    const exp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;

    if (form.password === "") {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isPassword: true }));
    } else if (exp.test(form.password)) {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isPassword: true }));
    } else {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isPassword: false }));
    }
  }, [form.password]);

  useEffect(() => {
    if (form.passwordConfirm === "") {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isPasswordConfirm: true }));
    } else if (form.password === form.passwordConfirm) {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isPasswordConfirm: true }));
    } else {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isPasswordConfirm: false }));
    }
  }, [form.passwordConfirm, form.password]);

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
        <Star color="red">*</Star>
        <Input type="text" placeholder="이름(실명)" />
      </InputBox>
      <InputBox>
        <Star color="red">*</Star>
        <Input type="email" placeholder="아이디(이메일 형식)" value={form.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })} />
      </InputBox>
      {!isValid.isEmail && (
        <Text size={2} weight={600} color="red" marginBottom={3}>
          아이디가 이메일 형식이 아닙니다
        </Text>
      )}

      <InputBox>
        <Star color="red">*</Star>
        <Input type="password" placeholder="비밀번호 (영문과 숫자 조합, 6자 이상, 15자 이하)" value={form.password} onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })} />
      </InputBox>
      {!isValid.isPassword && (
        <Text size={2} weight={600} color="red" marginBottom={3}>
          비밀번호는 영문과 숫자 조합, 6자 이상,15자 이하여야 합니다.
        </Text>
      )}

      <InputBox>
        <Star color="red">*</Star>
        <Input type="password" placeholder="비밀번호 확인" marginBottom={10} value={form.passwordConfirm} onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, passwordConfirm: e.target.value })} />
      </InputBox>
      {!isValid.isPasswordConfirm && (
        <Text size={2} weight={600} color="red" marginBottom={3}>
          비밀번호가 일치하지 않습니다.
        </Text>
      )}
      <InputBox>
        <Star>*</Star>
        <AddButton backgroundcolor="yellow" width={95} height={10} borderRadius={10} marginBottom={15}>
          가입 완료
        </AddButton>
      </InputBox>
    </Main>
  );
}
