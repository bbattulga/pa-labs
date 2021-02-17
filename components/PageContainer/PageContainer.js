import React, { useState } from "react";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import classnames from "classnames";

import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/componentsSections/typographyStyle.js";

const useStyles = makeStyles({
  ...styles,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    marginTop: 60,
    marginBottom: 60,
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 830px)": {
      marginLeft: "10px",
      marginRight: "10px",
    },
  },
});

export default function PageContainer(props) {
  const classes = useStyles();
  const { children } = props;

  return (
    <div className={classnames(classes.main, classes.mainRaised)}>
      <div className={classes.section}>
        <div className={classes.container}>{children}</div>
      </div>
    </div>
  );
}
