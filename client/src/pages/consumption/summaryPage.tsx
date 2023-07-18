import ConsumptionHeader from "../../components/card/C.Day/ConsumptionHeader";
import { DayPageContainer } from "../../pages/consumption/summaryPageStyled";
import SummaryContainer from "../../containers/summaryContainer";
import SideButtons from "../../components/button/SideButtons";
import {
  Grid,
  ContentContainer,
  SideButtonsContainer,
} from "../../pages/consumption/calendarPageStyled";
import { useState, useEffect } from "react";
import { falseSummaryRender } from "../../api/index";

export interface SummarySumData {
  date: string;
  income: number;
  expense: number;
  total: number;
}

export default function SummaryPage() {
  const [years, setYears] = useState<number>(2023);
  const [month, setMonth] = useState<number>(7);
  const [JulyData, setJulyData] = useState([]);
  const [summarySumData, setSummarySumData] = useState<SummarySumData>({
    date: "",
    income: 0,
    expense: 0,
    total: 0,
  });
  useEffect(() => {
    const handleFetchData = () => {
      falseSummaryRender()
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
          <SummaryContainer
            years={years}
            setYears={setYears}
            month={month}
            setMonth={setMonth}
            JulyData={JulyData}
            summarySumData={summarySumData}
          />
        </Grid>
        <SideButtonsContainer>
          <SideButtons />
        </SideButtonsContainer>
      </ContentContainer>
    </DayPageContainer>
  );
}
