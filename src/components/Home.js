import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Logo from "./Logo";
import Footer from "./Footer";

const Home = () => {
  return (
    <Fragment>
      <Logo />
      <Container style={{ marginTop: 15 }}>
        <Link to="/olinda" style={{ textDecoration: "none" }}>
          <Paper
            elevation={0}
            style={{
              fontWeight: "100",

              color: "#f4f4f4",
              height: "100px",
              backgroundColor: "#4f5b62",
              textAlign: "center"
            }}
          >
            <Typography
              variant="body1"
              component="h1"
              style={{ padding: 15, textTransform: "uppercase" }}
            >
              Condições Meteorológicas
            </Typography>

            <Typography variant="body2" component="h2">
              SKANDI OLINDA
            </Typography>
          </Paper>
        </Link>
        <Link to="/recife" style={{ textDecoration: "none" }}>
          <Paper
            elevation={0}
            style={{
              fontWeight: "100",
              marginTop: 20,
              color: "#f4f4f4",
              height: "100px",
              backgroundColor: "#cfd8dc",
              textAlign: "center"
            }}
          >
            <Typography
              variant="body1"
              component="h1"
              style={{
                padding: 15,
                textTransform: "uppercase",
                color: "#000",
                fontWeight: 400
              }}
            >
              Condições Meteorológicas
            </Typography>

            <Typography
              variant="body2"
              component="h2"
              style={{ color: "#000" }}
            >
              SKANDI RECIFE
            </Typography>
          </Paper>
        </Link>

        <Link to="/acu" style={{ textDecoration: "none" }}>
          <Paper
            elevation={0}
            style={{
              fontWeight: "100",
              marginTop: 20,
              color: "#fff",
              height: "100px",
              backgroundColor: "#212121",
              textAlign: "center"
            }}
          >
            <Typography
              variant="body1"
              component="h1"
              style={{ padding: 15, textTransform: "uppercase" }}
            >
              Condições Meteorológicas
            </Typography>

            <Typography variant="body2" component="h2">
              SKANDI AÇU
            </Typography>
          </Paper>
        </Link>

        <Link to="/buzios" style={{ textDecoration: "none" }}>
          <Paper
            elevation={0}
            style={{
              fontWeight: "100",
              marginTop: 20,
              color: "#fff",
              height: "100px",
              backgroundColor: "#3e2723",
              textAlign: "center"
            }}
          >
            <Typography
              variant="body1"
              component="h1"
              style={{ padding: 15, textTransform: "uppercase" }}
            >
              Condições Meteorológicas
            </Typography>

            <Typography variant="body2" component="h2">
              SKANDI BUZIOS
            </Typography>
          </Paper>
        </Link>
        <Footer />
      </Container>
    </Fragment>
  );
};

export default Home;
