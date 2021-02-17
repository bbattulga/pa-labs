import React from "react";
import Router from "next/router";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "assets/jss/nextjs-material-kit/pages/landingPage.js";

// Sections for this page
import ProductSection from "pages-sections/LandingPage-Sections/ProductSection.js";
import TeamSection from "pages-sections/LandingPage-Sections/TeamSection.js";
import WorkSection from "pages-sections/LandingPage-Sections/WorkSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Б. Баттулга Лаб"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax filter responsive image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>
                Програм хангамжийн зохиомж ба архитектур
              </h1>
              <h4>
                Програм хангамжийн зохиомж болон архитектур нь хөгжүүлэлтийн
                өмнөх үйл ажиллагаа ба үүнийг олон улсад хүлээн зөвшөөрөгдсөн
                системүүд дээр жишээ авч оюутнууд өөрсдийн системийн зохиомж,
                архитектуруудыг гаргана.
              </h4>
              <br />
              <Button
                color="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lab 1
              </Button>
              <Button
                color="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                href="/lab2"
              >
                Lab 2
              </Button>
              <Button
                color="primary"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lab 3
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <WorkSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
