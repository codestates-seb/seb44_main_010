import styled from 'styled-components';
import { DayMoveButtonRight } from "../../components/button/DayMoveButton";
import { DayMoveButtonLeft } from "../../components/button/DayMoveButton";
import AddButtonConsumption from "../button/AddButtonConsumption";

export const TopContainer = styled.div`
    display:flex;
    width: 44vw;
    height: 12vh;
    justify-content:space-between;
    align-items:center;
    margin-left: 3vw;
    margin-right: 3vw;

    .month{
        font-size: 3.5rem;
        width: 5vh;
        height: 5vh;
        align-items:center;
        margin-left: 1vw;
    }
`;

export const DateContainer = styled.div`
    display:flex;
    flex-direction: column;
`;

export const MoveDayButton = styled.div`
    display:flex;
    width: 7vw;
    height: 5vh;
    align-items:center;

    .day{
        font-weight:500;
        font-size: 5rem;
        margin-left: 1vh;
        margin-right: 1vh;
    }

`;

export default function TopConsumption({ showInput, setShowInput }: { showInput: boolean, setShowInput: React.Dispatch<React.SetStateAction<boolean>>}){

 return(
    <TopContainer>
    <DateContainer>
    <div className="month">7월</div>
    <MoveDayButton>
    <DayMoveButtonLeft />
    <div className="day">2일</div>
    <DayMoveButtonRight />
    </MoveDayButton>
    </DateContainer>
    <AddButtonConsumption showInput={showInput} setShowInput={setShowInput}/>
    </TopContainer>
 )
}