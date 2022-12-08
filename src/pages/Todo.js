import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Todo() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return <p>${localStorage.getItem("token")}</p>;
}

export default Todo;
