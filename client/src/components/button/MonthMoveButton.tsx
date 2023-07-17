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

export function MonthMoveButtonRight({ handleMoveMonthRight }: { handleMoveMonthRight: () => void }) {
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
      onClick={handleMoveMonthRight}
    ></MoveImg>
  );
}

export function MonthMoveButtonLeft({ handleMoveMonthLeft }: { handleMoveMonthLeft: () => void }) {
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
      onClick={handleMoveMonthLeft}
    ></MoveImg>
  );
}
