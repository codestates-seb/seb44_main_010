import styled from 'styled-components';

export const DayPageContainer = styled.div`
    display:flex;
    flex-direction:column;
    margin-top: 19rem;
    align-items:center;
`;
export const Grid = styled.div`
    width: 80vw;
    display:flex;
    flex-direction:row;
    justify-content:center;
    justify-content:space-between;
`;

export const ContentContainer = styled.div`
display:flex;
flex-direction:row;
margin-top: 25rem;
position: relative; // 부모 컨테이너를 기준으로 position 설정
`;

export const SideButtonsContainer = styled.div`
position: absolute;
right:-13rem;
top:13rem;
`;