import React, { useState } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import axios from "axios";

import classnames from "classnames";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/typographyStyle.js";

import PageContainer from "components/PageContainer/PageContainer";
import TodoApp from "components/TodoApp/TodoApp";
import TodoContext from "components/TodoApp/context/TodoContext";

const useStyles = makeStyles({
  ...styles,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 830px)": {
      marginLeft: "10px",
      marginRight: "10px",
    },
  },
});

export default function Lab2Index(props) {
  const classes = useStyles();
  const { todos } = props;
  return (
    <PageContainer>
      <h1>Лаборатори 1 Даалгавар</h1>
      <br />
      <h3>
        Сүлжээ тасарсан үед өгөгдлөө өөр дээрээ хадгалж байгаад сүлжээтэй
        болмогц сүлжээнд байгаа баазруугаа шидэх вэб эсвэл програм бичнэ үү
      </h3>
      <br />
      <img src="/lab2.png" width={"100%"} />
      <br />
      <h1>Гүйцэтгэл</h1>
      <br />
      <TodoContext.Provider value={todos}>
        <TodoApp />
      </TodoContext.Provider>
    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  const res = await axios.post("/api/todos");
  return {
    props: {
      todos: res.data,
    },
  };
}
