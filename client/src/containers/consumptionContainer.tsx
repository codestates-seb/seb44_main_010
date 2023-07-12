import ConsumptionDetail from "../components/card/ConsumptionDetail";
import TopConsumption from "../components/card/TopConsumption";
import styled from 'styled-components';
import BottomConsumption from "../components/card/BottomConsumption";
import { useState, useRef, useEffect } from "react";

interface ConsumptionBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    dynamicHeight: string;
  }

export const ConsumptionBox = styled.div<ConsumptionBoxProps>`
width: 50vw;
height: ${({dynamicHeight}) => `calc(${dynamicHeight}+ 35vh)`};
//65vh, 아이템 갯수에 따라서 박스의 높이가 달라져야 함
display:flex;
flex-direction:column;
justify-content:flex-start;
margin-left: 7rem;
margin-right: 3rem;
box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.1);
border: 1px #DDDDDD;
border-radius: 3rem;
`;

export default function ConsumptionContainer({ showInput, setShowInput }: { showInput: boolean, setShowInput: React.Dispatch<React.SetStateAction<boolean>>}){
    const [dynamicHeight, setDynamicHeight] = useState('0');
    const detailBoxRef = useRef<HTMLDivElement>(null);

   useEffect(()=>{
    if( detailBoxRef.current && detailBoxRef.current.style.height){
        setDynamicHeight(detailBoxRef.current.style.height)
       }
   },[])

    return(
    <ConsumptionBox dynamicHeight = {dynamicHeight}>
    <TopConsumption showInput={showInput} setShowInput={setShowInput}/>
    <ConsumptionDetail detailBoxRef ={detailBoxRef}/>
    <BottomConsumption />
    </ConsumptionBox>
    )
}