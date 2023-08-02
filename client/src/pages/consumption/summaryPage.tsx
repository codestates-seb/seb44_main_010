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
import { getLocalstorage } from "../../util/localStorage";
import Loading from "../../components/default/Loading";
import AssetProfileContainer from "../../containers/assetProfileContainer";
import { useDispatch } from "react-redux";
import axios, { AxiosResponse } from "axios";
import { addProfile } from "../../redux/profileSlice";

const userId = Number(getLocalstorage('userId'))

export interface CategoryData {
  categoryincomeSumsMap: { [category: string]: number };
  categoryexpenseSumsMap: { [category: string]: number };
}

export interface SummaryChartdata {
  SummaryChartdata: CategoryData;
}

export type SummarySumData = [number, number, number];

export default function SummaryPage() {

  const [years, setYears] = useState<number>(2023);
  const [month, setMonth] = useState<number>(7);
  const [categoryData, setCategoryData] = useState<CategoryData>({
    categoryincomeSumsMap: {},
    categoryexpenseSumsMap: {},
  });
  const [summarySumData, setSummarySumData] = useState<SummarySumData>([0,0,0]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 데이터 로딩상태 저장

  const dispatch = useDispatch();

  useEffect(() => {
  const currentData = new Date();
  const currentMonth = currentData.getMonth() + 1;
  const userId = getLocalstorage("userId");
  const acessToken = getLocalstorage("acessToken");

  axios.defaults.headers.common["Authorization"] = acessToken;
  axios
    .get(`/asset/myInfo/${userId}/${currentMonth}`, {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    })
    .then((res) => {
      // console.log(res.data);
      dispatch(addProfile(res.data));
    })
    .catch((err) => {
      if (err.response) {
        const errMessage = (err.response as AxiosResponse<{ message: string }>)?.data.message;
        window.alert(errMessage);
        console.log(errMessage);
      } else {
        console.error(err);
        window.alert("알 수없는 오류가 발생했습니다.");
      }
    });
}, [dispatch]);

  //1. 카테고리 상세내역
  useEffect(() => {
    setIsLoading(true); //데이터 로딩 시작시 로딩표시
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
        })
        .finally(()=>{
          setIsLoading(false) ; // 로딩끝남 
        });
    };
    handleFetchData();
  }, [month]);

  //2. 월별 합계 상세내역
  useEffect(()=>{
    const handleSumData = ()=>{
      setIsLoading(true); //데이터 로딩 시작시 로딩표시
      monthSumRender(userId, month)
      .then((response)=>{
        setSummarySumData(response.data.data.monthlyResponseDto.monthSum);
      })
      .catch((error)=>{
        console.log(error);
      })
      .finally(()=>{
        setIsLoading(false) ; // 로딩끝남 
      });
    }
    handleSumData();
  },[month])

  return (
    <>
    <ConsumptionHeader />
    {isLoading ? <Loading isLoading={isLoading} /> :(
    <DayPageContainer>
      <ContentContainer>
        <Grid>
        <AssetProfileContainer/>
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
    )
}
    </>
  );
}
