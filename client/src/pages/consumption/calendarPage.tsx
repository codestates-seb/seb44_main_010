import ConsumptionHeader from "../../components/card/C.Day/ConsumptionHeader";
import { DayPageContainer } from "./calendarPageStyled";
import CalendarContainer from "../../containers/calendarContainer";
import SideButtons from "../../components/button/SideButtons";
import {
  Grid,
  ContentContainer,
  SideButtonsContainer,
} from "../../pages/consumption/calendarPageStyled";
import { useState, useEffect } from "react";
import { calendarRender, monthSumRender } from "../../api/index";
import GraphContainer from "../../containers/graphContainer";
import { RightContainer } from "./calendarPageStyled";

export type CalendarSumData = [number, number, number];

export default function CalenderPage() {
  const [userId, setUserId] = useState(1);
  const [month, setMonth] = useState<number>(7);
  const [calenderData, setCalenderData] = useState([]);
  const [cashCalenderData, setCashCalenderData] = useState([]);
  const [calendarSumData, setCalendarSumData] = useState<CalendarSumData>([
    0, 0, 0,
  ]);
 
  //1. 캘린더 상세내역
  useEffect(() => {
    const handleFetchData = () => {
      calendarRender(userId, month)
        .then((response) => {
          //console.log(response.data);
          //console.log(response.data.data);
          // 캘린더 계좌 결제내역
          setCalenderData(response.data.data.daySummaries);
          // 캘린더 현금 결제내역
          setCashCalenderData(response.data.data.cashDailySums)
          setUserId(1); //userId는 로그인 유저에 따라 달라질 것임
        })
        .catch((error) => {
          console.log(error);
        });
    };
    handleFetchData();
  }, [userId,month]);

  //2. 월별 합계내역
  useEffect(() => {
    const handleSumData = () => {
      monthSumRender(userId, month)
        .then((response) => {
          setCalendarSumData(response.data.data.monthlyResponseDto.monthSum);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    handleSumData();
  }, [userId,month]);

  return (
    <>
      <ConsumptionHeader />
      <DayPageContainer>
        <ContentContainer>
          <Grid>
            <div style={{ width: "25vw", height: "68vh", border: "1px solid" }}>
              자산프로필
            </div>
            <RightContainer>
              <CalendarContainer
                calenderData={calenderData}
                cashCalenderData={cashCalenderData}
                month={month}
                setMonth={setMonth}
                calendarSumData={calendarSumData}
              />
              <GraphContainer />
            </RightContainer>
          </Grid>
          <SideButtonsContainer>
            <SideButtons />
          </SideButtonsContainer>
        </ContentContainer>
      </DayPageContainer>
    </>
  );
}
