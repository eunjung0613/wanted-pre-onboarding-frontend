import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SignInComponent from "../components/SignIn";

function Signin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/todo");
    }
  }, []);

  return (
    <MainWrap>
      <Title
        drag
        dragConstraints={{
          top: -50,
          left: -50,
          right: 50,
          bottom: 50,
        }}
      >
        📝 <br />
        MINI todo
      </Title>
      <SubTitle>당신의 ✎기록적인✎ 하루를 위하여</SubTitle>
      <SignInComponent />
      <Footer>©designed by EUNJUNG</Footer>
    </MainWrap>
  );
}

const MainWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100vw;
  height: 100vh;
`;
const Title = styled(motion.h1)`
  color: #d1d37b;
  font-size: 3em;
  margin-top: 15%;
  font-family: "Kenia", cursive;
  text-shadow: 0.3em 0.3em #e7e8ba;
`;

const SubTitle = styled.div`
  font-size: 0.8em;
  color: grey;
  font-family: "Noto Sans KR", sans-serif;
`;

const Footer = styled.div`
  font-size: 0.7em;
  margin-top: auto;
  text-align: center;
  margin-bottom: 1em;
`;

export default Signin;
