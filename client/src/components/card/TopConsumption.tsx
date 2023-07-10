import styled from 'styled-components';
import { DayMoveButtonRight } from "../../components/button/DayMoveButton";
import { DayMoveButtonLeft } from "../../components/button/DayMoveButton";
import AddButton from "../../components/button/AddButton";

export const TopContainer = styled.div`
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
    justify-content:flex-start;
`;

export const MoveDayButton = styled.div`
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

export default function TopConsumption(){
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
    <AddButton />
    </TopContainer>
 )
}