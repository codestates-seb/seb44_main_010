import React, { useEffect, useState } from "react";
import * as S from "./loginCompletedPageStyled";
import { AddButton } from "../../components/button/AddButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginCompletedPage: React.FC = () => {
  const [useName, setUseName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/completed").then((res) => setUseName(res.data.userName));
  }, []);

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
