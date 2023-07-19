import React, { useEffect, useState } from "react";
import * as S from "./loginCompletedPageStyled";
import { AddButton } from "../../components/button/AddButton";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const LoginCompletedPage: React.FC = () => {
  const [useName, setUseName] = useState("");

  const navigate = useNavigate();

  const isLogin = useSelector((state: RootState) => {
    return state.loginSlice.isLogined;
  });

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    } else {
      axios
        .get("/completed")
        .then((res) => setUseName(res.data.userName))
        .catch((err) => {
          const errMessage = (err.response as AxiosResponse<{ message: string }>)?.data.message;
          window.alert(errMessage);
        });
    }
  }, [isLogin, navigate]);

  return (
    <S.Main>
      <S.Container>
        <S.Title fontsize={20} fontweight={700} color="black">
          채명수
          {useName}
          <span>님,</span>
        </S.Title>
        <S.Title fontsize={15} fontweight={500}>
          환영합니다!
        </S.Title>
        <AddButton width={58} height={15} borderRadius={15} fontSize={5} marginTop={30} fontWeight={500} onClick={() => navigate("/")}>
          서비스 시작하기
        </AddButton>
      </S.Container>
    </S.Main>
  );
};

export default LoginCompletedPage;
