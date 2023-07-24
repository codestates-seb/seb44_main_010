import styled from "styled-components";
import retouchicon from "../../assets/svg/retouchIcon.svg";

export const AssetPageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40rem;
  margin-bottom: 12rem;
  width: 100vw;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  justify-content: space-between;
  margin-top: 5rem;
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid #e1e1e1;
  border-radius: 3rem;
  width: 50vw;
  margin-left: 7rem;
  margin-right: 3rem;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 5rem;
  color: #414141;
  font-weight: 600;
  width: 70%;
  margin-top: 5%;
  margin-left: 5%;
`;

export const AddButtons = styled.div`
  display: flex;
`;

export const RetouchButton = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  font-size: 3rem;
  padding: 3rem;
  background-color: #ebebeb;

  box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);

  border-radius: 10rem;

  transition: 0.3s;
  &:hover {
    background-color: #bcbcbc;
  }
`;

export const Retouchicon = styled.div`
  background: url(${retouchicon});
  background-size: 100% 100%;
  background-position: center;

  margin-right: 2rem;

  width: 3rem;
  height: 3rem;
`;
