import styled from 'styled-components';
import plusIcon from "../../assets/plus.svg";

export const PlusButton = styled.div`
    width: 6vw;
    height: 2vw;
    border-radius: 100px;
    background-color:#FFD800;
    align-items:center;
    transition: box-shadow 0.3s;
    display:flex;
    cursor: pointer;

    img{
    width: 40%;
    height: 40%;  
    }

    .추가{
    font-size: 3.5rem;
    color: #FFFFFF;
    font-weight:500;
    }

    &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3); 
  }
`;

export default function AddButtonConsumption({ showInput, setShowInput }: { showInput: boolean, setShowInput: React.Dispatch<React.SetStateAction<boolean>>}){
 
  const handleButtonClick = () =>{
    setShowInput(!showInput)
};

  return(
 <PlusButton onClick={handleButtonClick}>
 <img src={plusIcon}></img>
 <div className="추가">추가</div>
 </PlusButton>
 )
}