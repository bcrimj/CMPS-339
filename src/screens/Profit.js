import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns'

function ProfitScreen () {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [total, setTotal] = useState([]);
    const [rtotal, setRtotal] = useState([]);

    const changeStart = (data) => {
        let sqlDate = format(data, 'yyyy-MM-dd 00:00:00')
        setStartDate(data);
        setStart(sqlDate);
        
    }

    const changeEnd = (data) => {
        let sqlDate = format(data, 'yyyy-MM-dd 23:59:59')
        setEndDate(data);
        setEnd(sqlDate);
    }

    const getProfit = async () => {
        const newData = await fetch("/profit", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
          },
          }).then((res) => res.json());
        if (newData) {
        setTotal(newData[0].Total);
        }
      };
    
    const getRange = async () => {
        const rdata = await fetch("/profit/range", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                Start: start,
                End: end
              })
        }).then((res) => res.json());
        if (rdata) {
            
            if (!rdata[0].Total){
                setRtotal(0);
            }
            else {
            setRtotal(rdata[0].Total);
            }
        }
    }

    useEffect(() => {
        getProfit();
        // eslint-disable-next-line
    },[]);

    useEffect(() => {
        getRange();
        // eslint-disable-next-line
    }, [startDate, endDate])
    return (

        <div className="App">
            <h1>Hello</h1>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "40%", alignContent: "center", marginLeft: "auto", marginRight: "auto"}}>
                <div>
                    <h2>Start Date</h2>
                    <DatePicker popperPlacement='bottom' selected={startDate} onChange={(date) => changeStart(date)}/>
                </div>
                <div>
                    <h2>End Date</h2>
                    <DatePicker style={{marginLeft: "0px"}}popperPlacement='bottom' selected={endDate} onChange={(date) => changeEnd(date)}/>
                </div>
            </div>
            <div style={{ marginTop: '20px'}}>
                    <h2>Total Profit to Date: ${total}</h2>
                    <h2>Profit Between Selected Range: ${rtotal} </h2>
            </div>
        </div>
    )
}

export default ProfitScreen;