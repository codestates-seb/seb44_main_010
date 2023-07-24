import ConsumptionHeader from "../../components/card/C.Day/ConsumptionHeader";
import { DayPageContainer } from "../../pages/consumption/dayPageStyled";
import DayConsumptionContainer from "../../containers/dayConsumptionContainer";
import SideButtons from "../../components/button/SideButtons";
import {
  Grid,
  ContentContainer,
  SideButtonsContainer,
} from "../../pages/consumption/dayPageStyled";
import { useState, useEffect } from "react";
import InputContainer from "../../containers/inputContainer";
import { dayRender } from "../../api/index";
import { useCallback } from "react";
import Loading from "../../components/default/Loading";
import { getLocalstorage } from "../../util/localStorage";

const userId = Number(getLocalstorage('userId'))

export interface DaySumData {
  date: string;
  income: number;
  expense: number;
  total: number;
}

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

export interface CashConsumption {
  paymentTime: string;
  paymentType: string;
  amount: number;
  purpose: string;
  category: string;
  paymentId: number;
  propertyId: number;
}

export interface DayConsumptionItem {
  paymentResponse: PaymentResponse;
  bankName: string;
  cashPayments: CashConsumption;
}

export default function DayPage() {
  const [showInput, setShowInput] = useState(false);
  const [years, setYears] = useState(2023);
  const [month, setMonth] = useState(7);
  const [date, setDate] = useState(1);
  const [dayConsumptionData, setDayConsumptionData] = useState<
    DayConsumptionItem[]
  >([]);
  const [cashConsumptionData, setCashConsumptionData] = useState<
    CashConsumption[]
  >([]);
  const [daySumData, setDaySumData] = useState<DaySumData>({
    date: "",
    income: 0,
    expense: 0,
    total: 0,
  });
 const [isLoading, setIsLoading] = useState<boolean>(true); // 데이터 로딩상태 저장

  // 소비내역이 추가되면은 오른쪽 상세내역이 다시 렌더링되어야 함
  const handleFetchData = useCallback(() => {
    dayRender(userId, month, date)
      .then((response) => {
        // 데이터 처리 로직
        //console.log(response.data.data);
        setDayConsumptionData(response.data.data.paymentResponses); //계좌 결제내역
        setCashConsumptionData(response.data.data.cashPayments); //현금 결제내역
        setDaySumData(response.data.data.daySummary); //일일 합계
      })
      .catch((error) => {
        // 에러 처리 로직
        console.log(error);
      })
      .finally(()=>{
        setIsLoading(false) ; // 로딩끝남 
      })
  },[month, date]);

 useEffect(()=>{
  setIsLoading(true); //데이터 로딩 시작시 로딩표시
  handleFetchData();
 },[handleFetchData])
  //cashConsumptionData 계속 서버요청이 되는상태임 => useCallBack으로 렌더링 최적화 한뒤, 해결!

  return (
    <>
      <ConsumptionHeader />
      {isLoading ? <Loading isLoading={isLoading} /> : 
      <DayPageContainer>
      <ContentContainer>
        <Grid>
          {showInput ? (
            <InputContainer setShowInput={setShowInput} handleFetchData={handleFetchData}/>
          ) : (
            <div
              style={{ width: "25vw", height: "68vh", border: "1px solid" }}
            >
              자산프로필
            </div>
          )}
          <DayConsumptionContainer
            showInput={showInput}
            setShowInput={setShowInput}
            years={years}
            month={month}
            date={date}
            setYears={setYears}
            setMonth={setMonth}
            setDate={setDate}
            dayConsumptionData={dayConsumptionData}
            cashConsumptionData={cashConsumptionData}
            daySumData={daySumData}
          />
        </Grid>
        <SideButtonsContainer>
          <SideButtons />
        </SideButtonsContainer>
      </ContentContainer>
    </DayPageContainer>
      }
    </>
  );
}
