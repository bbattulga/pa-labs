import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import List from "@material-ui/core/List/List";
import useSwr from "swr";
import CircularProgress from "@material-ui/core/CircularProgress";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/typographyStyle.js";
import Input from "@material-ui/core/Input";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button.js";
import TodoItem from "./TodoItem";
import TodosContext from "./context/TodoContext";
import axios from "axios";
import TodoContext from "./context/TodoContext";

const useStyles = makeStyles({
  ...styles,
  input: {
    marginRight: 20,
    width: 500,
  },
  todosContainer: {
    height: 500,
    overflow: "scroll",
  },
  submitBtn: {
    marginBottom: 40,
  },
  invalid: {
    color: "red",
  },
});

export default function TodoApp(props) {
  const classes = useStyles();
  const { data } = useContext(TodoContext);
  const [todos, setTodos] = useState(data);
  const [todoName, setTodoName] = useState("");

  const handleSubmit = async () => {
    console.error(todoName);
    if (!todoName || todoName === "") {
      return;
    }
    const todo = { title: `${todoName}`, created_at: `${Date()}` };
    setTodos([todo, ...todos]);
    setTodoName("");
  };
  const handleDelete = async (id) => {
    setTodos(todos.filter((t) => t.id != id));
  };
  return (
    <GridContainer justify="center">
      <GridItem md={4} xs={12}>
        <Input
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          placeholder="lorem ipsum"
        />
        <div></div>
        <Button color="primary" onClick={handleSubmit}>
          add data
        </Button>
      </GridItem>
      <GridItem md={8} xs={12}>
        <div className={classes.todosContainer}>
          {todos.map((todo) => (
            <TodoItem
              key={`${todo.id}${todo.title}${todo.created_at}`}
              todo={todo}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </GridItem>
    </GridContainer>
  );
}
