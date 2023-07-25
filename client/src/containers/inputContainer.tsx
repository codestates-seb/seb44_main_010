//(외부라이브러리,서드파티,우리가 안만든거 - asset, style - component - api, util, hook )
import styled from "styled-components";
import { useState } from "react";
import checkBox from "../assets/checkbox.svg";
import yellowBox from "../assets/yellow.svg";
import Dateimg from "../assets/svg/date.svg";

import { AddButton } from "../components/button/AddButton";
import { ContentInput, PriceInput } from "../components/input/ConsumptionInput";
import DateInput from "../components/input/DateInput";
import { CustomSelect } from "../components/input/ConsumptionInput";
import { dayUpload } from "../api/index";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const InputWrapper = styled.div`
  width: 25vw;
  height: 68vh;
  background-color: #277dc7;
  margin-left: 3rem;
  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
  border: 1px #dddddd;
  border-radius: 3rem;
  z-index: 3;
`;

export const Title = styled.div`
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

export const Text = styled.div`
  font-size: 3rem;
  margin-left: -1.5rem;
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0rem;

  .title {
    font-size: 3rem;
    font-weight: 400;
    color: white;
    margin-bottom: 0.5rem;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 64rem;
  height: 7vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 2rem 0rem;
  margin-top: 3rem;

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

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 64rem;
  display: flex;
  justify-content: space-around;
  margin: 2rem 0rem;

  .title {
    font-size: 3rem;
    font-weight: 400;
    color: white;
    display: flex;
    align-items: center;
  }

  input {
    height: 3rem;
    width: 40rem;
    border-radius: 2rem;
    padding: 2rem 2rem;
    font-family: "SCDream", sans-serif;
    border: 1px solid #c9c9c9;
  }

  .react-datepicker {
    width: 30rem;
    height: 36rem;
    font-size: 5rem;
  }

  .react-datepicker__month-container {
    width: 30rem;
    height: 30rem;
    font-size: 5rem;
  }
  .react-datepicker__month {
    margin-top: 5rem;
  }
  .react-datepicker__header {
    height: 3rem;
  }
  .react-datepicker__day {
    color: #000;
    display: inline-block;
    width: 3rem;
    line-height: 3rem;
    text-align: center;
    margin: 0.5rem;
  }
  .react-datepicker__day-name {
    width: 4rem;
    line-height: 3rem;
    font-weight: 400;
    font-size: 2.5rem;
    margin-top: 3rem;
  }
  .react-datepicker__current-month {
    font-size: 3rem;
  }
`;

export const ButtonAlignment = styled.div`
  display: flex;
  flex-direction: row;
  width: 64rem;
  height: 12rem;
  justify-content: space-evenly;
  padding-left: 5rem;
  padding-right: 5rem;
  align-items: center;
  margin-top: 3rem;
`;

export const InputThings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SignupButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 5rem;
  width: 70%;
  height: 7rem;

  button {
    font-size: 3.5rem;
    font-weight: 500;
    font-family: "SCDream", sans-serif;
  }
`;

type OptionType = { value: string; label: string };
type HandleFetchDataFunction = () => void;

interface InputContaienrProps {
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
  handleFetchData: HandleFetchDataFunction;
}

export default function InputContaine({ setShowInput, handleFetchData }: InputContaienrProps) {
  const [expenditureSelected, setExpenditureSelected] = useState(false);
  const [category, setCategory] = useState<OptionType | null>(null);
  const [content, setContent] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const propertyResponse = useSelector((state: RootState) => {
    return state.proFile.profileData?.data.propertyResponse;
  });
  const propertyFilter = propertyResponse?.find((el) => {
    return el.propertyType === "현금";
  });
  const propertyId = propertyFilter?.propertyId || null;

  const handleExpenditureClick = () => {
    setExpenditureSelected(!expenditureSelected);
  };

  const categoryOptions: OptionType[] = [
    { value: "월급", label: "월급" },
    { value: "투자", label: "투자" },
    { value: "식비", label: "식비" },
    { value: "주거", label: "주거" },
    { value: "쇼핑", label: "쇼핑" },
    { value: "문화", label: "문화" },
    { value: "교통", label: "교통" },
    { value: "의료", label: "의료" },
    { value: "기타", label: "기타" },
  ];

  const handleCategoryChange = (option: OptionType | null) => {
    setCategory(option);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const priceValue = isNaN(value) ? null : value; // isNaN(value)일 경우 null로 설정합니다.
    setPrice(priceValue);
  };

  const handleCancelClick = () => {
    // 입력창을 안보이게 합니다
    setShowInput(false);
  };

  const offset = new Date().getTimezoneOffset() * 60000;

  const handleAddClick = () => {
    //데이터 객체 생성
    const Consumptiondata = {
      paymentTime: selectedDate ? new Date(selectedDate.getTime() - offset).toISOString() : null,
      paymentType: "현금",
      amount: price !== null ? (expenditureSelected ? -price : price) : null,
      category: category?.value || "",
      purpose: content ? content : "",
      propertyId: propertyId, // 자산에서 처음 현금추가할때, 로컬스토리지에서 저장했던 ‘propertyId’를 가져온다
    };
    dayUpload(Consumptiondata)
      .then((response) => {
        setShowInput(false);
        handleFetchData();
        console.log("데이터 추가 성공:", response.data);
      })
      .catch((error) => {
        console.log("데이터 추가 실패:", error);
      });
  };

  return (
    <InputWrapper>
      <Title>현금내역 입력창</Title>
      <InputThings>
        <ButtonAlignment>
          <AddButton width={15} height={8} backgroundcolor="white" borderRadius={50} marginTop={3}>
            <img onClick={handleExpenditureClick} src={expenditureSelected ? checkBox : yellowBox} alt="icon"></img>
            <Text>수입</Text>
          </AddButton>
          <AddButton width={15} height={8} backgroundcolor="white" borderRadius={50} marginTop={3}>
            <img onClick={handleExpenditureClick} src={expenditureSelected ? yellowBox : checkBox} alt="icon"></img>
            <Text>지출</Text>
          </AddButton>
        </ButtonAlignment>
        <CategoryContainer>
          <div className="title">카테고리</div>
          <CustomSelect options={categoryOptions} value={category} placeholder="카테고리를 선택해주세요." onChange={(option: OptionType | null) => handleCategoryChange(option)}></CustomSelect>
        </CategoryContainer>
        <CategoryContainer>
          <div className="title">메모</div>
          <ContentInput onChange={handleContentChange} placeholder="내용을 입력하세요." value={content} />
        </CategoryContainer>
        <PriceContainer>
          <div className="title">금액</div>
          <PriceInput onChange={handlePriceChange} placeholder="금액을 입력하세요." value={price !== null ? price : ""} />
          <div className="단위">원</div>
        </PriceContainer>
        <DateContainer>
          <div className="title">날짜</div>
          <DateInput selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          <img src={Dateimg} alt="icon"></img>
        </DateContainer>
        <SignupButtonContainer>
          <AddButton onClick={handleCancelClick} width={20} height={8} backgroundcolor="white" borderRadius={50}>
            취소하기
          </AddButton>
          <AddButton onClick={handleAddClick} width={20} height={8} backgroundcolor="yellow" borderRadius={50}>
            추가하기
          </AddButton>
        </SignupButtonContainer>
      </InputThings>
    </InputWrapper>
  );
}
