import BG from "./valentin-muller-bWtd1ZyEy6w-unsplash.jpg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("Peshawar");
  const [weather, setWeather] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [wind, setWind] = useState("");
  const [iconn, setIconn] = useState("");
  const [errorr, setError] = useState(false);
  const apiKey = "88f393e851a891770b383a8c37d5bdb8";
  const getWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      console.log(response.data);
      setWeather(Math.round(response.data.main.temp - 273.15));
      setName(response.data.name);
      setDesc(response.data.weather[0].description);
      setWind(response.data.wind["speed"]);
      setIconn(response.data.weather[0].icon);
      setError(false);
    } catch (error) {
      console.log(error.message);
      if (city === "") {
        setError("Enter the city name");
      } else {
        setError(error.message);
      }
    }
  };
  useEffect(() => {
    getWeather(city);
  }, [city]);

  function handleSubmit(e) {
    e.preventDefault();
    getWeather(city);
  }
  return (
    <div
      style={{
        backgroundImage: `url(${BG})`,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {errorr ? (
        <>
          <h1 style={{ color: "white", position: "relative", top: "-10rem" }}>
            {errorr}
          </h1>
        </>
      ) : (
        weather && (
          <>
            {" "}
            <h1 style={styles.mainHeading}>{weather} C</h1>
            <img
              src={`https://openweathermap.org/img/wn/${iconn}.png`}
              style={styles.mainHeading}
              alt="weather-icon"
            />
            <h1 style={styles.mainPara}>{name}</h1>
            <h3 style={styles.mainPara}>Wind speed: {wind}</h3>
            <p style={styles.mainPara}>{desc}</p>
          </>
        )
      )}
      {/* <span>{weather.clouds.All}</span> */}
      <form onSubmit={handleSubmit} style={styles.formStylings}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={styles.inputStyling}
        />
        <button type="Submit" style={styles.formBtn}>
          Get Weather
        </button>
      </form>
    </div>
  );
}

const styles = {
  mainHeading: {
    color: "white",
    fontSize: "10rem",
    position: "relative",
    top: "-7rem",
  },
  mainPara: {
    color: "white",
    position: "relative",
    top: "-7rem",
    marginBottom: "1rem",
  },
  inputStyling: {
    height: "3rem",
    width: "50rem",
    borderRadius: "10rem",
    position: "relative",
    top: "-4rem",
    boxShadow: "5px 5px 6px black",
    paddingLeft: "1.4rem",
  },
  formStylings: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  formBtn: {
    width: "10rem",
    height: "3rem",
    fontSize: "1rem",
    borderRadius: "10rem",
    position: "relative",
    top: "-1rem",
    boxShadow: "1px 1px 2px black",
  },
};
export default App;
