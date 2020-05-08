import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as FontIcon from "@fortawesome/free-solid-svg-icons";
import "./Clicker.css";

const clicker = props => {
  const buttonLeft = ["button", props.right ? "buttonLeft" : null];
  const buttonRight = ["button", props.left ? "buttonRight" : null];
  const textAni = [
    "textStyle",
    props.left ? "textLeft" : props.right ? "textRight" : null
  ];
  const appClick = ["content", props.scale ? "appClick" : null];

  return (
    <div className="container">
      <div className={appClick.join(" ")}>
        <button onClick={props.decrement} className={buttonLeft.join(" ")}>
          <FontAwesomeIcon
            icon={FontIcon.faChevronLeft}
            size="4x"
            color="#1c4b82"
          />
        </button>
        <p className={textAni.join(" ")}>{props.count}</p>
        <button onClick={props.increment} className={buttonRight.join(" ")}>
          <FontAwesomeIcon
            icon={FontIcon.faChevronRight}
            size="4x"
            color="#1c4b82"
          />
        </button>
      </div>

      <button className="refreshButton" onClick={props.reset}>
        <FontAwesomeIcon icon={FontIcon.faSyncAlt} size="4x" color="white" />
      </button>
    </div>
  );
};

export default clicker;
