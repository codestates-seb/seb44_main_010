// api폴더를 따로 만들어서 관리
// data 이름을 구별할 수 있게 선언하기
import axios from 'axios';


type DayConsumptionData = {
  paymentType: string;
  accountType: string | null;
  purpose: string;
  amount: number | null;
  paymentTime: string | null;
};

//소비페이지 일일입력창 (POST)
export const dayUpload = (dayConsumptiondata: DayConsumptionData) => {
  return axios.post('/consumption/day_upload', dayConsumptiondata);
};

//소비페이지 일일상세내역 렌더링(GET)
export const dayRender = (years:number, month:number, date:number) =>{
 return axios.get(`/consumption?years=${years}&month=${month}&date=${date}`)
}; 

//소비페이지 월별상세내역 렌더링(GET)
export const monthRender = (years:number, month:number) =>{
  return axios.get(`/consumption?years=${years}&month=${month}`)
 }; 

//소비페이지 월별상세내역 가짜 데이터 렌더링(GET)
export const falseMonthRender = () =>{
  return axios.get(`http://localhost:3000/monthdata`)
}
