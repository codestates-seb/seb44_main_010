import * as S from "./loginSignUpStyled";
import styled from "styled-components";
import { Input } from "../components/input/Input";
import { AddButton } from "../components/button/AddButton";
import { useEffect, useState } from "react";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { login } from "../redux/loginSlice";
import { setLocalStorage } from "../util/localStorage";

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const RequiredText = styled(S.Text)`
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
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isPassword: false,
    isPasswordConfirm: false,
  });

  const dispatch = useDispatch();
  const isLogined = useSelector((state: RootState) => {
    return state.loginSlice.isLogined;
  });
  const navigate = useNavigate();

  if (isLogined) {
    navigate("/");
  }

  const handleSignUp: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (isValid.isEmail && isValid.isPassword && isValid.isPasswordConfirm) {
      axios
        .post("/user/sign-up", {
          name: form.name,
          email: form.email,
          password: form.password,
        })
        .then((res) => {
          const acessToken = res.headers.authorization;
          const refreshToken = res.headers.refresh;
          const userId = res.data.userId;

          dispatch(login({ acessToken, refreshToken }));
          setLocalStorage("refreshToken", refreshToken);
          setLocalStorage("acessToken", acessToken);
          setLocalStorage("userId", userId);
          navigate("/");
        })
        .catch((err) => {
          const errMessage = (err.response as AxiosResponse<{ message: string }>)?.data.message;
          window.alert(errMessage);
        });
    } else {
      window.alert("회원가입에 실패하였습니다.");
    }
  };

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
    const exp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/; //영문과 숫자 조합, 6자 이상,15자 이하
    // ^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[@#$%^&+=])(?=\S+$).{8,}$ 숫자, 소문자, 대문자, 특수문자

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
    <S.Main>
      <S.Text size={5} weight={600} margintop={15} marginBottom={3}>
        MONEY MADE에 오신 것을 환영합니다
      </S.Text>
      <S.Text size={3} weight={300} marginBottom={3}>
        평생 무료로 개인 자산을 관리해보세요
      </S.Text>
      <S.Bar />
      <S.Text size={5} weight={600} marginBottom={3}>
        회원가입
      </S.Text>

      <InputBox>
        <RequiredText size={2} weight={300} color="red" marginBottom={3}>
          * 표는 필수 항목입니다.
        </RequiredText>
        <Star color="red">*</Star>
        <Input type="text" placeholder="이름(실명)" value={form.name} onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })} />
      </InputBox>
      <InputBox>
        <Star color="red">*</Star>
        <Input type="email" placeholder="아이디(이메일 형식)" value={form.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })} />
      </InputBox>
      {!isValid.isEmail && (
        <S.Text size={2} weight={600} color="red" marginBottom={3}>
          아이디가 이메일 형식이 아닙니다
        </S.Text>
      )}

      <InputBox>
        <Star color="red">*</Star>
        <Input type="password" placeholder="비밀번호 (영문과 숫자 조합, 6자 이상, 15자 이하)" value={form.password} onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, password: e.target.value })} />
      </InputBox>
      {!isValid.isPassword && (
        <S.Text size={2} weight={600} color="red" marginBottom={3}>
          비밀번호는 영문과 숫자 조합, 6자 이상,15자 이하여야 합니다.
        </S.Text>
      )}

      <InputBox>
        <Star color="red">*</Star>
        <Input type="password" placeholder="비밀번호 확인" marginBottom={10} value={form.passwordConfirm} onChange={(e: ChangeEvent<HTMLInputElement>) => setForm({ ...form, passwordConfirm: e.target.value })} />
      </InputBox>
      {!isValid.isPasswordConfirm && (
        <S.Text size={2} weight={600} color="red" marginBottom={3}>
          비밀번호가 일치하지 않습니다.
        </S.Text>
      )}
      <InputBox>
        <Star>*</Star>
        <AddButton backgroundcolor="yellow" width={95} height={10} borderRadius={10} marginBottom={15} onClick={handleSignUp}>
          가입 완료
        </AddButton>
      </InputBox>
    </S.Main>
  );
}
