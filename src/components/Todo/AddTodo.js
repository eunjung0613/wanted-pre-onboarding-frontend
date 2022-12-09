import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import { FadeInUpVariants } from "../../constants/motion/index";

function AddTodo() {
  const BASE_URL = "https://pre-onboarding-selection-task.shop/";
  const Token = localStorage.getItem("token");
  const [todoinput, setTodoinput] = useState("");

  const checkTodo = (e) => {
    setTodoinput(e.target.value);
  };

  const addTodohandle = (e) => {
    axios
      .post(
        `${BASE_URL}todos`,
        JSON.stringify({ todo: todoinput }),
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setTodoinput("");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <FieldSet>
      <PageTitle>ADD TODO</PageTitle>
      <InputForm
        type="text"
        maxLength="30"
        minLength="1"
        placeholder="할 일을 입력해주세요"
        initial="initial"
        whileInView="animate"
        value={todoinput}
        variants={FadeInUpVariants}
        viewport={{ once: false }}
        onChange={checkTodo}
      />
      <Button
        initial="initial"
        whileInView="animate"
        variants={FadeInUpVariants}
        viewport={{ once: false }}
        onClick={addTodohandle}
      >
        추가하기
      </Button>
    </FieldSet>
  );
}

const FieldSet = styled.fieldset`
  border: 0.15em solid #f0e68c;
  width: 35em;
  margin: 0 auto;
`;

const PageTitle = styled(motion.legend)`
  font-size: 0.7em;
  color: #eee6c4;
  text-shadow: 0.1em 0.1em black;
  font-family: "Noto Sans KR", sans-serif;
`;

const InputForm = styled(motion.input)`
  width: 15em;
  border-width: 0.2em;
  border-color: #eee6c4;
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

export default AddTodo;
