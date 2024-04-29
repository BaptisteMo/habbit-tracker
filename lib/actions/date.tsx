'use client'

import { useEffect, useState } from "react";

export function todayDate(){

    const [currentDateDDMMYY, setCurrentDateDDMMYY] = useState('');
    const [currentDateYYYYMMDD, setCurrentDateYYYYMMDD] = useState('');
  
    useEffect(() => {
      const updateCurrentDate = () => {
        const today = new Date();
  
        // Format "DD-MM-YY"
        const optionsDDMMYY = { day: '2-digit', month: '2-digit', year: '2-digit' };
        const formattedDateDDMMYY = today.toLocaleDateString('en-GB', optionsDDMMYY);
  
        // Format "YYYY-MM-DD"
        const formattedDateYYYYMMDD = `${today.getFullYear()}-${(today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1)}-${(today.getDate() < 10 ? '0' : '') + today.getDate()}`;
   
  
        setCurrentDateDDMMYY(formattedDateDDMMYY);
        setCurrentDateYYYYMMDD(formattedDateYYYYMMDD);
      };
  
      updateCurrentDate();
  
      const intervalId = setInterval(updateCurrentDate, 1000 * 60 * 60 * 24);
  
      return () => clearInterval(intervalId);
    }, []);
}