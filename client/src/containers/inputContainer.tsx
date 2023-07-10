import styled from "styled-components";

export const InputWrapper = styled.div`
   width: 20vw;
   height: 60vh; 
   border: 1px solid;
`;

export default function InputContainer() {
  return (
    <>
      <InputWrapper>내역입력</InputWrapper>
    </>
  );
}
