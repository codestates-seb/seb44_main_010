import ConsumptionHeader from "../../components/card/C.Day/ConsumptionHeader";
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
import { MonthConsumptionDataItem } from "../../containers/monthConsumptionContainer";

export interface MonthSumData {
  date: string;
  income: number;
  expense: number;
  total: number;
}

export default function MonthPage() {
  
  const [userId, setUserId] = useState(1);
  const [years, setYears] = useState(2023);
  const [month, setMonth] = useState(7);
  const [monthConsumptionData, setMonthConsumptionData] = useState([]);
  const [monthSumData, setMonthSumData] = useState<MonthSumData>({
    date: "",
    income: 0,
    expense: 0,
    total: 0
  });
  const [groupedData, setGroupedData] = useState<MonthConsumptionDataItem[][]>([]);


  
// 1. 서버에서 준 데이터 그대로
useEffect(() => {
  const handleFetchData = () => {
    monthRender(userId, month) 
      .then((response) => {
        //console.log(response.data)
        // 데이터 처리 로직
        //setMonthConsumptionData(response.data.data);
        //setMonthSumData(response.data.data.daySummary); //monthSummary로 가나?
      })
      .catch((error) => {
        // 에러 처리 로직
        console.log(error);
      });
  };
  handleFetchData();
}, [monthConsumptionData, monthSumData, month, userId]); 

 //2. 날짜 기준으로 데이터 그룹핑
 useEffect(() => {
  const groupByDate = (data: MonthConsumptionDataItem[]): { [key: string]: MonthConsumptionDataItem[] } => {
    return data.reduce((acc: { [key: string]: MonthConsumptionDataItem[] }, item: MonthConsumptionDataItem) => {
      const date = item.paymentTime.split('T')[0];

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(item);

      return acc;
    }, {});
  };

  setGroupedData(Object.values(groupByDate(monthConsumptionData)));
}, [monthConsumptionData]);


  return (
    <MonthPageContainer>
      <ConsumptionHeader />
      <ContentContainer>
        <Grid>
            <div style={{ width: "25vw", height: "68vh", border: "1px solid" }}>
              자산프로필
            </div>
          <MonthConsumptionContainer 
            years={years}
            month={month}
            setYears={setYears}
            setMonth={setMonth}
            monthConsumptionData={monthConsumptionData}
            monthSumData={monthSumData}
            groupedData={groupedData}
          />
        </Grid>
        <SideButtonsContainer>
          <SideButtons />
        </SideButtonsContainer>
      </ContentContainer>
    </MonthPageContainer>
  );
}
