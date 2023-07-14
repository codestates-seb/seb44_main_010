import ConsumptionHeader from "../../components/card/ConsumptionHeader";
import { MonthPageContainer } from "./monthPageStyled";
import MonthConsumptionContainer from "../../containers/monthConsumptionContainer";
import SideButtons from "../../components/button/SideButtons";
import {
  Grid,
  ContentContainer,
  SideButtonsContainer,
} from '../../pages/consumption/monthPageStyled';
import { useState, useEffect } from "react";
import { monthRender } from "../../api/index";

export interface MonthSumData {
  date: string;
  income: number;
  expense: number;
  total: number;
}

export default function MonthPage() {

  const [years, setYears] = useState(2023);
  const [month, setMonth] = useState(7);
  const [monthConsumptionData, setMonthConsumptionData] = useState([]);
  const [monthSumData, setMonthSumData] = useState<MonthSumData>({
    date: "",
    income: 0,
    expense: 0,
    total: 0
  });

  
// 소비내역이 추가되면은 오른쪽 상세내역이 다시 렌더링되어야 함
useEffect(() => {
  const handleFetchData = () => {
    monthRender(years, month)
      .then((response) => {
        // 데이터 처리 로직
        console.log(response.data);
        setMonthConsumptionData(response.data.paymentResponses);
        setMonthSumData(response.data.daySummary);
      })
      .catch((error) => {
        // 에러 처리 로직
        console.log(error);
      });
  };
  handleFetchData();
}, [monthConsumptionData, monthSumData, month, years]);

  return (
    <MonthPageContainer>
      <ConsumptionHeader />
      <ContentContainer>
        <Grid>
            <div style={{ width: "25vw", height: "68vh", border: "1px solid" }}>
              자산프로필
            </div>
          <MonthConsumptionContainer //여기하는중
            years={years}
            month={month}
            setYears={setYears}
            setMonth={setMonth}
            monthConsumptionData={monthConsumptionData}
            monthSumData={monthSumData}
          />
        </Grid>
        <SideButtonsContainer>
          <SideButtons />
        </SideButtonsContainer>
      </ContentContainer>
    </MonthPageContainer>
  );
}
