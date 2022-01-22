import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Logo from "./Logo";
import Footer from "./Footer";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";

const hoje = moment().format("DD/MM/YYYY");

const Home = props => {
  const [olinda, setOlinda] = useState([]);
  const [recife, setRecife] = useState([]);
  const [acu, setAcu] = useState([]);
  const [buzios, setBuzios] = useState([]);
  const [prevHojeOlinda, setPrevHojeOlinda] = useState([]);
  const [prevHojeRecife, setPrevHojeRecife] = useState([]);
  const [prevHojeAcu, setPrevHojeAcu] = useState([]);
  const [prevHojeBuzios, setPrevHojeBuzios] = useState([]);

  useEffect(() => {
    const previsaoAlturaOndaOlinda = async () => {
      const resp = await axios.get(
        "https://api.migueldias.net/buzios/previsao/olinda"
      );
      setPrevHojeOlinda(resp.data.filter(i => i.data === hoje));
    };
    previsaoAlturaOndaOlinda();

    const previsaoAlturaOndaRecife = async () => {
      const resp = await axios.get(
        "https://api.migueldias.net/buzios/previsao/recife"
      );
      setPrevHojeRecife(resp.data.filter(i => i.data === hoje));
    };
    previsaoAlturaOndaRecife();

    const previsaoAlturaOndaAcu = async () => {
      const resp = await axios.get(
        "https://api.migueldias.net/buzios/previsao/acu"
      );
      setPrevHojeAcu(resp.data.filter(i => i.data === hoje));
    };
    previsaoAlturaOndaAcu();

    const previsaoAlturaOndaBuzios = async () => {
      const resp = await axios.get(
        "https://api.migueldias.net/buzios/previsao"
      );
      setPrevHojeBuzios(resp.data.filter(i => i.data === hoje));
    };
    previsaoAlturaOndaBuzios();

    const voosOlinda = async () => {
      // Make a request for a user with a given ID
      axios
        .get("https://api.migueldias.net/buzios/voosolinda")
        .then(function(response) {
          // handle success
          setOlinda(
            response.data.filter(
              i => i.data === hoje && i.saida_aero.length < 2
            )
          );
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    voosOlinda();

    const voosRecife = async () => {
      // Make a request for a user with a given ID
      axios
        .get("https://api.migueldias.net/buzios/voosrecife")
        .then(function(response) {
          // handle success
          setRecife(
            response.data.filter(
              i => i.data === hoje && i.saida_aero.length < 2
            )
          );
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    voosRecife();

    const voosAcu = async () => {
      // Make a request for a user with a given ID
      axios
        .get("https://api.migueldias.net/buzios/voosacu")
        .then(function(response) {
          // handle success
          setAcu(
            response.data.filter(
              i => i.data === hoje && i.saida_aero.length < 2
            )
          );
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    voosAcu();

    const voosBuzios = async () => {
      // Make a request for a user with a given ID
      axios
        .get("https://api.migueldias.net/buzios/voos")
        .then(function(response) {
          // handle success
          setBuzios(
            response.data.filter(
              i => i.data === hoje && i.saida_aero.length < 2
            )
          );
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    voosBuzios();
    // eslint-disable-next-line
  }, []);

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
              height: "100%",
              minHeight: "80px",
              backgroundColor: "#4f5b62",
              textAlign: "center"
            }}
          >
            <Grid container>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <Typography
                  variant="body1"
                  component="h1"
                  style={{
                    textTransform: "uppercase",
                    color: "#fff",
                    fontWeight: 500
                  }}
                >
                  Condições Meteorológicas
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 5, color: "#42a5f5" }}>
                <Typography variant="body2" component="h2">
                  SKANDI <strong>OLINDA</strong>
                </Typography>
                <Typography>
                  {prevHojeOlinda.map(
                    row =>
                      (row.prev === "Favoravel" && (
                        <CheckCircleRoundedIcon
                          style={{
                            color: "#91ff35"
                          }}
                          key={row.id}
                        />
                      )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                          key={row.id}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                          key={row.id}
                        />
                      ))
                  )}
                </Typography>
              </Grid>
              {olinda.length > 0
                ? olinda.map(i => (
                    <Fragment key={i.id}>
                      <Grid
                        container
                        style={{
                          marginBottom: 10,
                          marginLeft: "1ch"
                        }}
                      >
                        <Grid item>
                          <Avatar
                            src={
                              olinda.length > 0 ? i.companhiaAerea : undefined
                            }
                            variant="square"
                            style={{
                              width: "100%",
                              maxWidth: "6ch",
                              maxHeight: "2ch",
                              marginLeft: 3
                            }}
                          ></Avatar>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="caption"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5,
                              marginTop: 3,
                              fontSize: "10px"
                            }}
                          >
                            {i.procedencia === "Jacarepagua / SKOL" &&
                              "Jacarepagua"}
                            {i.procedencia === "Macae / SKOL" && "Macae"}
                            {i.procedencia === "Cabo Frio / SKOL" &&
                              "Cabo Frio"}
                            {i.procedencia === "Vitoria / SKOL" && "Vitoria"}
                          </Typography>
                        </Grid>
                        {/* <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.data.slice(0, 5)}
                          </Typography>
                        </Grid> */}
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.horario}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.prefixo}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="caption"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5,
                              marginTop: 2
                            }}
                          >
                            {i.modelo}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Fragment>
                  ))
                : undefined}
            </Grid>
          </Paper>
        </Link>

        <Link to="/recife" style={{ textDecoration: "none" }}>
          <Paper
            elevation={0}
            style={{
              fontWeight: "100",
              marginTop: 20,
              color: "#000",
              height: "100%",
              minHeight: "80px",
              backgroundColor: "#cfd8dc",
              textAlign: "center"
            }}
          >
            <Grid container>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <Typography
                  variant="body1"
                  component="h1"
                  style={{
                    textTransform: "uppercase",
                    color: "#000",
                    fontWeight: 500
                  }}
                >
                  Condições Meteorológicas
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 5, color: "#004d40" }}>
                <Typography variant="body2" component="h2">
                  SKANDI <strong>RECIFE</strong>
                </Typography>
                <Typography>
                  {prevHojeRecife.map(
                    row =>
                      (row.prev === "Favoravel" && (
                        <CheckCircleRoundedIcon
                          style={{
                            color: "#009933"
                          }}
                          key={row.id}
                        />
                      )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                          key={row.id}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                          key={row.id}
                        />
                      ))
                  )}
                </Typography>
              </Grid>
              {recife.length > 0
                ? recife.map(i => (
                    <Fragment key={i.id}>
                      <Grid
                        container
                        style={{
                          marginTop: 2,
                          marginBottom: 10,
                          marginLeft: "1ch"
                        }}
                      >
                        <Grid item>
                          <Avatar
                            src={
                              recife.length > 0 ? i.companhiaAerea : undefined
                            }
                            variant="square"
                            style={{
                              width: "100%",
                              maxWidth: "6ch",
                              maxHeight: "2ch",
                              marginLeft: 3
                            }}
                          ></Avatar>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="caption"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5,
                              marginTop: 2,
                              fontSize: "10px"
                            }}
                          >
                            {i.procedencia === "Jacarepagua / SKRE" &&
                              "Jacarepagua"}
                            {i.procedencia === "Macae / SKRE" && "Macae"}
                            {i.procedencia === "Cabo Frio / SKRE" &&
                              "Cabo Frio"}
                            {i.procedencia === "Vitoria / SKRE" && "Vitoria"}
                          </Typography>
                        </Grid>
                        {/* <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.data.slice(0, 5)}
                          </Typography>
                        </Grid> */}
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.horario}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.prefixo}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="caption"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5,
                              marginTop: 2
                            }}
                          >
                            {i.modelo}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Fragment>
                  ))
                : undefined}
            </Grid>
          </Paper>
        </Link>

        <Link to="/acu" style={{ textDecoration: "none" }}>
          <Paper
            elevation={0}
            style={{
              fontWeight: "100",
              marginTop: 20,
              color: "#fff",
              height: "100%",
              minHeight: "80px",
              backgroundColor: "#212121",
              textAlign: "center"
            }}
          >
            <Grid container>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <Typography
                  variant="body1"
                  component="h1"
                  style={{
                    textTransform: "uppercase",
                    color: "#fff",
                    fontWeight: 500
                  }}
                >
                  Condições Meteorológicas
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 5, color: "#00b8d4" }}>
                <Typography variant="body2" component="h2">
                  SKANDI <strong>AÇU</strong>
                </Typography>
                <Typography>
                  {prevHojeAcu.map(
                    row =>
                      (row.prev === "Favoravel" && (
                        <CheckCircleRoundedIcon
                          style={{
                            color: "#91ff35"
                          }}
                          key={row.id}
                        />
                      )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                          key={row.id}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                          key={row.id}
                        />
                      ))
                  )}
                </Typography>
              </Grid>
              {acu.length > 0
                ? acu.map(i => (
                    <Fragment key={i.id}>
                      <Grid
                        container
                        style={{
                          marginTop: 2,
                          marginBottom: 10,
                          marginLeft: "1ch"
                        }}
                      >
                        <Grid item>
                          <Avatar
                            src={acu.length > 0 ? i.companhiaAerea : undefined}
                            variant="square"
                            style={{
                              width: "100%",
                              maxWidth: "6ch",
                              maxHeight: "2ch",
                              marginLeft: 3
                            }}
                          ></Avatar>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="caption"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5,
                              marginTop: 2,
                              fontSize: "10px"
                            }}
                          >
                            {i.procedencia === "Jacarepagua / SKAU" &&
                              "Jacarepagua"}
                            {i.procedencia === "Macae / SKAU" && "Macae"}
                            {i.procedencia === "Cabo Frio / SKAU" &&
                              "Cabo Frio"}
                            {i.procedencia === "Vitoria / SKAU" && "Vitoria"}
                          </Typography>
                        </Grid>
                        {/* <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.data.slice(0, 5)}
                          </Typography>
                        </Grid> */}
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.horario}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.prefixo}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="caption"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5,
                              marginTop: 2
                            }}
                          >
                            {i.modelo}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Fragment>
                  ))
                : undefined}
            </Grid>
          </Paper>
        </Link>

        <Link to="/buzios" style={{ textDecoration: "none" }}>
          <Paper
            elevation={0}
            style={{
              fontWeight: "100",
              marginTop: 20,
              color: "#fff",
              height: "100%",
              minHeight: "80px",
              backgroundColor: "#3e2723",
              textAlign: "center"
            }}
          >
            <Grid container>
              <Grid item xs={12} style={{ marginTop: 10 }}>
                <Typography
                  variant="body1"
                  component="h1"
                  style={{
                    textTransform: "uppercase",
                    color: "#fff",
                    fontWeight: 500
                  }}
                >
                  Condições Meteorológicas
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginBottom: 5, color: "#f4511e" }}>
                <Typography variant="body2" component="h2">
                  SKANDI <strong>BUZIOS</strong>
                </Typography>
                <Typography>
                  {prevHojeBuzios.map(
                    row =>
                      (row.prev === "Favoravel" && (
                        <CheckCircleRoundedIcon
                          style={{
                            color: "#91ff35"
                          }}
                          key={row.id}
                        />
                      )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                          key={row.id}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                          key={row.id}
                        />
                      ))
                  )}
                </Typography>
              </Grid>
              {buzios.length > 0
                ? buzios.map(i => (
                    <Fragment key={i.id}>
                      <Grid
                        container
                        style={{
                          marginTop: 2,
                          marginBottom: 10,
                          marginLeft: "1ch"
                        }}
                      >
                        <Grid item>
                          <Avatar
                            src={
                              buzios.length > 0 ? i.companhiaAerea : undefined
                            }
                            variant="square"
                            style={{
                              width: "100%",
                              maxWidth: "6ch",
                              maxHeight: "2ch",
                              marginLeft: 3
                            }}
                          ></Avatar>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="caption"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5,
                              marginTop: 2,
                              fontSize: "10px"
                            }}
                          >
                            {i.procedencia === "Jacarepagua / SKBU" &&
                              "Jacarepagua"}
                            {i.procedencia === "Macae / SKBU" && "Macae"}
                            {i.procedencia === "Cabo Frio / SKBU" &&
                              "Cabo Frio"}
                            {i.procedencia === "Vitoria / SKBU" && "Vitoria"}
                          </Typography>
                        </Grid>
                        {/* <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.data.slice(0, 5)}
                          </Typography>
                        </Grid> */}
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.horario}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="subtitle2"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5
                            }}
                          >
                            {i.prefixo}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            variant="caption"
                            component="h1"
                            style={{
                              textTransform: "uppercase",
                              marginLeft: 5,
                              marginTop: 2
                            }}
                          >
                            {i.modelo}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Fragment>
                  ))
                : undefined}
            </Grid>
          </Paper>
        </Link>
        <Footer />
      </Container>
    </Fragment>
  );
};

export default Home;
