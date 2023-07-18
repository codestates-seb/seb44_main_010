// api폴더를 따로 만들어서 관리
// data 이름을 구별할 수 있게 선언하기
import axios from "axios";

type DayConsumptionData = {
  paymentType: string;
  accountType: string | null;
  purpose: string;
  amount: number | null;
  paymentTime: string | null;
};
//입력 데이터 속성도 수정해야함

//소비페이지 일일입력창 (POST)
export const dayUpload = (dayConsumptiondata: DayConsumptionData) => {
  return axios.post(
    "https://b0f6-2406-5900-1009-4081-20b9-b2c7-1dad-3c7f.ngrok-free.app/consumption/day_upload",
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
    `https://b0f6-2406-5900-1009-4081-20b9-b2c7-1dad-3c7f.ngrok-free.app/consumption/daily/${userId}/${month}/${date}`,
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
    `https://b0f6-2406-5900-1009-4081-20b9-b2c7-1dad-3c7f.ngrok-free.app/consumption/monthly/${userId}/${Month}`,
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    }
  );
};


//소비페이지 캘린더 상세내역 가짜렌더링(GET)
export const falseCalendarRender = () =>{
  return axios.get(`http://localhost:3000/calendarDaySummary`)
}
