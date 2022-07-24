import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { moveClockwise, moveCounterClockwise } from "../state/action-creators";

export default function Wheel() {
  const dispatch = useDispatch();
  const wheel = useSelector((state) => state.wheel);

  const handleMoveCounterClockwise = () => {
    if (wheel === 0) {
      dispatch(moveCounterClockwise(5));
    } else {
      dispatch(moveCounterClockwise(wheel - 1));
    }
  };

  const handleMoveClockwise = () => {
    if (wheel === 5) {
      dispatch(moveClockwise(0));
    } else {
      dispatch(moveClockwise(wheel + 1));
    }
  };

  return (
    <div id="wrapper">
      <div id="wheel">
        {[0, 1, 2, 3, 4, 5].map((number) => {
          return (
            <div
              key={number}
              className={`cog ${number === wheel ? "active" : ""}`}
              style={{ "--i": number }}
            >{number === wheel ? "B" : ""}</div>
          );
        })}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleMoveCounterClockwise}>
          Counter clockwise
        </button>
        <button id="clockwiseBtn" onClick={handleMoveClockwise}>
          Clockwise
        </button>
      </div>
    </div>
  );
}
