import * as S from "./loginSignUpStyled";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import ReCAPTCHA from "react-google-recaptcha";

import { Input } from "../components/input/Input";
import { AddButton } from "../components/button/AddButton";
// import { ReactComponent as Google } from "../assets/svg/google.svg";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { login } from "../redux/loginSlice";
import { setLocalStorage } from "../util/localStorage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CaptchaBox = styled.div`
  margin-bottom: 3rem;
`;

const API_KEY = "6Lc1lGApAAAAAO1b6LrAfODSpMbCULn9TCZu9Q63";

// const API_KEY = import.meta.env.VITE_RECAPTCHA_API_KEY;

// 6LeeeS0nAAAAAOmWGttGqobyMy0ltORyOnLvIA3H

export default function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState({
    isEmail: false,
    isPassword: false,
  });
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaSuccess, setCaptchaSuccess] = useState("");

  // console.log(captchaValue);
  console.log(captchaSuccess);

  const dispatch = useDispatch();
  const isLogined = useSelector((state: RootState) => {
    return state.loginSlice.isLogined;
  });
  const navigate = useNavigate();

  if (isLogined) {
    navigate("/completed");
  }

  const handleLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!captchaValue) {
      window.alert("reCAPTCHA를 완료해 주세요.");
      return;
    }

    if (captchaSuccess === "success") {
      axios
        .post("/user/login", {
          userName: email,
          password: password,
        })
        .then((res) => {
          const acessToken: string | undefined = res.headers.authorization;
          const refreshToken: string | undefined = res.headers.refresh;
          const userName = res.data.username;
          const userId = res.data.userId;
          // console.log(res.headers);
          console.log(res.data);
          if (typeof acessToken === "string" && typeof refreshToken === "string") {
            dispatch(login({ acessToken, refreshToken }));
            setLocalStorage("acessToken", acessToken);
            setLocalStorage("refreshToken", refreshToken);
            setLocalStorage("username", userName);
            setLocalStorage("userId", userId);
          } else {
            window.alert("로그인에 실패하였습니다.");
          }
        })
        .catch((err) => {
          const errMessage = (err.response as AxiosResponse<{ message: string }>)?.data.message;
          window.alert(errMessage);
        });
    } else {
      window.alert("reCAPTCHA 인증에 실패하였습니다. 다시 시도해주세요.");
    }
  };

  const handleCaptcha = (value: string | null) => {
    if (typeof value === "string") {
      setCaptchaValue(value);
      axios
        .post(`/user/captcha?token=${value}`)
        .then((res) => {
          // console.log(res.data);
          setCaptchaSuccess(res.data);
        })
        .catch((err) => {
          const errMessage = (err.response as AxiosResponse<{ message: string }>)?.data.message;
          console.error(errMessage);
        });
    }
  };

  const handleCaptchaExpired = () => {
    setCaptchaSuccess("");
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

  return (
    <S.Main>
      <S.Text size={5} weight={600} margintop={10} marginBottom={3}>
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
          width={70}
          marginBottom={3}
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
          width={70}
          marginBottom={3}
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
        <CaptchaBox>
          <ReCAPTCHA sitekey={API_KEY} onChange={handleCaptcha} onExpired={handleCaptchaExpired} />
        </CaptchaBox>
        {captchaSuccess === "success" ? (
          <AddButton backgroundcolor="yellow" width={95} height={10} borderRadius={10} marginBottom={3}>
            로그인
          </AddButton>
        ) : null}
      </Form>
      {/* <AddButton
        width={95}
        height={10}
        borderRadius={10}
        marginBottom={9}
        onClick={() => {
          handleTest;
        }}
      >
        구글아이디로그인
      </AddButton> */}
      <S.Text
        size={3}
        weight={300}
        marginBottom={10}
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
