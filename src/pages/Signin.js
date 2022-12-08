import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FadeInUpVariants } from "../constants/motion/index";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const baseURL = "https://pre-onboarding-selection-task.shop";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  const EmailCheck = useCallback((e) => {
    const Regex = /^[a-zA-Z0-9+-\_.]*@[a-zA-Z0-9+-\_.]*$/;
    const CurrentEmail = e.target.value;
    setEmail(CurrentEmail);

    if (!Regex.test(CurrentEmail)) {
      setEmailMessage("이메일이 형식에 맞지 않습니다.🥹");
      setCheckEmail(false);
    } else {
      setCheckEmail(true);
    }
  }, []);

  const PasswordCheck = useCallback((e) => {
    const CurrentPassword = e.target.value;
    setPassword(CurrentPassword);

    if (CurrentPassword.length < 8) {
      setPasswordMessage("최소 8자리 이상 입력해주세요.🥹");
      setCheckPassword(false);
    } else {
      setCheckPassword(true);
    }
  }, []);

  const LoginHandle = (e) => {
    e.preventDefault();

    axios
      .post(
        `${baseURL}/auth/signin`,
        JSON.stringify({ email: email, password: password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data.access_token);
        if (typeof res.data.access_token !== "undefined") {
          localStorage.setItem("token", res.data.access_token);
          navigate("/todo");
        } else if (typeof res.data.access_token == "undefined") {
          alert("없는 회원입니다.");
          navigate("/signup");
          console.log("로그인 실패");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
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
      <WholeForm>
        <FieldSet>
          <PageTitle>LOGIN</PageTitle>
          <InputForm
            type="email"
            placeholder="email"
            initial="initial"
            whileInView="animate"
            variants={FadeInUpVariants}
            viewport={{ once: false }}
            onChange={EmailCheck}
          />
          {email.length > 0 && checkEmail ? (
            <></>
          ) : (
            <Error
              initial="initial"
              whileInView="animate"
              variants={FadeInUpVariants}
              viewport={{ once: false }}
            >
              {emailMessage}
            </Error>
          )}
          <br />
          <InputForm
            type="password"
            placeholder="password"
            initial="initial"
            whileInView="animate"
            variants={FadeInUpVariants}
            viewport={{ once: false }}
            onChange={PasswordCheck}
          />
          {password.length > 0 && checkPassword ? (
            <></>
          ) : (
            <Error
              initial="initial"
              whileInView="animate"
              variants={FadeInUpVariants}
              viewport={{ once: false }}
            >
              {passwordMessage}
            </Error>
          )}
          <br />
          <ButtonWrap>
            <Button
              initial="initial"
              whileInView="animate"
              variants={FadeInUpVariants}
              viewport={{ once: false }}
              disabled={!(checkEmail && checkPassword)}
              onClick={LoginHandle}
            >
              로그인
            </Button>
            <Button
              initial="initial"
              whileInView="animate"
              variants={FadeInUpVariants}
              viewport={{ once: false }}
              onClick={() => navigate("/signup")}
            >
              회원가입
            </Button>
          </ButtonWrap>
        </FieldSet>
      </WholeForm>
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
const WholeForm = styled.form`
  margin: 2em auto;
  height: 20em;
  text-align: center;
  width: 80%;
`;

const FieldSet = styled.fieldset`
  border: 0.15em solid #f0e68c;
`;

const PageTitle = styled(motion.legend)`
  font-size: 1.5em;
  color: #f0e68c;
  font-family: "Kenia", cursive;
`;

const InputForm = styled(motion.input)`
  width: 12.5em;
  border: none;
  border-bottom: 0.1em solid;
  border-color: grey;
  &:focus {
    outline: none;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled(motion.button)`
  padding: 0.2em;
  margin: 2em;
  width: 7em;
  font-family: "Noto Sans KR", sans-serif;
  text-align: center;
  border: none;
  background-color: #f0e68c;
  color: white;
  &:hover,
  &:active {
    box-shadow: -0.2em -0.2em #dfc4a0;
  }
  &:disabled {
    &:hover {
      box-shadow: none;
    }
    background-color: grey;
  }
  margin-top: 2em;
`;

const Footer = styled.div`
  font-size: 0.7em;
  margin-top: auto;
  text-align: center;
  margin-bottom: 1em;
`;

const Error = styled(motion.div)`
  margin: 0;
  padding: 0;
  font-size: 0.4em;
  color: red;
`;

export default Signin;
