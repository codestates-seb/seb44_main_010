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

export function DayMoveButtonRight() {
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
    ></MoveImg>
  );
}

export function DayMoveButtonLeft() {
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
    ></MoveImg>
  );
}
