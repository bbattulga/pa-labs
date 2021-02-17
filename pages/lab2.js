import React, { useState } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import fetch from "node-fetch";

import classnames from "classnames";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/typographyStyle.js";

import PageContainer from "components/PageContainer/PageContainer";
import TodoApp from "components/TodoApp/TodoApp";
import TodoContext from "components/TodoApp/context/TodoContext";
import database from "../database";

export default function Lab2Index(props) {
  const { data } = props;
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
      <TodoContext.Provider value={{ data }}>
        <TodoApp />
      </TodoContext.Provider>
    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  let res = await database.select("*").from("todos").orderBy("id", "DESC");
  res = res.map((r) => ({ ...r, created_at: `${r.created_at}` }));
  return {
    props: {
      data: res,
    },
  };
}
