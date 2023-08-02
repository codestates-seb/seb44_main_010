import right from "../../assets/right.svg";
import left from "../../assets/left.svg";
import styled from "styled-components";
import { useState } from "react";
import rightYellow from "../../assets/yellowright.svg";
import leftYellow from "../../assets/yellowleft.svg";

export const MoveImg = styled.img`
  height: 3vh;
  width: 2vh;
  
  &:hover{
    cursor: pointer;
  }
`;

export function DayMoveButtonRight({ handleMoveDayRight }: { handleMoveDayRight: () => void }) {
  const [imageSrc, setImageSrc] = useState(right);

  const handleMouseEnter = () => {
    setImageSrc(rightYellow);
  };

  const handleMouseLeave = () => {
    setImageSrc(right);
  };

  return (
    <MoveImg
      src={imageSrc}
      alt="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMoveDayRight}
    ></MoveImg>
  );
}

export function DayMoveButtonLeft({ handleMoveDayLeft }: { handleMoveDayLeft: () => void }) {
  const [imageSrc, setImageSrc] = useState(left);

  const handleMouseEnter = () => {
    setImageSrc(leftYellow);
  };

  const handleMouseLeave = () => {
    setImageSrc(left);
  };

  return (
    <MoveImg
      src={imageSrc}
      alt="icon"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMoveDayLeft}
    ></MoveImg>
  );
}
