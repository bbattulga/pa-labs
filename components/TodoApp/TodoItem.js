import React, { useState, useMemo, useEffect } from "react";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Divider from "@material-ui/core/Divider/Divider";
import axios from "axios";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Checkbox from "@material-ui/core/Checkbox";
import Badge from "@material-ui/core/Badge";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { Check } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const todoClient = axios.create({
  baseURL: process.env.API_URL,
});
console.log(process.env.API_URL);
const useStyles = makeStyles({
  invalid: {
    color: "red",
  },
  valid: {
    color: "green",
  },
});

const retryInterval = 5000;

let failCount = 0;
export default function TodoItem({ todo, onDelete }) {
  const classes = useStyles();
  const [stateName, setStateName] = useState("");

  const save = async () => {
    try {
      failCount = 0;
      console.error(`CREATE ${todo.title}`);
      const response = await todoClient.post("/api/todos/create", todo);
      // create success
      todo.id = response.data;
      setStateName("Saved");
    } catch (e) {
      console.error(`${todo.title} create failed`);
      setStateName(`Retrying to add...`);
    }
  };

  useEffect(() => {
    if (!todo.id) {
      setStateName("Saving...");
      let interval = setInterval(save, retryInterval);
      return () => clearInterval(interval);
    } else {
      setStateName("Saved");
    }
  }, [todo.id]);

  const del = async () => {
    try {
      failCount = 0;
      console.error(`del ${todo.title}`);
      const response = await todoClient.post("/api/todos/delete", {
        ids: [todo.id],
      });
      if (onDelete != null) {
        onDelete(todo.id);
      }
    } catch (e) {
      console.error(`${todo.title} del failed`);
      setStateName("Failed to delete");
    }
  };
  const handleDelete = async () => {
    if (!todo.id) {
      return;
    }
    setStateName("Deleting...");
    del();
  };
  const stateColor = useMemo(() => {
    if (stateName === "Saved") {
      return classes.valid;
    }
    if (stateName === undefined) {
      return classes.valid;
    }
    return classes.invalid;
  }, [stateName]);
  return (
    <ListItem>
      <ListItemText>{todo.title}</ListItemText>
      <ListItemIcon>
        <h6 className={stateColor}>{stateName ?? "Saved"}</h6>
      </ListItemIcon>
      <ListItemIcon>
        <IconButton onClick={handleDelete}>
          <Icon>delete</Icon>
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
}
