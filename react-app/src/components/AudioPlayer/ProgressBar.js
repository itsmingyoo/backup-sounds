import React from "react";
import "./AudioPlayer.css";

function ProgressBar() {
  return (
    <div className="progress-bar">
      <span className="time current">00:00</span>
      <input type="range" />
      <span className="time">03:34</span>
    </div>
  );
}
export default ProgressBar;
