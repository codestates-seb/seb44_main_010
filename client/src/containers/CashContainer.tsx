import { useState } from "react";
import styled from "styled-components";
import { AddButton } from "../components/button/AddButton";
import Cash from "../../src/assets/Cash.svg";
import axios, { AxiosResponse } from "axios";
import { getLocalstorage, setLocalStorage } from "../util/localStorage";
import { useDispatch } from "react-redux";
import { incrementRefreshKey } from "../redux/refreshSlice";

const Main = styled.div`
  position: absolute;
  top: 0;
  left: 2px;
  width: 25vw;
  height: 60vh;
  background-color: #277dc7;
  margin-left: 3rem;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  border: 2px #dddddd;
  border-radius: 3rem;
  z-index: 3;
  margin-top: 170rem;
`;

const Title = styled.div`
  width: 25vw;
  height: 8vh;
  font-size: 5rem;
  font-weight: 500;
  color: #277dc7;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const InputThings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 80%;
`;

const CashImg = styled.img`
  width: 20vw;
  height: 20vh;
`;

const TitleInput = styled.input`
  width: 80%;
  height: 3rem;
  border: 1px solid #c9c9c9;
  border-radius: 2rem;
  padding: 2rem 2rem;
  font-family: "SCDream", sans-serif;
`;

const PriceInput = styled.input`
  width: 67%;
  height: 3rem;
  border: 1px solid #c9c9c9;
  border-radius: 2rem;
  padding: 2rem 2rem;
  font-family: "SCDream", sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2rem 0rem;

  .title {
    font-size: 3rem;
    font-weight: 400;
    color: white;
    display: flex;
    align-items: center;
  }

  .단위 {
    font-size: 4rem;
    font-weight: 400;
    color: white;
    width: 7rem;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 65%;
`;

type CloseModalFunction = () => void;

export default function CashContainer({ closeModal, propertyType }: { closeModal: CloseModalFunction; propertyType: string }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const userId = getLocalstorage("userId");
  const dispatch = useDispatch();

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const priceValue = isNaN(value) ? null : value;
    setPrice(priceValue);
  };

  const handleCancelClick = () => {
    setTitle("");
    setPrice(null);
    closeModal();
  };

  const handleAddClick = () => {
    // 이 부분에 axios요청으로 데이터를 넣어줘야 할 것 같음
    const Cashdata = {
      title: title,
      content: "내용임",
      amount: price,
      userId: userId,
      propertyType: propertyType,
    };
    // const acessToken = getLocalstorage("acessToken");
    // axios.defaults.headers.common["Authorization"] = acessToken;
    axios
      .post("/property/post", Cashdata, {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(incrementRefreshKey());
        closeModal();
        setLocalStorage("propertyId", res.data.data.propertyId); //propertyId 로컬스토리지에 저장
      })
      .catch((err) => {
        if (err.response) {
          const errMessage = (err.response as AxiosResponse<{ message: string }>)?.data.message;
          window.alert(errMessage);
          console.log(errMessage);
        } else {
          console.error(err);
          window.alert("알 수없는 오류가 발생했습니다.");
        }
      });
  };

  return (
    <Main onClick={handleContainerClick}>
      <Title>내역입력</Title>
      <InputThings>
        <CashImg src={Cash}></CashImg>
        <InputContainer>
          <div className="title">제목</div>
          <TitleInput onChange={handleTitleChange} placeholder="제목을 입력하세요." value={title} />
        </InputContainer>
        <InputContainer>
          <div className="title">금액</div>
          <PriceInput onChange={handlePriceChange} placeholder="금액을 입력하세요." value={price !== null ? price : ""} />
          <div className="단위">원</div>
        </InputContainer>
        <ButtonContainer>
          <AddButton onClick={handleCancelClick} width={20} height={8} backgroundcolor="white" borderRadius={50}>
            취소하기
          </AddButton>
          <AddButton onClick={handleAddClick} width={20} height={8} backgroundcolor="yellow" borderRadius={50}>
            추가하기
          </AddButton>
        </ButtonContainer>
      </InputThings>
    </Main>
  );
}
