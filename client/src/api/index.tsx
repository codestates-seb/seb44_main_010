// api폴더를 따로 만들어서 관리
// data 이름을 구별할 수 있게 선언하기
import axios from 'axios';

//소비페이지 입력창 (POST)
type ConsumptionData = {
  paymentType: string;
  category: string | null;
  purpose: string;
  amount: number | null;
  paymentTime: string | null;
};

export const dayUpload = (consumptiondata: ConsumptionData) => {
  return axios.post('/consumption/day_upload', consumptiondata);
};

//소비페이지 상세내역 렌더링(GET)
export const dayRender = (years:number, month:number, date:number) =>{
 return axios.get(`/consumption?years=${years}&month=${month}&date=${date}`)
}; 