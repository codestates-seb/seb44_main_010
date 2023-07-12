import * as S from "./loginSignUpStyled";
import { styled } from "styled-components";
import { Input } from "../components/input/Input";
import { AddButton } from "../components/button/AddButton";
import { ReactComponent as Google } from "../assets/svg/google.svg";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { login } from "../redux/loginSlice";
import { setLocalStorage } from "../util/localStorage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isPassword: false,
  });
  const dispatch = useDispatch();
  const isLogined = useSelector((state: RootState) => {
    return state.loginSlice.isLogined;
  });
  const navigate = useNavigate();

  if (isLogined) {
    navigate("/");
  }

  const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios
      .post("https://d270-2406-5900-1009-4081-10d0-8abe-25b9-cad3.ngrok-free.app/user/login", {
        userName: email,
        password: password,
      })
      .then((res) => {
        const acessToken: string | undefined = res.headers.authorization;
        const refreshToken: string | undefined = res.headers.refresh;
        const userId = res.data.userId;
        if (typeof acessToken === "string" && typeof refreshToken === "string") {
          dispatch(login({ acessToken, refreshToken }));
          setLocalStorage("refreshToken", refreshToken);
          setLocalStorage("acessToken", acessToken);
          setLocalStorage(userId, userId);
        } else {
          window.alert("로그인에 실패하였습니다.");
        }
      })
      .catch((err) => {
        const errMessage = (err.response as AxiosResponse<{ message: string }>)?.data.message;
        window.alert(errMessage);
      });
  };

  useEffect(() => {
    const exp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (email === "") {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isEmail: true }));
    } else if (exp.test(email)) {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isEmail: true }));
    } else {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isEmail: false }));
    }
  }, [email]);

  useEffect(() => {
    const exp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/; //영문과 숫자 조합, 6자 이상,15자 이하
    // ^(?=.[0-9])(?=.[a-z])(?=.[A-Z])(?=.[@#$%^&+=])(?=\S+$).{8,}$ 숫자, 소문자, 대문자, 특수문자

    if (password === "") {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isPassword: true }));
    } else if (exp.test(password)) {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isPassword: true }));
    } else {
      setIsValid((prevIsValid) => ({ ...prevIsValid, isPassword: false }));
    }
  }, [password]);

  // // google Oauth
  // const url = "https://f5ad-2406-5900-1009-4081-63-4cea-7956-5130.ngrok-free.app/oauth2/authorization/google";
  // const handleOauth = () => {
  //   window.location.href = url;
  // };

  return (
    <S.Main>
      <S.Text size={5} weight={600} margintop={15} marginBottom={3}>
        MONEY MADE에 오신 것을 환영합니다
      </S.Text>
      <S.Text size={3} weight={300} marginBottom={3}>
        평생 무료로 개인 자산을 관리해보세요
      </S.Text>
      <S.Bar />
      <Form onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
        {!isValid.isEmail && (
          <S.Text size={2} weight={600} color="red" marginBottom={3}>
            아이디가 이메일 형식이 아닙니다
          </S.Text>
        )}
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        {!isValid.isPassword && (
          <S.Text size={2} weight={600} color="red" marginBottom={3}>
            비밀번호는 영문과 숫자 조합, 6자 이상,15자 이하여야 합니다.
          </S.Text>
        )}
        <AddButton backgroundcolor="yellow" width={95} height={10} borderRadius={10} marginBottom={3}>
          로그인
        </AddButton>
      </Form>

      <AddButton width={95} height={10} borderRadius={10} marginBottom={9}>
        <Google />
        구글아이디로그인
      </AddButton>
      <S.Text
        size={3}
        weight={300}
        marginBottom={15}
        cursor="pointer"
        onClick={() => {
          navigate("/users/sign_up");
        }}
      >
        아직 회원이 아니신가요?
      </S.Text>
    </S.Main>
  );
}
