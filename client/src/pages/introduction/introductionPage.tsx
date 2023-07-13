// import * as S from "./introductionPageStyled";
import Footer from "../../components/default/Footer";
import "./introductionPageCss.css";
import { useEffect, useRef } from "react";

const DIVIDER_HEIGHT = 5;

export default function IntroductionPage() {
  const outerDivRef = useRef();
  // const [scrollIndex, setScrollIndex] = useState(1);
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

      if (deltaY > 0) {
        // 스크롤 내릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(3);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(3);
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
            left: 0,
            behavior: "smooth",
          });
        }
        // setScrollIndex(4);
      } else {
        // 스크롤 올릴 때
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          //현재 1페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          //현재 2페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(1);
        } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
          // 현재 3페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(2);
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: "smooth",
          });
          // setScrollIndex(3);
        }
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, []);
  return (
    <div className="main">
      <div ref={outerDivRef} className="outer">
        {/* <Dots scrollIndex={scrollIndex} /> */}
        <div className="inner bg-yellow">1</div>
        {/* <div className="divider"></div> */}
        <div className="inner bg-blue">2</div>
        {/* <div className="divider"></div> */}
        <div className="inner bg-pink">3</div>
        <Footer />
      </div>
    </div>
  );
}

// export default function IntroductionPage() {
//   return (
//     <S.Main>
//       <S.Container>
//         <S.Section1>1</S.Section1>
//         <S.Section2>2</S.Section2>
//         <S.Section3>3</S.Section3>
//       </S.Container>
//     </S.Main>
//   );
// }
