import React from "react";
import { useNavigate } from "react-router-dom";

function PreviousButton() {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>← Back</button>;
}

export default PreviousButton;
