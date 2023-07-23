import React, { useEffect, useState } from "react";
import * as S from "./loginCompletedPageStyled";
import { AddButton } from "../../components/button/AddButton";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { getLocalstorage } from "../../util/localStorage";
import { addProfile } from "../../redux/profileSlice";

const LoginCompletedPage: React.FC = () => {
  const [useName, setUseName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const reduxTest = useSelector((state: RootState) => {
  //   return state.proFile;
  // });
  // console.log(reduxTest);

  const isLogin = useSelector((state: RootState) => {
    return state.loginSlice.isLogined;
  });

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    } else {
      setUseName(getLocalstorage("username"));
    }
  }, [isLogin, navigate]);

  const handleService = () => {
    const currentData = new Date();
    const currentMonth = currentData.getMonth() + 1;
    const userId = getLocalstorage("userId");
    const acessToken = getLocalstorage("acessToken");

    axios.defaults.headers.common["Authorization"] = acessToken;
    axios
      .get(`/asset/myInfo/${userId}/${currentMonth}`, {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((res) => {
        // console.log(res.data);
        dispatch(addProfile(res.data));
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = (err.response as AxiosResponse<{ message: string }>)?.data.message;
          window.alert(errMessage);
        } else {
          console.error(err);
          window.alert("An unknown error occurred.");
        }
      });

    navigate("/");
  };

  return (
    <S.Main>
      <S.Container>
        <S.Title fontsize={20} fontweight={700} color="black">
          {/* 채명수 */}
          {useName}
          <span>님,</span>
        </S.Title>
        <S.Title fontsize={15} fontweight={500}>
          환영합니다!
        </S.Title>
        <AddButton width={58} height={15} borderRadius={15} fontSize={5} marginTop={30} fontWeight={500} onClick={handleService}>
          서비스 시작하기
        </AddButton>
      </S.Container>
    </S.Main>
  );
};

export default LoginCompletedPage;
