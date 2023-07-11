import styled from "styled-components";
import { AddButton } from "../components/button/AddButton";
import checkBox from "../assets/checkbox.svg";
import yellowBox from "../assets/yellow.svg"
import { useState } from "react";

export const InputWrapper = styled.div`
  width: 25vw;
  height: 60vh;
  border: 1px solid;
  background-color:  #277DC7;
  margin-left: 3rem;
`;

export const Title = styled.div`
  width: 25vw;
  height: 8vh;
  font-size:5rem;
  font-weight: 500;
  color: #277DC7;
  display:flex;
  align-items:center;
  justify-content:center;
  background-color:white;
`;

export const Text = styled.div`
  font-size: 3rem;
  margin-left: -1.5rem;
`;

export default function InputContainer() {

  const [imageSrc, setImageSrc] = useState(checkBox)
  //pr 먼저 날리기
  //지출과 수입 중에 택 1
  //현금과 기타 중에 택 1
  // 하도록 스위치(useState)를 두개 작성

  const handleCheckClick = () =>{
    imageSrc === checkBox ? setImageSrc(yellowBox) : setImageSrc(checkBox)
  };

  return (
    <InputWrapper>
      <Title>내역입력</Title>
      <AddButton width={15} height={8} backgroundcolor="white" borderRadius={50}>
      <img onClick={handleCheckClick} src={imageSrc} alt="icon"></img>
      <Text>지출</Text>
      </AddButton>
      <AddButton width={15} height={8} backgroundcolor="white" borderRadius={50}>
      <img onClick={handleCheckClick} src={imageSrc} alt="icon"></img>
      <Text>수입</Text>
      </AddButton>
      <AddButton width={15} height={8} backgroundcolor="white" borderRadius={50}>
      <img onClick={handleCheckClick} src={imageSrc} alt="icon"></img>
      <Text>현금</Text>
      </AddButton>
      <AddButton width={15} height={8} backgroundcolor="white" borderRadius={50}>
      <img onClick={handleCheckClick} src={imageSrc} alt="icon"></img>
      <Text>기타</Text>
      </AddButton>
    </InputWrapper>
  );
}
