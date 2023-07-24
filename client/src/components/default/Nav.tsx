// import React from "react";
import { styled } from "styled-components";
import { AddButton } from "../button/AddButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { assetColor, consumptionColor, mainColor, serviceColor } from "../../redux/navColorSlice";

import profile1Image from "../../assets/svg/profile1.svg";
import polygon from "../../assets/svg/polygon.svg";
import { useCallback, useEffect, useState } from "react";
import { logout } from "../../redux/loginSlice";
import { deleteLocalstorage } from "../../util/localStorage";

interface Props {
  size: string;
  weight: number;
  color?: string;
}

interface ProfileImgProps {
  url?: string;
  marginRight?: number;
  marginLeft?: number;
}

interface ProfileTextBoxProps {
  borderBottom?: number;
}

const Main = styled.div`
  /* border: 1px solid red; */
  background-color: white;
  width: 100vw;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const NavBox = styled.div`
  /* border: 1px solid red; */
  padding: 2% 0 2% 0;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavItem_1 = styled.div<Props>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => props.size && `${props.size}rem`};
  font-weight: ${(props) => props.weight && `${props.weight}`};
  color: ${(props) => (props.color === "yellow" ? "#FFCE0B" : "black")};
`;

const NavItem_2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.div<ProfileImgProps>`
  cursor: pointer;
  background: url(${profile1Image});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 8rem;
  height: 8rem;

  position: relative;
`;

const ProfileModal = styled.div`
  background-color: #ffce0b;
  border-radius: 4rem;

  display: flex;
  flex-direction: column;

  position: absolute;

  top: 12rem;
  left: -16rem;
`;

const ProfileTextBox = styled.div<ProfileTextBoxProps>`
  border-bottom: ${(props) => `${props.borderBottom}px`} solid white;

  width: 40rem;
  height: 14rem;

  font-size: 4rem;
  font-weight: 500;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;

  position: relative;
`;

const ProfilePolygon = styled.div`
  background: url(${polygon});
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  width: 9rem;
  height: 4rem;

  position: absolute;
  top: -3rem;
`;

export default function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogined = useSelector((state: RootState) => {
    return state.loginSlice.isLogined;
  });
  const navColors = useSelector((state: RootState) => {
    return state.navColor;
  });
  const [modal, setModal] = useState(false);

  // console.log(navColors);

  const handleMainClick = () => {
    navigate("/");
    dispatch(mainColor());
  };

  const handleServiceClick = () => {
    if (isLogined) {
      navigate("/");
      dispatch(serviceColor());
    } else {
      navigate("/users/login");
    }
  };

  const handleAssetClick = () => {
    if (isLogined) {
      navigate("/asset");
      dispatch(assetColor());
    } else {
      navigate("/users/login");
    }
  };

  const handleConsumptionClick = () => {
    if (isLogined) {
      navigate("/consumption/day_upload");
      dispatch(consumptionColor());
    } else {
      navigate("/users/login");
    }
  };

  const handleLogOut = () => {
    dispatch(logout());
    deleteLocalstorage("acessToken");
    deleteLocalstorage("refreshToken");
    deleteLocalstorage("username");
    deleteLocalstorage("userId");
    deleteLocalstorage("_grecaptcha");
    dispatch(mainColor());
    navigate("/");
  };

  const handleOuterClick = useCallback(() => {
    if (!modal) return;

    setModal(false);
  }, [modal]);

  useEffect(() => {
    document.addEventListener("click", handleOuterClick);
    return () => {
      document.removeEventListener("click", handleOuterClick);
    };
  }, [handleOuterClick]);

  const handleProfileImgClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setModal(!modal);
  };

  return (
    <div>
      <Main>
        <NavBox>
          <NavItem_1 size={"8"} weight={300} onClick={() => handleMainClick()}>
            MONEY MADE
          </NavItem_1>
          <NavItem_1 size={"5"} weight={300} onClick={() => handleServiceClick()} color={navColors.service}>
            서비스 소개
          </NavItem_1>
          <NavItem_1 size={"5"} weight={300} onClick={() => handleAssetClick()} color={navColors.asset}>
            자산
          </NavItem_1>
          <NavItem_1 size={"5"} weight={300} onClick={() => handleConsumptionClick()} color={navColors.consumption}>
            소비
          </NavItem_1>
          <NavItem_2>
            {isLogined ? (
              <ProfileImg onClick={handleProfileImgClick}>
                {modal ? (
                  <ProfileModal>
                    <ProfileTextBox borderBottom={1}>
                      마이페이지
                      <ProfilePolygon />
                    </ProfileTextBox>
                    <ProfileTextBox
                      onClick={() => {
                        handleLogOut();
                      }}
                    >
                      로그아웃
                    </ProfileTextBox>
                  </ProfileModal>
                ) : null}
              </ProfileImg>
            ) : (
              <AddButton backgroundcolor="yellow" width={22} height={6} borderRadius={10} onClick={() => navigate("/users/login")}>
                로그인
              </AddButton>
            )}
          </NavItem_2>
        </NavBox>
      </Main>
    </div>
  );
}
