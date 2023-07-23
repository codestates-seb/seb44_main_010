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
import { getLocalstorage } from "../../util/localStorage";
import Loading from "../../components/default/Loading";

const userId = Number(getLocalstorage('userId'))

export type CalendarSumData = [number, number, number];

export default function CalenderPage() {
  const [month, setMonth] = useState<number>(7);
  const [calenderData, setCalenderData] = useState([]);
  const [cashCalenderData, setCashCalenderData] = useState([]);
  const [calendarSumData, setCalendarSumData] = useState<CalendarSumData>([
    0, 0, 0,
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 데이터 로딩상태 저장


  //1. 캘린더 상세내역
  useEffect(() => {
    setIsLoading(true); //데이터 로딩 시작시 로딩표시
    const handleFetchData = () => {
      calendarRender(userId, month)
        .then((response) => {
          //console.log(response.data);
          //console.log(response.data.data);
          // 캘린더 계좌 결제내역
          setCalenderData(response.data.data.daySummaries);
          // 캘린더 현금 결제내역
          setCashCalenderData(response.data.data.cashDailySums)
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          setIsLoading(false) ; // 로딩끝남 
        });
    };
    handleFetchData();
  }, [month]);

  //2. 월별 합계내역
  useEffect(() => {
    setIsLoading(true); //데이터 로딩 시작시 로딩표시
    const handleSumData = () => {
      monthSumRender(userId, month)
        .then((response) => {
          setCalendarSumData(response.data.data.monthlyResponseDto.monthSum);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(()=>{
          setIsLoading(false) ; // 로딩끝남 
        });
    };
    handleSumData();
  }, [month]);

  return (
    <>
      <ConsumptionHeader />
      {isLoading ? <Loading isLoading={isLoading} /> :(
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
      )
}
    </>
  );
}
