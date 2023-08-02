import setcion1 from "../../assets/svg/section1.svg";
import setcion2 from "../../assets/svg/section2.svg";
import setcion3 from "../../assets/svg/section3.svg";
import sns1Image from "../../assets/svg/sns1.svg";
import sns2Image from "../../assets/svg/sns2.svg";
import sns3Image from "../../assets/svg/sns3.svg";
import profile1Image from "../../assets/svg/profile1.svg";
import profile2Image from "../../assets/svg/profile2.svg";
import profile3Image from "../../assets/svg/profile3.svg";

import styled, { css } from "styled-components";

interface GridProps {
  width?: number;
  height?: number;
  display?: string;
  flexDirection?: string;
  justifyContent?: string;
  alignItems?: string;
}

interface MoveTextProps {
  size?: number;
  weight?: number;
  marginTop?: number;
  marginBottom?: number;
  move?: boolean;
  opacity?: number;
}

interface BarProps {
  marginBottom?: number;
}

interface CardProps {
  opacity?: number;
}

interface CardImgProps {
  img?: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  width?: number;
  height?: number;

  move?: boolean;
}

interface CardTextBoxProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

interface SnsCardProps {
  url?: string;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  move?: boolean;
}

interface ProfileImgProps {
  url?: string;
  marginRight?: number;
  marginLeft?: number;
}

export const Main = styled.div`
  /* overflow-y: hidden; */
  margin-top: 3rem;
`;

export const Container = styled.div`
  height: 99vh;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const MoveText = styled.div<MoveTextProps>`
  font-size: ${(props) => props.size}rem;
  font-weight: ${(props) => props.weight};
  margin-top: ${(props) => (props.marginTop ? `${props.marginBottom}rem` : null)};
  margin-bottom: ${(props) => (props.marginBottom ? `${props.marginBottom}rem` : null)};
  opacity: ${(props) => props.opacity};
  transition: 0.3s ease-out;

  ${(props) =>
    props.move &&
    css`
      transform: translateY(-2rem);
      opacity: 1;
    `}

  span {
    font-size: 10rem;
    font-weight: 300;
  }
`;

export const GridBox = styled.div<GridProps>`
  /* border: 1px solid red; */
  width: ${(props) => (props.width ? `${props.width}%` : null)};
  height: ${(props) => (props.height ? `${props.height}%` : null)};
  display: ${(props) => (props.display ? `${props.display}` : null)};
  flex-direction: ${(props) => (props.flexDirection ? `${props.flexDirection}` : null)};
  justify-content: ${(props) => (props.justifyContent ? `${props.justifyContent}` : null)};
  align-items: ${(props) => (props.alignItems ? `${props.alignItems}` : null)};
`;

export const Bar = styled.div<BarProps>`
  width: 28rem;
  height: 1rem;
  background-color: #868686;
  margin-bottom: ${(props) => (props.marginBottom ? `${props.marginBottom}rem` : null)};
`;

export const CardBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const Card = styled.div<CardProps>`
  width: 40%;
  height: 80%;
  border-radius: 3rem;
  background-color: rgb(255, 255, 255);
  position: relative;
  opacity: ${(props) => props.opacity};

  transition: 0.3s;
  &:hover {
    width: 41%;
    height: 81%;
    background-color: rgb(255, 255, 255);
    color: #303030;
    box-shadow: 0px 4px 13px 0px rgb(0, 0, 0, 0.3);
  }
`;

export const CardImg = styled.img<CardImgProps>`
  position: absolute;
  top: ${(props) => `${props.top}rem`};
  right: ${(props) => `${props.right}rem`};
  bottom: ${(props) => `${props.bottom}rem`};
  left: ${(props) => `${props.left}rem`};

  /* width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`}; */

  width: 50%;
  height: 50%;

  opacity: 0;
  transition: 0.3s ease-out;

  ${(props) =>
    props.move &&
    css`
      transform: translateY(-2rem);
      opacity: 1;
    `}
`;

export const CardTextBox = styled.div<CardTextBoxProps>`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: ${(props) => `${props.top}rem`};
  right: ${(props) => `${props.right}rem`};
  bottom: ${(props) => `${props.bottom}rem`};
  left: ${(props) => `${props.left}rem`};
`;

export const BackgroundBox = styled.div`
  background-image: url(${setcion3});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 197rem;
  height: 83rem;

  position: relative;
`;

const getImageUrl = (urlName: string | undefined) => {
  switch (urlName) {
    case "sns1":
      return sns1Image;
    case "sns2":
      return sns2Image;
    case "sns3":
      return sns3Image;
    default:
      return "";
  }
};

export const SnsCard = styled.div<SnsCardProps>`
  background: url(${(props) => getImageUrl(props.url)});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 101rem;
  height: 37rem;

  display: flex;
  justify-content: center;
  align-items: center;

  filter: drop-shadow(0px 0px 4px rgb(0, 0, 0, 0.1));

  position: absolute;
  top: ${(props) => `${props.top}%`};
  right: ${(props) => `${props.right}%`};
  bottom: ${(props) => `${props.bottom}%`};
  left: ${(props) => `${props.left}%`};

  opacity: 0;
  transition: 0.3s ease-out;

  ${(props) =>
    props.move &&
    css`
      transform: translateY(-2rem);
      opacity: 1;
    `}
`;

export const ProfileImgBox = styled.div`
  /* border: 1px solid red; */

  height: 70%;

  display: flex;
  justify-content: space-between;
`;

const getProfileImageUrl = (urlName: string | undefined) => {
  switch (urlName) {
    case "profile1":
      return profile1Image;
    case "profile2":
      return profile2Image;
    case "profile3":
      return profile3Image;
    default:
      return "";
  }
};

export const ProfileImg = styled.div<ProfileImgProps>`
  background: url(${(props) => getProfileImageUrl(props.url)});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  margin-right: ${(props) => `${props.marginRight}rem`};
  margin-left: ${(props) => `${props.marginLeft}rem`};

  width: 23rem;
  height: 23rem;
`;

export const ProfileTextBox = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
`;

export const Section1 = styled.div`
  background-image: url(${setcion1});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Section2 = styled.div`
  background: url(${setcion2}) fixed;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20rem;
`;

export const Section3 = styled.div`
  background-color: #f5f5ee;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20rem;
`;
