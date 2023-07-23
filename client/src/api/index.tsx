// api폴더를 따로 만들어서 관리
// data 이름을 구별할 수 있게 선언하기
import axios from "axios";

type DayConsumptionData = {
  paymentTime: string | null;
  paymentType: string | null;
  amount: number | null;
  category:string | null;
  purpose: string | null;
  propertyId: number | null;
};

//소비페이지 일일입력창 (POST)
export const dayUpload = (dayConsumptiondata: DayConsumptionData) => {
  return axios.post(
    "/cashPayment/post",
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
export const monthRender = (userId: number, month: number) => {
  return axios.get(
    `/consumption/monthly/${userId}/${month}`,
    {
      headers: {
        "ngrok-skip-browser-warning": true,
      },
    }
  );
};

//소비페이지 월별합계 렌더링(GET)
export const monthSumRender = (userId: number, month: number) =>{
  return axios.get(`/asset/myInfo/${userId}/${month}`,{
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  })
}


//소비페이지 캘린더상세내역 렌더링(GET)
export const calendarRender = (userId: number, month: number) =>{
  return axios.get(`/consumption/calender/${userId}/${month}`,{
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  })
}

//소비페이지 요약상세내역 렌더링(GET)
export const summaryRender = (userId: number, month: number) =>{
  return axios.get(`/consumption/category/${userId}/${month}`,{
    headers: {
      "ngrok-skip-browser-warning": true,
    },
  })
}


