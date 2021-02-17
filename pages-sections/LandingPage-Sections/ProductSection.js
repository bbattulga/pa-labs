import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import styles from "assets/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js";

const useStyles = makeStyles({
  ...styles,
  stepsImage: {
    marginTop: 50,
    borderRadius: 10,
  },
});

export default function ProductSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Програм хангамжын зохиомж</h2>
          <h5 className={classes.description}>
            Програм хангамж хөгжүүлэлт хийхийн тулд тодорхой дэс дараалал бүхий
            алхмуудыг хийх хэрэгтэй. Үүнд програмын талаар ерөнхий судалгаа
            хийх, хэрэглэгчийн хэрэгцээ ба шаардлагыг тодорхойлох, загварчлан
            төлөвлөх, түүн дээр тулгуурлан програм зохиох, зохиосныхоо дараа
            шаардлагад нийцэж байгаа эсэхийг шалгах, цаашид үргэлжлүүлэн
            хөгжүүлэх зэрэг програм зохиох явцад хийгдэж болох олон үйл
            ажиллагаанууд орно.
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        <GridContainer>
          <GridItem xs={12}>
            <img
              src={"/steps.png"}
              alt="Steps"
              width={"100%"}
              className={classes.stepsImage}
            />
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
