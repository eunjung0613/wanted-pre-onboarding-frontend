import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import AddTodoComponent from "../components/Todo/AddTodo";
import TodoComponent from "../components/Todo/Todo";

function Todo() {
  const BASE_URL = "https://pre-onboarding-selection-task.shop/";
  const token = localStorage.getItem("token");
  const [todoList, setTodoList] = useState([]);
  const [checklist, setCheckList] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios
        .get(`${BASE_URL}todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTodoList([...res.data]);
          setCheckList(true);
        })
        .catch((err) => {
          console.log(err);
        });
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
      <AddTodoComponent />
      <FieldSet>
        {checklist ? (
          todoList.map((item) => (
            <TodoComponent todo={item} token={token} todos={todoList} />
          ))
        ) : (
          <></>
        )}
      </FieldSet>
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
const Title = styled(motion.h4)`
  color: #d1d37b;
  font-size: 2em;
  font-family: "Kenia", cursive;
  text-shadow: 0.3em 0.3em #e7e8ba;
`;

const FieldSet = styled.fieldset`
  border: 0.15em solid #f0e68c;
  width: 35em;
  margin: 0 auto;
`;

export default Todo;
