import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput(){
 const [selectedDate, setSelectedDate] =useState<Date | null>(null);

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