import React from "react";
import { useSelector } from "react-redux";

export default function Message() {
  const infoMessage = useSelector((state) => state.infoMessage);

  return <div id="message">{infoMessage}</div>;
}
