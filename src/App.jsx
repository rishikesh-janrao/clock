import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [started, setStarted] = useState(false);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setSec((prev) => (prev < 59 ? prev + 1 : 0));
      if (sec === 59) {
        setMin((prev) => (prev < 59 ? prev + 1 : 0));
        if (min === 59) {
          setHour((prev) => (prev < 59 ? prev + 1 : 0));
        }
        if (hour === 59) {
          clearInterval(interval);
          resetTime();
        }
      }
    }, 1000);

    if (!started) clearInterval(interval);
    return () => clearInterval(interval);
  });

  const startTime = () => {
    setStarted(!started);
  };
  const resetTime = () => {
    setStarted(false);
    setHour(0);
    setMin(0);
    setSec(0);
  };

  let hourString = hour < 10 ? `0${hour}` : hour;
  let minString = min < 10 ? `0${min}` : min;
  let secString = sec < 10 ? `0${sec}` : sec;
  let startButtonString = started ? "pause" : "start";
  startButtonString =
    (hour !== 0 || min !== 0 || sec !== 0) && !started ? "resume" : startButtonString;

  return (
    <div className={`app ${started && "app--active"}`}>
      <img src={reactLogo} className="app__logo" alt="React logo" />
      <div className="app__time">
        <h1>{hourString}</h1>:<h1>{minString}</h1>:<h1>{secString}</h1>
      </div>

      <div className="app__card">
        <button
          className={`app_start ${started && "app__start--running"}`}
          onClick={startTime}
        >
          {startButtonString}
        </button>
        <button className="app_reset" onClick={resetTime}>
          reset
        </button>
      </div>
      <div>
        <h2>Clock {started ? "is running! 😍" : "has stopped! 👀"}</h2>
      </div>
    </div>
  );
}

export default App;
