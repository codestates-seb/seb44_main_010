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
import { summaryRender } from "../../api/index";

export interface CategoryData {
  categoryincomeSumsMap: { [category: string]: number };
  categoryexpenseSumsMap: { [category: string]: number };
}

export interface SummaryChartdata {
  SummaryChartdata: CategoryData;
}

export interface SummarySumData {
  date: string;
  income: number;
  expense: number;
  total: number;
}

export default function SummaryPage() {
  const [years, setYears] = useState<number>(2023);
  const [month, setMonth] = useState<number>(7);
  const [categoryData, setCategoryData] = useState<CategoryData>({
    categoryincomeSumsMap: {},
    categoryexpenseSumsMap: {},
  });
  
  const [summarySumData, setSummarySumData] = useState<SummarySumData>({
    date: "",
    income: 0,
    expense: 0,
    total: 0,
  });
  useEffect(() => {
    const handleFetchData = () => {
      summaryRender(1, month)
        .then((response) => {
          // 데이터 처리 로직
          //console.log(response.data);
          //console.log(response.data.data);
          setCategoryData(response.data.SummaryChartdata);
          setSummarySumData(response.data.data.daySummary);
        })
        .catch((error) => {
          // 에러 처리 로직
          console.log(error);
        });
    };
    handleFetchData();
  }, [month]);

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
            categoryData={categoryData}
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
