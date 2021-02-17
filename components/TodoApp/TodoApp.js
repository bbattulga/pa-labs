import React, { useState, useEffect, useContext } from "react";
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
});

export default function TodoApp(props) {
  const classes = useStyles();

  const [todoName, setTodoName] = useState("");
  const todosInitial = useContext(TodoContext);
  const [todos, setTodos] = useState(todosInitial);

  const handleSubmit = async () => {
    if (!todoName || todoName === "") {
      return;
    }
    const save = async () => {
      setTodoName("");
      const todo = { title: todoName };
      setTodos([{ ...todo, state: "Saving..." }, ...todos]);
      const result = await axios.post("/api/todos/create", todo);
      todo.id = result;
      setTodos([todo, ...todos]);
    };
    try {
      save();
    } catch (e) {
      console.log("create failed");
      setTimeout(() => {
        console.log("retryin to save...");
        save();
      }, 5000);
    }
  };
  const handleDelete = async (id) => {
    if (!id) {
      return;
    }
    const todo = todos.filter((t) => t.id == id)[0];
    todo.state = "Deleting...";
    setTodos([...todos]);
    const result = await axios.post("/api/todos/delete", {
      ids: [id],
    });
    if (!result) {
      // failed to delete
      todo.state = "Failed to delete";
      setTodos([...todos]);
    } else {
      // delete succeed
      setTodos(todos.filter((t) => t.id != id));
    }
  };
  return (
    <GridContainer justify="center">
      <GridItem md={4} xs={12}>
        <Input
          value={todoName}
          onChange={(event) => setTodoName(event.target.value)}
          labelText={"Todo Name"}
          classNames={classes.input}
        />
        <div></div>
        <Button
          color="primary"
          onClick={handleSubmit}
          className={classes.submitBtn}
        >
          add data
        </Button>
      </GridItem>
      <GridItem md={8} xs={12}>
        <div className={classes.todosContainer}>
          {todos.map((t) => (
            <TodoItem {...t} onDelete={handleDelete} />
          ))}
        </div>
      </GridItem>
    </GridContainer>
  );
}
