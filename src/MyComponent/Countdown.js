import React, { useState, useRef } from "react";
import { TextField, Button } from "@mui/material";
import "./Countdown.css";

function Countdown() {
  const [time, setTime] = useState(0);
  const [count, setCount] = useState(false);
  const timerRef = useRef(null);

  const startTimer = () => {
    setCount(true);
    timerRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          stopTimer();
          return 0;
        }
      });
    }, 1000);
  };

  const stopTimer = () => {
    setCount(false);
    clearInterval(timerRef.current);
  };

  const handleTimeChange = (e) => {
    setTime(parseInt(e.target.value));
  };

  const handleStartStopClick = () => {
    if (count) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const formattedTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="countdown-container">
      <h1 className="countdown-heading">Countdown Timer</h1>
      <div className="input-container">
        <TextField
          className="input-field"
          label="Set Time (in seconds)"
          type="number"
          value={time}
          onChange={handleTimeChange}
        />
      </div>
      <div>
        <Button
          className="start-stop-button"
          variant="contained"
          onClick={handleStartStopClick}
        >
          {count ? "Stop" : "Start"}
        </Button>
      </div>
      <div className="current-time-container">
        <p className="current-time">Current Time: {formattedTime()}</p>
      </div>
    </div>
  );
}

export default Countdown;
