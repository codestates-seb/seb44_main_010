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
import { falseCalendarRender } from "../../api/index";
import GraphContainer from "../../containers/graphContainer";
import { RightContainer } from "./calendarPageStyled";

export interface CalendarSumData {
  date: string;
  income: number;
  expense: number;
  total: number;
}

export default function CalenderPage() {
  const [month, setMonth] = useState<number>(7);
  const [JulyData, setJulyData] = useState([]);
  const [calendarSumData, setCalendarSumData] = useState<CalendarSumData>({
    date: "",
    income: 0,
    expense: 0,
    total: 0,
  });
  useEffect(() => {
    const handleFetchData = () => {
      falseCalendarRender()
        .then((response) => {
          // 데이터 처리 로직
          //console.log(response.data);
          //console.log(response.data.data);
          setJulyData(response.data);
          //setCalendarSumData(response.data.data.daySummary);
        })
        .catch((error) => {
          // 에러 처리 로직
          console.log(error);
        });
    };
    handleFetchData();
  }, []);

  return (
    <DayPageContainer>
      <ConsumptionHeader />
      <ContentContainer>
        <Grid>
          <div style={{ width: "25vw", height: "68vh", border: "1px solid" }}>
            자산프로필
          </div>
          <RightContainer>
            <CalendarContainer
              JulyData={JulyData}
              month={month}
              setMonth={setMonth}
            />
            <GraphContainer />
          </RightContainer>
        </Grid>
        <SideButtonsContainer>
          <SideButtons />
        </SideButtonsContainer>
      </ContentContainer>
    </DayPageContainer>
  );
}
