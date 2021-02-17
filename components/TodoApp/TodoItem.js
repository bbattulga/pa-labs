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
  baseURL: process.env.API_URL || "http://localhost",
});
console.log(process.env.API_URL || "http://localhost");
const useStyles = makeStyles({
  invalid: {
    color: "red",
  },
  valid: {
    color: "green",
  },
});
export default function TodoItem({ todo, onDelete }) {
  const classes = useStyles();
  const [stateName, setStateName] = useState("");

  const tryTill = async ({ f, onFail }) => {
    let failCount = 0;
    while (true) {
      try {
        await f();
        break;
      } catch (e) {
        if (onFail) {
          onFail(++failCount);
        }
        await new Promise((r) => setTimeout(r, 5000));
      }
    }
  };

  const tryTillSave = async () => {
    const save = async () => {
      const response = await todoClient.post("/api/todos/create", todo);
      // create success
      todo.id = response.data;
    };
    await tryTill({
      f: save,
      onFail: (failCount) => {
        setStateName(`Retrying to save(${++failCount})...`);
      },
    });
  };

  useEffect(() => {
    if (!todo.id) {
      (async () => {
        setStateName("Saving...");
        await tryTillSave();
        setStateName("Saved");
      })();
    } else {
      setStateName("Saved");
    }
  }, [todo.id]);

  const handleDelete = async () => {
    if (!todo.id) {
      return;
    }
    setStateName("Deleting...");
    const del = async () => {
      const response = await todoClient.post("/api/todos/delete", {
        ids: [todo.id],
      });
      if (onDelete != null) {
        onDelete(todo.id);
      }
    };
    await tryTill({
      f: del,
      onFail: (i) => {
        setStateName(`Retrying to delete(${i})...`);
      },
    });
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
