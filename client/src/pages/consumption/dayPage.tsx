import ConsumptionHeader from "../../components/card/ConsumptionHeader";
import { DayPageContainer } from "../../pages/consumption/dayPageStyled";
import ConsumptionContainer from "../../containers/consumptionContainer";
import SideButtons from "../../components/button/SideButtons";
import {
  Grid,
  ContentContainer,
  SideButtonsContainer,
} from "../../pages/consumption/dayPageStyled";
import { useState, useEffect } from "react";
import InputContainer from "../../containers/inputContainer";
import { dayRender } from "../../api/index";

export interface SumData {
  date: string;
  income: number;
  expense: number;
  total: number;
}

export default function DayPage() {

  const [showInput, setShowInput] = useState(false);
  const [years, setYears] = useState(2023);
  const [month, setMonth] = useState(7);
  const [date, setDate] = useState(2);
  const [consumptionData, setConsumptionData] = useState([]);
  const [sumData, setSumData] = useState<SumData>({
    date: "",
    income: 0,
    expense: 0,
    total: 0
  });

// 소비내역이 추가되면은 오른쪽 상세내역이 다시 렌더링되어야 함
useEffect(() => {
  const handleFetchData = () => {
    dayRender(years, month, date)
      .then((response) => {
        // 데이터 처리 로직
        console.log(response.data);
        setConsumptionData(response.data.paymentResponses);
        setSumData(response.data.daySummary);
      })
      .catch((error) => {
        // 에러 처리 로직
        console.log(error);
      });
  };
  handleFetchData();
}, [consumptionData, sumData, date, month, years]);

  return (
    <DayPageContainer>
      <ConsumptionHeader />
      <ContentContainer>
        <Grid>
          {showInput ? (
            <InputContainer />
          ) : (
            <div style={{ width: "25vw", height: "60vh", border: "1px solid" }}>
              자산프로필
            </div>
          )}
          <ConsumptionContainer
            showInput={showInput}
            setShowInput={setShowInput}
            years={years}
            month={month}
            date={date}
            setYears={setYears}
            setMonth={setMonth}
            setDate={setDate}
            consumptionData={consumptionData}
            sumData={sumData}
          />
        </Grid>
        <SideButtonsContainer>
          <SideButtons />
        </SideButtonsContainer>
      </ContentContainer>
    </DayPageContainer>
  );
}
