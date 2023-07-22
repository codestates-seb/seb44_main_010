import ConsumptionHeader from "../../components/card/C.Day/ConsumptionHeader";
import { DayPageContainer } from "../../pages/consumption/summaryPageStyled";
import SummaryContainer from "../../containers/summaryContainer";
import SideButtons from "../../components/button/SideButtons";
import {
  Grid,
  ContentContainer,
  SideButtonsContainer,
} from "../../pages/consumption/summaryPageStyled";
import { useState, useEffect } from "react";
import { summaryRender ,monthSumRender} from "../../api/index";

export interface CategoryData {
  categoryincomeSumsMap: { [category: string]: number };
  categoryexpenseSumsMap: { [category: string]: number };
}

export interface SummaryChartdata {
  SummaryChartdata: CategoryData;
}

export type SummarySumData = [number, number, number];

export default function SummaryPage() {
  const [userId, setUserId] = useState(1);
  const [years, setYears] = useState<number>(2023);
  const [month, setMonth] = useState<number>(7);
  const [categoryData, setCategoryData] = useState<CategoryData>({
    categoryincomeSumsMap: {},
    categoryexpenseSumsMap: {},
  });
  const [summarySumData, setSummarySumData] = useState<SummarySumData>([0,0,0]);

  //1. 카테고리 상세내역
  useEffect(() => {
    const handleFetchData = () => {
      summaryRender(userId, month)
        .then((response) => {
          // 데이터 처리 로직
          //console.log(response.data);
          //console.log(response.data.data);
          setCategoryData(response.data.data);
        })
        .catch((error) => {
          // 에러 처리 로직
          console.log(error);
        });
    };
    handleFetchData();
  }, [userId,month]);

  //2. 월별 합계 상세내역
  useEffect(()=>{
    const handleSumData = ()=>{
      monthSumRender(userId, month)
      .then((response)=>{
        setSummarySumData(response.data.data.monthlyResponseDto.monthSum);
      })
      .catch((error)=>{
        console.log(error);
      })
    };
    handleSumData();
  },[userId, month])

  return (
    <>
    <ConsumptionHeader />
    <DayPageContainer>
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
    </>
  );
}
