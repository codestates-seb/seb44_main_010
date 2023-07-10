import ConsumptionDetail from "../components/card/ConsumptionDetail";
import TopConsumption from "../components/card/TopConsumption";
import styled from 'styled-components';
import BottomConsumption from "../components/card/BottomConsumption";

export const ConsumptionBox = styled.div`
width: 50vw;
height: 65vh; //아이템 갯수에 따라서 박스의 높이가 달라져야 함
border: 1px solid;
display:flex;
flex-direction:column;
justify-content:flex-start;

`;

export default function ConsumptionContainer(){
    return(
    <ConsumptionBox>
    <TopConsumption />
    <ConsumptionDetail />
    <BottomConsumption />
    </ConsumptionBox>
    )
}