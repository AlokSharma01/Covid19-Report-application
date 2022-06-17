import React from 'react'
import style from "./CovidDashboard.module.css";
import { useState, useEffect } from 'react';
import { Graph } from './Graph';

export const CovidDashboard = () => {

    let [deaths, setDeaths] = useState(0)
    let [active, setActive] = useState(0)
    let [recovered, setRecovered] = useState(0)
    let [countryData, setCountryData] = useState([])
    let [country, setCountry] = useState("");
    let [oneCountry, setOneCountry] = useState("");
    let [from, setFrom] = useState("");
    let [to, setTo] = useState("");
    let [cases, setCases] = useState("");
    


    useEffect(() => {

        fetch(`https://api.covid19api.com/summary`)

            .then((res) => res.json())
            .then((res) => {

                // console.log(res.Countries)
                setDeaths(res.Global.TotalDeaths);
                setActive(res.Global.TotalConfirmed);
                setRecovered(res.Global.TotalRecovered);
                setCountryData(res.Countries);
                setOneCountry(countryData.filter((item) => country == item.Country || country == item.Slug))

            }

            )
            .catch((err) => console.log(err))

    }, [country])


    const handleCountrySelection = (e) => {

        setCountry(e.currentTarget.value);
        
    }
    const handleDays=(e)=>{

        setDays(e.currentTarget.value);
    }

    const getDatafromDateRange = (country,from,to) => {

        fetch(`https://api.covid19api.com/country/${countrySlug}/status/confirmed?from=${from}T00:00:00Z&to=${to}T00:00:00Z`)
            .then((res)=>res.json())
            .then((res) => setCases(res))
            .catch((err) => console.log(err))
    }

    const handleFrom =()=>{

        setFrom(e.currentTarget.value)
    }
    const handleTo =()=>{

        setTo(e.currentTarget.value);
        getDatafromDateRange(country,from,to);
    }

   

    return (
        <div className={style.body}>

            <h1 style={{ color: "blue" }}>{oneCountry.length !== 0 ? oneCountry[0].Country : "Global Report"}</h1>

            <div className={style.filterBox}>
                <h3>Filter :</h3>

                <div className={style.filterDetails}>
                    <select className={style.select} value={country} onChange={handleCountrySelection}>
                        <option >Location</option>
                        {
                            countryData.length !== 0 ? countryData.map(item =>

                                <option value={item.Slug} key={item.CountryCode}>{item.Country}</option>
                            ) : ""
                        }
                    </select>

                </div>

                <div className={style.chooseRange}>
                    <h4 style={{ color: "blue" }}>From</h4>
                    <input type = "date" onChange={handleFrom} max={to}/>
                    <h4 style={{ color: "blue" }}>To</h4>
                    <input type = "date" onChange={handleTo} min={from}/>

                </div>

            </div>

            <div className={style.filteration}>
                <div className={style.totalBox}>
                    <h3>Total Confirmed Cases</h3>
                    <span><b>{oneCountry.length !== 0 ? oneCountry[0].TotalConfirmed : active}</b></span>
                </div>
                <div className={style.totalBox} >
                    <h3 style={{ color: "rgb(60, 179, 113)" }}>Total Recovered </h3>
                    <span><b>{oneCountry.length !== 0 ? oneCountry[0].TotalRecovered : recovered}</b></span>
                </div>
                <div className={style.totalBox}>
                    <h3>Total Deaths</h3>
                    <span><b>{oneCountry.length !== 0 ? oneCountry[0].TotalDeaths : deaths}</b></span>
                </div>
            </div>

            <div className={style.graph}>

                <div>
                    <h1>
                        One week data
                    </h1>
                    <Graph />
                </div>
                <div style={{ paddingTop: "100px" }}>
                    <div style={{ width: "25px", height: "25px", backgroundColor: "#DAFA97" }}>
                    </div>
                    <p>Active</p>
                    <div style={{ width: "25px", height: "25px", backgroundColor: "rgb(255, 245, 157)" }}>

                    </div>
                    <p>Recovered</p>
                    <div style={{ width: "25px", height: "25px", backgroundColor: "#FF6347" }}>

                    </div>
                    <p>Deaths</p>
                </div>
            </div>

            <div className={style.table}>

                <table >
                    <thead>
                        <tr style={{ color: "blue" }}>
                            <th>Name</th>
                            <th>Confirmed</th>
                            <th>Recovered</th>
                            <th>Deceased</th>


                        </tr>

                    </thead>
                    <tbody>


                        {
                            oneCountry.length !== 0 ?
                                <tr>
                                    <td>{oneCountry[0].Country}</td>
                                    <td>{oneCountry[0].TotalConfirmed}</td>
                                    <td>{oneCountry[0].TotalRecovered}</td>
                                    <td>{oneCountry[0].TotalDeaths}</td>
                                </tr>
                                : (

                                    (countryData.length !== 0) ? countryData.map(item =>
                                        <tr value={item.Slug} key={item.CountryCode}>

                                            <td >{item.Country}</td>
                                            <td >{item.TotalConfirmed}</td>
                                            <td >{item.TotalRecovered}</td>
                                            <td >{item.TotalDeaths}</td>

                                        </tr>

                                    ) : (countryData.length !== 0) && (oneCountry.length !== 0) ? (

                                        <tr value={oneCountry.Slug} >

                                            <td >{oneCountry.Country}</td>
                                            <td >{oneCountry.TotalConfirmed}</td>
                                            <td >{oneCountry.TotalRecovered}</td>
                                            <td >{oneCountry.TotalDeaths}</td>

                                        </tr>
                                    ) : <tr></tr>
                                )
                        }



                    </tbody>
                </table>

            </div>


        </div>
    )
}
