import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { defaultFadeInScaleVariants } from "../../constants/motion/index";
import axios from "axios";

function Todo({ todo, token, todos }) {
  const BASE_URL = "https://pre-onboarding-selection-task.shop/";
  const [Completed, setCompleted] = useState(todo.isCompleted);
  const [editMode, setEditMode] = useState(false);
  const [editTodo, setEditTodo] = useState(todo.todo);
  const [todoList, setTodoList] = useState(todos);

  const EditModeHandler = () => {
    setEditMode(!editMode);
  };

  const onchange = (e) => {
    setEditTodo(e.target.value);
  };

  const deleteHandler = (id) => {
    axios
      .delete(`${BASE_URL}todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTodoList(todoList.filter((todo) => todo.id !== id));
      })
      .then(() => {
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateHandler = (targetId, todo, isCompleted) => {
    axios
      .put(
        `${BASE_URL}todos/${targetId}`,
        {
          todo: editTodo,
          isCompleted: Completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
        console.log(data);
        setTodoList(
          todoList.map((todo) =>
            todo.id === data.id
              ? {
                  ...todo,
                  todo: data.todo,
                  isCompleted: data.isCompleted,
                }
              : todo
          )
        );
      })
      .then(() => {
        window.location.reload();
      })
      .then(() => {
        setEditMode(!editMode);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const CompletedHandler = async (id) => {
    setCompleted(!Completed);
    await axios
      .put(
        `${BASE_URL}todos/${id}`,
        {
          todo: editTodo,
          isCompleted: Completed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
        {
          withCredentials: true,
        }
      )
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <CardWrap
      initial="initial"
      whileInView="animate"
      variants={defaultFadeInScaleVariants}
      viewport={{ once: false }}
    >
      {editMode ? (
        <>
          {todo.isCompleted === true ? (
            <>
              <TodoIn type="text" defaultValue={todo.todo} disabled />
              <Span>완료</Span>
            </>
          ) : (
            <>
              <input
                type="checkbox"
                defaultValue={Completed}
                onClick={() => {
                  CompletedHandler(todo.id);
                }}
              />
              <TodoIn
                type="text"
                defaultValue={todo.todo}
                onChange={onchange}
              />
            </>
          )}
          <Update
            onClick={(e) => {
              e.preventDefault();
              updateHandler(todo.id);
            }}
          >
            확인
          </Update>
          &nbsp;
          <Update onClick={EditModeHandler}>취소</Update>&nbsp;
        </>
      ) : (
        <>
          {todo.isCompleted === true ? (
            <>
              <TodoIn type="text" defaultValue={todo.todo} disabled />
              <Span>완료</Span>
            </>
          ) : (
            <>
              <TodoIn
                type="text"
                defaultValue={todo.todo}
                onChange={onchange}
              />
              <Update onClick={EditModeHandler}>수정</Update>&nbsp;
            </>
          )}
          <Delete
            onClick={(e) => {
              e.preventDefault();
              deleteHandler(todo.id);
            }}
          >
            삭제
          </Delete>
        </>
      )}
    </CardWrap>
  );
}

const CardWrap = styled(motion.div)`
  justify-content: space-between;
  background-color: grey;
  border-radius: 0.2em;
  padding: 0.2em;
  margin: 0.3em;
  align: left;
`;

const TodoIn = styled.input`
  border: none;
  margin: 1em;
  background-color: grey;
`;

const Delete = styled.button`
  width: 7em;
  font-family: "Noto Sans KR", sans-serif;
  text-align: center;
  border: none;
  border-radius: 2.5em;
  background-color: #f0e68c;
  color: grey;
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
`;

const Update = styled.button`
  width: 7em;
  font-family: "Noto Sans KR", sans-serif;
  text-align: center;
  border: none;
  border-radius: 2.5em;
  background-color: #f0e68c;
  color: grey;
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
`;

const Span = styled.span`
  font-size: 0.4em;
  font-color: grey;
  margin-right: 2em;
`;

export default Todo;
