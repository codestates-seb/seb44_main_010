import { styled } from "styled-components";
import { AddButton } from "../button/AddButton";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <div>
      <NavContainer>
        <NavBox>
          <NavItem_1 size={"8"} weight={300} onClick={() => navigate("/")}>
            MONEY MADE
          </NavItem_1>
          <NavItem_1 size={"5"} weight={300} onClick={() => navigate("/")}>
            서비스 소개
          </NavItem_1>
          <NavItem_1 size={"5"} weight={300} onClick={() => navigate("/asset")}>
            자산
          </NavItem_1>
          <NavItem_1 size={"5"} weight={300} onClick={() => navigate("/consumption/day_upload")}>
            소비
          </NavItem_1>
          <NavItem_2>
            <AddButton backgroundcolor="yellow" width={22} height={6} borderradius={10} onClick={() => navigate("/users/login")}>
              로그인
            </AddButton>
          </NavItem_2>
        </NavBox>
      </NavContainer>
    </div>
  );
}

interface Props {
  size: string;
  weight: number;
}

const NavContainer = styled.div`
  /* border: 1px solid red; */
  width: 100vw;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavBox = styled.div`
  /* border: 1px solid red; */
  padding: 2% 0 2% 0;
  width: 80%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const NavItem_1 = styled.div<Props>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${(props) => (props.size === null ? null : `${props.size}rem`)};
  font-weight: ${(props) => (props.weight === null ? null : `${props.weight}`)};
`;

const NavItem_2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
