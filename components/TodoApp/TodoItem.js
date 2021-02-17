import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import Divider from "@material-ui/core/Divider/Divider";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Checkbox from "@material-ui/core/Checkbox";
import Badge from "@material-ui/core/Badge";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { Check } from "@material-ui/icons";
export default function TodoItem({ id, title, state, onDelete }) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };
  return (
    <ListItem>
      <ListItemText>{title}</ListItemText>
      <ListItemIcon>{state ?? "Saved"}</ListItemIcon>
      <ListItemIcon>
        <IconButton onClick={handleDelete}>
          <Icon button>delete</Icon>
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
}
