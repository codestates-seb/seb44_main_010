import React from "react";
import { styled } from "styled-components";

const Main = styled.div`
  /* border: 1px solid red; */
  border-top: 1px solid #f0f0f0;
  width: 90vw;
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterBox = styled.div`
  /* border: 1px solid red; */
  width: 80%;
  /* height: 80%; */
  display: flex;
  justify-content: space-evenly;
  color: #c8c8c8;
  font-weight: 300;
`;

const FooterItem_1 = styled.div`
  /* border: 1px solid red; */
  font-size: 7rem;
`;

const FooterItem_2 = styled.div`
  /* border: 1px solid red; */
  text-align: left;

  span {
    display: inline-block;
    margin-bottom: 3rem;
    font-size: 3rem;
  }
`;

export default function Footer() {
  return (
    <Main>
      <FooterBox>
        <FooterItem_1>MONEY MADE</FooterItem_1>
        <FooterItem_2>
          <span>Front-End</span>
          <br />
          <span>정지은 | google.com</span>
          <br />
          <span>정태현 | google.com</span>
          <br />
          <span>채명수 | gmail.com</span>
        </FooterItem_2>
        <FooterItem_2>
          <span>Back-End</span>
          <br />
          <span>이은호 | google.com</span>
          <br />
          <span>백지희 | google.com</span>
          <br />
          <span>장태환 | gmail.com</span>
        </FooterItem_2>
      </FooterBox>
    </Main>
  );
}
