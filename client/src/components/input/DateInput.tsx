import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({selectedDate, setSelectedDate}:{
   selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}){

 const handleDateChange = (date: Date | null) =>{
    setSelectedDate(date);
 };
 return(
    <DatePicker 
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy/MM/dd"
        placeholderText="YY/MM/DD"
    />
 );
}