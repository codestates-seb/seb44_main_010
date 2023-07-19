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

export interface DaySumData {
  date: string;
  income: number;
  expense: number;
  total: number;
}

export default function DayPage() {
  
  const [showInput, setShowInput] = useState(false);
  //const [userId, setUserId] = useState(1);
  const [years, setYears] = useState(2023);
  const [month, setMonth] = useState(7);
  const [date, setDate] = useState(1);
  const [dayConsumptionData, setDayConsumptionData] = useState([]);
  const [daySumData, setDaySumData] = useState<DaySumData>({
    date: "",
    income: 0,
    expense: 0,
    total: 0
  });

// 소비내역이 추가되면은 오른쪽 상세내역이 다시 렌더링되어야 함
useEffect(() => {
  const handleFetchData = () => {
     dayRender(1, month, date)
      .then((response) => {
        // 데이터 처리 로직
        //console.log(response.data);
        //console.log(response.data.data);
        setDayConsumptionData(response.data.data.paymentResponses);
        setDaySumData(response.data.data.daySummary);
      })
      .catch((error) => {
        // 에러 처리 로직
        console.log(error);
      });
  };
  handleFetchData();
}, [date, month]); 

  return (
    <DayPageContainer>
      <ConsumptionHeader />
      <ContentContainer>
        <Grid>
          {showInput ? (
            <InputContainer />
          ) : (
            <div style={{ width: "25vw", height: "68vh", border: "1px solid" }}>
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
            daySumData={daySumData}
          />
        </Grid>
        <SideButtonsContainer>
          <SideButtons />
        </SideButtonsContainer>
      </ContentContainer>
    </DayPageContainer>
  );
}
