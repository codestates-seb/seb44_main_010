// api폴더를 따로 만들어서 관리
// data 이름을 구별할 수 있게 선언하기
import axios from "axios";

type DayConsumptionData = {
  paymentTime: string | null;
  paymentType: string | null;
  amount: number | null;
  category:string | null;
  purpose: string | null;
  accountId: number | null;
};

//소비페이지 일일입력창 (POST)
export const dayUpload = (dayConsumptiondata: DayConsumptionData) => {
  return axios.post(
    "/consumption/day_upload",
    dayConsumptiondata,{
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    }
  );
};

//소비페이지 일일상세내역 렌더링(GET)
export const dayRender = (userId: number, month: number, date: number) => {
  return axios.get(
    `/consumption/daily/${userId}/${month}/${date}`,
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    }
  );
};


//소비페이지 월별상세내역 렌더링(GET)
export const monthRender = (userId: number, Month: number) => {
  return axios.get(
    `/consumption/monthly/${userId}/${Month}`,
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    }
  );
};

//소비페이지 월별합계 렌더링(GET)
export const monthSum = (userId: number, Month: number) =>{
  return axios.get(`/consumption/profile/${userId}/${Month}`)
}


//소비페이지 캘린더상세내역 렌더링(GET)
export const calendarRender = (userId: number, Month: number) =>{
  return axios.get(`/consumption/calender/${userId}/${Month}`)
}

//소비페이지 요약상세내역 렌더링(GET)
export const summaryRender = (userId: number, Month: number) =>{
  return axios.get(`/consumption/category/${userId}/${Month}`)
}


// 보내는 모든 요청 헤더에 아래 내용을 보내기
/*
Authorization:Bearer eyJhbGciOiJIUzM4NCJ9.eyJyb2xlcyI6WyJVU0VSIl0sInVzZXJuYW1lIjoia2trZkBnbWFpbC5jb20iLCJzdWIiOiJra2tmQGdtYWlsLmNvbSIsImlhdCI6MTY4OTc1MTIzNSwiZXhwIjoxNjg5NzUxMjk1fQ.lmd1bLFPFc2EPQZkL5rxnIfQgHZLC8_yHPjy6C3zgRNcvk31I8Vof3yfTFIWF8G-
*/