import ConsumptionHeader from "../../components/card/C.Day/ConsumptionHeader";
import { MonthPageContainer } from "./monthPageStyled";
import MonthConsumptionContainer from "../../containers/monthConsumptionContainer";
import SideButtons from "../../components/button/SideButtons";
import {
  Grid,
  ContentContainer,
  SideButtonsContainer,
} from "../../pages/consumption/monthPageStyled";
import { useState, useEffect } from "react";
import { monthRender } from "../../api/index";
import { monthSumRender } from "../../api/index";
import { getLocalstorage } from "../../util/localStorage";
import Loading from "../../components/default/Loading";

const userId = Number(getLocalstorage('userId'))

export type MonthSumData = [number, number, number];

export interface PaymentResponse {
  accountId: number;
  amount: number;
  category: string;
  counterPartyName: string;
  paymentId: number;
  paymentTime: string;
  paymentType: string;
  purpose: string;
}

export interface MonthConsumptionDataItem {
  paymentResponse: PaymentResponse;
  bankName: string;
}

export interface GroupedData {
  date: string;
  data: MonthConsumptionDataItem[];
}

export interface CashMonthConsumptionDataItem {
  amount: number;
  category: string;
  paymentId: number;
  paymentTime: string;
  paymentType:string;
  purpose: string;
  propertyId: number;
}

export interface CashGroupedData{
  date: string;
  data: CashMonthConsumptionDataItem[];
}

export default function MonthPage() {
  const [years, setYears] = useState(2023);
  const [month, setMonth] = useState(7);
  const [monthConsumptionData, setMonthConsumptionData] = useState([]);
  const [cashMonthConsumptionData, setCashMonthConsumptionData] = useState([]);
  const [monthSumData, setMonthSumData] = useState<MonthSumData>([0, 0, 0]);
  const [groupedData, setGroupedData] = useState<GroupedData[]>([]);
  const [cashGroupedData, setCashGroupedData] = useState<CashGroupedData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 데이터 로딩상태 저장

  // 1. 서버에서 준 데이터 그대로 받기
  useEffect(() => {
    setIsLoading(true); //데이터 로딩 시작시 로딩표시
    const handleFetchData = async() => {
        try {
          const response = await monthRender(userId, month);
          //console.log(response.data.data)
          //console.log(response.data.data.paymentBankResponses)
          setMonthConsumptionData(response.data.data.paymentBankResponses);
          setCashMonthConsumptionData(response.data.data.cashPayments);
          setIsLoading(false) ; // 로딩끝남 
        }
        catch(error) {
          // 에러 처리 로직
          console.log(error);
          setIsLoading(false) ; // 로딩끝남 
        }
    };
    handleFetchData();
  }, [month]);


  
  //2-1 날짜 기준으로 데이터그룹핑
  useEffect(() => {
    setIsLoading(true); //데이터 로딩 시작시 로딩표시
    const groupByDate = (data: MonthConsumptionDataItem[]): GroupedData[] => {
      const groupedData: { [date: string]: MonthConsumptionDataItem[] } = {};
      data.forEach((item) => {
        const date = item.paymentResponse.paymentTime.split("T")[0];
        if (!groupedData[date]) {
          groupedData[date] = [];
        }
        groupedData[date].push(item);
      });
      return Object.entries(groupedData).map(([date, data]) => ({
        date,
        data,
      }));
    };
    setGroupedData(groupByDate(monthConsumptionData));
    setIsLoading(false) ; // 로딩끝남 
  }, [monthConsumptionData]);

  //2-2 현금 날짜 기준으로 데이터 그룹핑
  useEffect(()=>{
    setIsLoading(true); //데이터 로딩 시작시 로딩표시
    const cashGroupByDate = (data: CashMonthConsumptionDataItem[]): CashGroupedData[] =>{
    const groupedData: {[date: string]: CashMonthConsumptionDataItem[]} = {};
    data.forEach((item)=>{
      const date = item.paymentTime.split("T")[0];
      if(!groupedData[date]){
        groupedData[date] =[];
      }
        groupedData[date].push(item);
    })
    return Object.entries(groupedData).map(([date, data]) => ({
      date,
      data,
    }))
    }
    setCashGroupedData(cashGroupByDate(cashMonthConsumptionData));
    setIsLoading(false) ; // 로딩끝남 
  }, [cashMonthConsumptionData])
 
  //3. 월별 합계내역
  useEffect(() => {
    setIsLoading(true); //데이터 로딩 시작시 로딩표시
    monthSumRender(userId, month)
      .then((response) => {
        //console.log(response.data.data.monthlyResponseDto.monthSum)
        setMonthSumData(response.data.data.monthlyResponseDto.monthSum);
        setIsLoading(false) ; // 로딩끝남 
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false) ; // 로딩끝남 
      });
  }, [month]);

  //console.log(monthConsumptionData) 
  //console.log(groupedData) 
  //console.log(cashMonthConsumptionData) 
  //console.log(cashGroupedData)
  

  return (
    <>
      <ConsumptionHeader />
      {isLoading ? <Loading isLoading={isLoading} /> :(<MonthPageContainer>
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
              monthSumData={monthSumData}
              groupedData={groupedData}
              cashGroupedData={cashGroupedData}
              isLoading ={isLoading}
            />
          </Grid>
          <SideButtonsContainer>
            <SideButtons />
          </SideButtonsContainer>
        </ContentContainer>
      </MonthPageContainer>)
}
    </>
  );
}
