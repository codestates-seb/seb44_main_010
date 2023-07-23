import * as S from "./introductionPageStyled";
import Footer from "../../components/default/Footer";
import "./introductionPageCss.css";

import money from "../../assets/svg/money.svg";
import wallet from "../../assets/svg/wallet.svg";
// import setcion3 from "../../assets/svg/section3.svg";

import { useEffect, useRef, useState } from "react";
// import { TextStyled } from "../../components/default/TextStyled";
import { AddButton } from "../../components/button/AddButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { assetColor, consumptionColor } from "../../redux/navColorSlice";

export default function IntroductionPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxText = useSelector((state: RootState) => {
    return state.proFile;
  });
  console.log(reduxText);

  const outerDivRef = useRef<HTMLDivElement>(null);
  // const [scrollIndex, setScrollIndex] = useState(1);
  const isLogined = useSelector((state: RootState) => {
    return state.loginSlice.isLogined;
  });

  // 마우스 올렸을 시 opacity 1로 변경
  const [opacity1, setOpacity1] = useState(0.6);
  const [opacity2, setOpacity2] = useState(0.6);

  const handleMouseEnter1 = () => {
    setOpacity1(1);
  };

  const handleMouseEnter2 = () => {
    setOpacity2(1);
  };

  const handleMouseLeave = () => {
    setOpacity1(0.6);
    setOpacity2(0.6);
  };

  // 애니메이션
  const [isFirstMove, setIsFirstMove] = useState(false);
  const [isSecondMove, setIsSecondMove] = useState(false);
  const [isThirdMove, setIsThirdMove] = useState(false);

  const [isSection2FirstMove, setIsSection2FirstMove] = useState(false);
  const [isSection2SecondMove, setIsSection2SecondMove] = useState(false);
  const [isSection2ThirdMove, setIsSection2ThirdMove] = useState(false);

  const [isSection3FirstMove, setIsSection3FirstMove] = useState(false);
  const [isSection3SecondMove, setIsSection3SecondMove] = useState(false);
  const [isSection3ThirdMove, setIsSection3ThirdMove] = useState(false);

  const handleIntersect: IntersectionObserverCallback = (e) => {
    e.forEach((entry) => {
      if (entry.target.id === "section1" || entry.target.id === "section2" || entry.target.id === "section3") {
        if (entry.isIntersecting) {
          // 섹션1 애니메이션
          if (entry.target.id === "section1") {
            setTimeout(() => {
              setIsFirstMove(true);
            }, 300);

            setTimeout(() => {
              setIsSecondMove(true);
            }, 600);

            setTimeout(() => {
              setIsThirdMove(true);
            }, 900);
          }

          // 섹션2 애니메이션
          if (entry.target.id === "section2") {
            setTimeout(() => {
              setIsSection2FirstMove(true);
            }, 300);

            setTimeout(() => {
              setIsSection2SecondMove(true);
            }, 600);

            setTimeout(() => {
              setIsSection2ThirdMove(true);
            }, 900);
          }
          if (entry.target.id === "section3") {
            setTimeout(() => {
              setIsSection3FirstMove(true);
            }, 300);

            setTimeout(() => {
              setIsSection3SecondMove(true);
            }, 600);

            setTimeout(() => {
              setIsSection3ThirdMove(true);
            }, 900);
          }
        } else {
          // 애니메이션 상태 초기화
          if (entry.target.id === "section1") {
            setIsFirstMove(false);
            setIsSecondMove(false);
            setIsThirdMove(false);
          }

          if (entry.target.id === "section2") {
            setIsSection2FirstMove(false);
            setIsSection2SecondMove(false);
            setIsSection2ThirdMove(false);
          }
          if (entry.target.id === "section3") {
            setIsSection3FirstMove(false);
            setIsSection3SecondMove(false);
            setIsSection3ThirdMove(false);
          }
        }
      }
    });
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    const target1 = document.getElementById("section1");
    const target2 = document.getElementById("section2");
    const target3 = document.getElementById("section3");

    if (target1) {
      observer.observe(target1);
    }
    if (target2) {
      observer.observe(target2);
    }
    if (target3) {
      observer.observe(target3);
    }

    return () => {
      if (target1) {
        observer.unobserve(target1);
      }
      if (target2) {
        observer.unobserve(target2);
      }
      if (target3) {
        observer.unobserve(target3);
      }
    };
  }, []);
  /////////////

  // 로그인이 유무에 따른 페이지 이동
  const handleAsset = () => {
    if (isLogined) {
      navigate("/asset");
      dispatch(assetColor());
    } else {
      navigate("/users/login");
    }
  };

  const handleConsumption = () => {
    if (isLogined) {
      navigate("/consumption/day_upload");
      dispatch(consumptionColor());
    } else {
      navigate("/users/login");
    }
  };

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();

      if (outerDivRef.current) {
        const { deltaY } = e;
        const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
        const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

        console.log(deltaY);

        if (deltaY > 0) {
          // 스크롤 내릴 때
          if (scrollTop >= 0 && scrollTop < pageHeight) {
            //현재 1페이지
            outerDivRef.current.scrollTo({
              top: pageHeight,
              behavior: "smooth",
            });
            // setScrollIndex(2);
          } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            //현재 2페이지
            outerDivRef.current.scrollTo({
              top: pageHeight * 2,
              behavior: "smooth",
            });
            // setScrollIndex(3);
          } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
            // 현재 3페이지
            outerDivRef.current.scrollTo({
              top: pageHeight * 3,
              behavior: "smooth",
            });
            // setScrollIndex(3);
          } else {
            outerDivRef.current.scrollTo({
              top: pageHeight * 3,
              behavior: "smooth",
            });
          }
          // setScrollIndex(4);
        } else {
          // 스크롤 올릴 때
          if (scrollTop > pageHeight * 2) {
            // 현재 4페이지
            outerDivRef.current.scrollTo({
              top: pageHeight * 2,
              behavior: "smooth",
            });
            // setScrollIndex(3);
          } else if (scrollTop > pageHeight) {
            // 현재 3페이지
            outerDivRef.current.scrollTo({
              top: pageHeight,
              behavior: "smooth",
            });
            // setScrollIndex(2);
          } else if (scrollTop > 0) {
            //현재 2페이지
            outerDivRef.current.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            // setScrollIndex(1);
          } else {
            //현재 1페이지
            outerDivRef.current.scrollTo({
              top: 0,
              behavior: "smooth",
            });
            // setScrollIndex(1);
          }
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    if (outerDivRef.current) {
      outerDivRef.current.addEventListener("wheel", wheelHandler);
    }
    return () => {
      if (outerDivRefCurrent) {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      }
    };
  }, []);

  return (
    <S.Main>
      <S.Container ref={outerDivRef}>
        <S.Section1 id="section1">
          <S.GridBox width={80}>
            <S.MoveText size={10} weight={700} opacity={0} marginBottom={2} move={isFirstMove}>
              바쁜 현대인<span>을 위한</span>
            </S.MoveText>
            <S.MoveText size={10} weight={700} opacity={0} marginBottom={2} move={isSecondMove}>
              한손<span>에 잡히는</span>
            </S.MoveText>
            <S.MoveText size={10} weight={700} opacity={0} marginBottom={10} move={isThirdMove}>
              스마트한 자산관리!
            </S.MoveText>
            {/* <AddButton
              width={58}
              height={13}
              borderRadius={15}
              fontSize={5}
              fontWeight={500}
              onClick={() => {
                handleAsset();
              }}
            >
              서비스 시작하기
            </AddButton> */}
          </S.GridBox>
        </S.Section1>
        <S.Section2 id="section2">
          <S.GridBox width={70} height={70} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <S.MoveText size={8} weight={700} marginBottom={3}>
              MONEY MADE만의 핵심 서비스
            </S.MoveText>
            <S.MoveText size={5} weight={300} marginBottom={3}>
              클릭 한번으로 스마트하게 자산관리를 시작해보세요!
            </S.MoveText>
            <S.Bar marginBottom={10} />
            <S.CardBox>
              <S.Card opacity={opacity1} onMouseEnter={handleMouseEnter1} onMouseLeave={handleMouseLeave} onClick={handleAsset}>
                <S.CardImg src={money} top={10} left={5} move={isSection2FirstMove} />
                <S.CardTextBox right={10} bottom={5}>
                  <S.MoveText size={10} weight={700} opacity={0} marginBottom={1} move={isSection2SecondMove}>
                    자산
                  </S.MoveText>
                  <S.MoveText size={4} weight={300} opacity={0} move={isSection2ThirdMove}>
                    흩어져 있는 나의 자산을
                    <br />
                    한번에 조회할 수 있어요
                  </S.MoveText>
                </S.CardTextBox>
              </S.Card>
              <S.Card opacity={opacity2} onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave} onClick={handleConsumption}>
                <S.CardTextBox top={10} left={10}>
                  <S.MoveText size={10} weight={700} opacity={0} marginBottom={1} move={isSection2FirstMove}>
                    소비
                  </S.MoveText>
                  <S.MoveText size={4} weight={300} opacity={0} move={isSection2SecondMove}>
                    나의 소비습관을
                    <br />
                    한눈에 확인할 수 있어요
                  </S.MoveText>
                </S.CardTextBox>
                <S.CardImg src={wallet} right={5} bottom={5} move={isSection2ThirdMove} />
              </S.Card>
            </S.CardBox>
          </S.GridBox>
        </S.Section2>
        <S.Section3 id="section3">
          <S.GridBox width={70} height={70} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <S.MoveText size={8} weight={700} marginBottom={3}>
              MONEY MADE만의 차별화 서비스
            </S.MoveText>
            <S.MoveText size={5} weight={300} marginBottom={3}>
              편리한 서비스를 경험해보세요!
            </S.MoveText>
            <S.Bar marginBottom={10} />
            <S.BackgroundBox>
              <S.SnsCard url="sns1" top={-5} left={-5} move={isSection3FirstMove}>
                <S.ProfileImgBox>
                  <S.ProfileImg url="profile1" marginRight={4} />
                  <S.ProfileTextBox>
                    <S.MoveText size={5} weight={700} marginBottom={3} marginTop={1}>
                      총 자산 한눈에 보기
                    </S.MoveText>
                    <S.MoveText size={4} weight={300}>
                      계좌 + 부동산, 현금 등
                      <br />
                      다양한 형태의 자산을 관리할 수 있어요.
                    </S.MoveText>
                  </S.ProfileTextBox>
                </S.ProfileImgBox>
              </S.SnsCard>
              <S.SnsCard url="sns2" top={23} right={0} move={isSection3SecondMove}>
                <S.ProfileImgBox>
                  <S.ProfileTextBox>
                    <S.MoveText size={5} weight={700} marginBottom={3} marginTop={1}>
                      한달 입출금 한눈에 보기
                    </S.MoveText>
                    <S.MoveText size={4} weight={300}>
                      캘린더를 보면서 나의 소비패턴을
                      <br />
                      점검할 수 있어요
                    </S.MoveText>
                  </S.ProfileTextBox>
                  <S.ProfileImg url="profile2" marginLeft={4} />
                </S.ProfileImgBox>
              </S.SnsCard>
              <S.SnsCard url="sns3" left={10} bottom={-15} move={isSection3ThirdMove}>
                <S.ProfileImgBox>
                  <S.ProfileTextBox>
                    <S.MoveText size={5} weight={700} marginBottom={3} marginTop={1}>
                      한달 예산 손쉽게 기록
                    </S.MoveText>
                    <S.MoveText size={4} weight={300}>
                      정기지출을 확인하고
                      <br />
                      나에게 맞는 예산계획을 세워요
                    </S.MoveText>
                  </S.ProfileTextBox>
                  <S.ProfileImg url="profile3" marginLeft={4} />
                </S.ProfileImgBox>
              </S.SnsCard>
            </S.BackgroundBox>
            <AddButton
              width={58}
              height={13}
              borderRadius={15}
              fontSize={5}
              fontWeight={500}
              marginTop={10}
              marginLeft={140}
              onClick={() => {
                handleAsset();
              }}
            >
              서비스 시작하기
            </AddButton>
          </S.GridBox>
        </S.Section3>
        <Footer />
      </S.Container>
    </S.Main>
  );
}
