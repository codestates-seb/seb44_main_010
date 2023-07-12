import styled from "styled-components";
import { AddButton } from "../components/button/AddButton";
import checkBox from "../assets/checkbox.svg";
import yellowBox from "../assets/yellow.svg";
import { useState } from "react";
import { ContentInput, PriceInput } from "../components/input/ConsumptionInput";
import Select from "react-select";
import { ValueType } from "react-select";
import DateInput from "../components/input/DateInput";
import Date from "../assets/svg/date.svg";

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

const CustomSelect = styled(Select)`
    width: 65rem;

    .css-art2ul-ValueContainer2{
      height: 7rem;
      box-sizing:none;
    }
    .css-1dimb5e-singleValue{
      overflow: visible;
      font-size: 3rem;
    }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 64rem;
  display:flex;
  justify-content:space-around;
  align-items:center;
  margin :2rem 0rem;
  
  .title {
    font-size: 3rem;
    font-weight: 400;
    color: white;
    display:flex;
    align-items:center;
  }

  .단위{
    font-size: 4rem;
    font-weight: 400;
    color: white;
    width: 7rem;
    text-align:center;
  }
`;

export const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 64rem;
  display:flex;
  justify-content:space-around;
  margin :2rem 0rem;

  .title {
    font-size: 3rem;
    font-weight: 400;
    color: white;
    display:flex;
    align-items:center;
  }

  input{
    height: 3rem;
    width: 40rem;
    border-radius: 2rem; 
    padding: 2rem 2rem;
    font-family: "SCDream", sans-serif;
    border: 1px solid #c9c9c9;
  }

  .react-datepicker{
    width: 30rem;
    height: 30rem;
    font-size: 5rem; 
  }

  .react-datepicker__month-container{
    width: 30rem;
    height: 30rem;
    font-size: 5rem; 
  }
`;

export const ButtonAlignment = styled.div`
  display:flex;
  flex-direction:row;
  width: 64rem;
  height: 12rem;
  justify-content:space-evenly;
  padding-left: 5rem;
  padding-right: 5rem;
  align-items:center;
`;
export const InputThings = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
`

export const SignupButtonContainer = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:center;
  margin-top :4rem;

  button{
  font-size:3.5rem;
  font-weight:500;
  font-family:"SCDream", sans-serif;
  }
  

`;

export default function InputContainer() {
  const [expenditureSelected, setExpenditureSelected] = useState(true);
  const [cashSelected, setCashSelected] = useState(true);
  const [category, setCategory] = useState<{
    value: string | null;
    label: string | null;
  }>({ value: null, label: null });

  const handleExpenditureClick = () => {
    setExpenditureSelected(!expenditureSelected);
  };

  const handleCashClick = () => {
    setCashSelected(!cashSelected);
  };

  const categoryOptions = [
    { value: "상품권", label: "상품권" },
    { value: "기프티콘", label: "기프티콘" },
    { value: "고가품", label: "고가품" },
  ];

  const handleCategoryChange = (
    newValue: ValueType<{ value: string | null; label: string | null }, false>
  ) => {
    setCategory(newValue as { value: string | null; label: string | null });
  };

  return (
    <InputWrapper>
      <Title>내역입력</Title>
      <InputThings>
      <ButtonAlignment>
      <AddButton
        width={15}
        height={8}
        backgroundcolor="white"
        borderRadius={50}
        marginTop={3}
      >
        <img
          onClick={handleExpenditureClick}
          src={expenditureSelected ? yellowBox : checkBox}
          alt="icon"
        ></img>
        <Text>지출</Text>
      </AddButton>
      <AddButton
        width={15}
        height={8}
        backgroundcolor="white"
        borderRadius={50}
        marginTop={3}
      >
        <img
          onClick={handleExpenditureClick}
          src={expenditureSelected ? checkBox : yellowBox}
          alt="icon"
        ></img>
        <Text>수입</Text>
      </AddButton>
      </ButtonAlignment>
      <ButtonAlignment>
      <AddButton
        width={15}
        height={8}
        backgroundcolor="white"
        borderRadius={50}
      >
        <img
          onClick={handleCashClick}
          src={cashSelected ? yellowBox : checkBox}
          alt="icon"
        ></img>
        <Text>현금</Text>
      </AddButton>
      <AddButton
        width={15}
        height={8}
        backgroundcolor="white"
        borderRadius={50}
      >
        <img
          onClick={handleCashClick}
          src={cashSelected ? checkBox : yellowBox}
          alt="icon"
        ></img>
        <Text>기타</Text>
      </AddButton>
      </ButtonAlignment>
      <CategoryContainer>
        <div className="title">카테고리</div>
        <CustomSelect
          options={categoryOptions}
          value={category}
          onChange={handleCategoryChange}
          placeholder={"카테고리를 선택하세요."}
        ></CustomSelect>
      </CategoryContainer>
      <CategoryContainer>
      <div className="title">내용</div>
      <ContentInput placeholder="내용을 입력하세요."/>
      </CategoryContainer>
      <PriceContainer>
      <div className="title">금액</div>
      <PriceInput />
      <div className="단위">원</div>
      </PriceContainer>
      <DateContainer>
      <div className="title">날짜</div>
      <DateInput />
      <img src={Date} alt="icon"></img>
      </DateContainer>
      <SignupButtonContainer>
      <AddButton
        width={20}
        height={8}
        backgroundcolor="white"
        borderRadius={50}
      >취소하기</AddButton>
      <AddButton
        width={20}
        height={8}
        backgroundcolor="yellow"
        borderRadius={50}
      >추가하기</AddButton>
      </SignupButtonContainer>
      </InputThings>
    </InputWrapper>
  );
}
