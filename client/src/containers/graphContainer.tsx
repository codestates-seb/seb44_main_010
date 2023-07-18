import styled from "styled-components";
import BarChart from "../components/card/BarChart";

export const GraphBox = styled.div`
  width: 40vw;
  height: 30vh;
  background-color: #FFFFFF;
  border-radius: 15px;
  box-shadow: 0px 4px 4px 0px rgb(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
`;

export const Text =styled.div`
    font-size: 4rem;
    width: 50vw;
    height: 5vh;
    text-align:center;
`
export const BigBox = styled.div`
    width: 50vw;
    height: 40vh;
    border-radius:15px;
    background-color:#F3F3F3;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin-top:10rem;
    margin-bottom: 15rem;
`;

export default function GraphContainer() {
  return (
    <BigBox>
    <Text>지난달보다 10만원 더 썼어요!</Text>
    <GraphBox>
      <BarChart></BarChart>
    </GraphBox>
    </BigBox>
  );
}
