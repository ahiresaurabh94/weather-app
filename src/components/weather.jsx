import React, { useEffect, useState } from "react";

const Weather = () => {

    const [apiData, setApiData] = useState({});
    const [getCity, setGetCity] = useState("")
    const [city, setCity] = useState("");
    const [lastCities, setLastCities] = useState([])
    const [initial, setInitial] = useState(false)
    console.log(apiData);
    console.log(lastCities);

    const apikey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    useEffect(() => {
        fetch(apiUrl).then((res) => res.json())
            .then((data) => setApiData(data));
    }, [apiUrl])

    const inputHandler = (e) => {
        setGetCity(e.target.value);
        setInitial(true);
    }

    const arrayHandler = (e) => {
        if (e !== "") {
            setLastCities((prev) => [...prev, e])
        }
    }



    return (
        <div className="main-content">
            <h2>Weather App</h2>
            <div>
                <input type="text" placeholder="Enter City Name" onKeyUp={(e) => setCity(e.target.value)} onChange={inputHandler} onBlur={(e) => arrayHandler(e.target.value)} value={getCity} />
            </div>

            <div className="main2">
                {initial ? (apiData.main ? (
                    <div className="info-content">
                        <div>Weather Details of City : {city}</div>
                        <div>Current Temperature : {apiData.main.temp}</div>
                        <div>Temperature Range : {apiData.main.temp_min} to {apiData.main.temp_max}</div>
                        <div>Humidity : {apiData.main.humidity}</div>
                        <div>Sea Level : {apiData.main.sea_level}</div>
                        <div>Ground Level : {apiData.main.grnd_level}</div>
                    </div>
                ) : (

                    city.length ? (
                        <h1>Enter Valid City Name</h1>
                    ) : (
                        <div>
                            <h3 style={{ 'color': 'blue' }}>Last 3 City Entries</h3>
                            {lastCities.slice(-3).map((ele) => {
                                return (
                                    <p>{ele}</p>
                                )
                            })}
                        </div>
                    )
                )) : (<></>)}

            </div>
        </div>

    )
}

export default Weather;