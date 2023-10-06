import React from "react";
import { BsStopwatch } from "react-icons/bs";
import styled from "styled-components";

const TimerWrapper = styled.div`
  margin-top: 30px;
  width: 300px;
  height:60px;
  margin-left: auto;
  margin-right: auto;
  background-color: #222;
  color: #eee;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 4px 6px rgba(0, 0, 0, 0.4);
  padding: 1rem 0;

  .stop-watch {
    font-size: 50px;
    margin-right: 1rem;
  }
  label {
    margin-bottom: 0.5rem;
  }
  input {
    width: 50px;
    margin-right: 1rem;
    color: #282c34;
    outline: none;
    border: none;
    font-size: 20px;
    font-weight: 200;
    text-align: center;
    padding: 0rem 0.5rem;
    border-radius: 5px;
  }
  input:hover {
    background-color: #928f8f;
  }
`;

export default function Timer({
  days,
  seconds,
  minutes,
  hours,
  changeSeconds,
  changeMinutes,
  changeHours,
  changeDays,
}) {
  return (
    <TimerWrapper>
      <BsStopwatch style={{marginLeft:"5px",marginTop:"17px"}} className="stop-watch " />
      <div className="d-flex flex-column">
        <label>dd</label>
        <input value={days} onChange={changeDays} />
      </div>{" "}
      <div className="d-flex flex-column">
        <label>hh</label>
        <input value={hours} onChange={changeHours} />
      </div>{" "}
      <div className="d-flex flex-column">
        <label>mm</label>
        <input value={minutes} onChange={changeMinutes} />
      </div>{" "}
      <div className="d-flex flex-column">
        <label>ss</label>
        <input value={seconds} onChange={changeSeconds} />
      </div>
    </TimerWrapper>
  );
}
