import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import red from "@material-ui/core/colors/red";
import { ThemeProvider } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import orange from "@material-ui/core/colors/orange";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Chart from "./Chart";
import PlaceIcon from "@material-ui/icons/Place";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import FlightIcon from "@material-ui/icons/Flight";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: deepPurple[400]
    },
    secondary: {
      main: red[500]
    }
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  tableHead: {
    color: orange[500],
    fontWeight: "100"
  },
  tableRow: {
    fontWeight: "100"
  },
  tableTitle: {
    fontWeight: "100",
    color: "#f4f4f4",
    height: "100px",
    backgroundColor: "#424242",
    textAlign: "center"
  }
}));

export default function Olinda(props) {
  const classes = useStyles();
  const [prevHoje, setPrevHoje] = useState([]);
  const [prevAmanha, setPrevAmanha] = useState([]);
  const [prevDoisDias, setPrevDoisDias] = useState([]);
  const [prevTresDias, setPrevTresDias] = useState([]);
  const [prevQuatroDias, setPrevQuatroDias] = useState([]);
  const [prevCincoDias, setPrevCincoDias] = useState([]);

  const [perHoje, setPerHoje] = useState([]);
  const [perAmanha, setPerAmanha] = useState([]);
  const [perDoisDias, setPerDoisDias] = useState([]);
  const [perTresDias, setPerTresDias] = useState([]);
  const [perQuatroDias, setPerQuatroDias] = useState([]);
  const [perCincoDias, setPerCincoDias] = useState([]);

  const [posicao, setPosicao] = useState([]);

  const [voos, setVoos] = useState([]);

  const [ultimo, setUltimo] = useState([]);

  const hoje = moment().format("DD/MM/YYYY");
  const amanha = moment()
    .add(+1, "Day")
    .format("DD/MM/YYYY");
  const doisDias = moment()
    .add(+2, "Day")
    .format("DD/MM/YYYY");
  const tresDias = moment()
    .add(+3, "Day")
    .format("DD/MM/YYYY");
  const quatroDias = moment()
    .add(+4, "Day")
    .format("DD/MM/YYYY");
  const cincoDias = moment()
    .add(+5, "Day")
    .format("DD/MM/YYYY");

  useEffect(() => {
    const previsaoAlturaOnda = async () => {
      const resp = await axios.get(
        "https://api.migueldias.net/buzios/previsao/recife"
      );
      setPrevHoje(resp.data.filter(i => i.data === hoje));
      setPrevAmanha(resp.data.filter(i => i.data === amanha));
      setPrevDoisDias(resp.data.filter(i => i.data === doisDias));
      setPrevTresDias(resp.data.filter(i => i.data === tresDias));
      setPrevQuatroDias(resp.data.filter(i => i.data === quatroDias));
      setPrevCincoDias(resp.data.filter(i => i.data === cincoDias));

      setPerHoje(
        resp.data.filter(i => i.data === hoje).map(i => i.ondaPeriodo)[0]
      );
      setPerAmanha(
        resp.data.filter(i => i.data === amanha).map(i => i.ondaPeriodo)[0]
      );
      setPerDoisDias(
        resp.data.filter(i => i.data === doisDias).map(i => i.ondaPeriodo)[0]
      );
      setPerTresDias(
        resp.data.filter(i => i.data === tresDias).map(i => i.ondaPeriodo)[0]
      );
      setPerQuatroDias(
        resp.data.filter(i => i.data === quatroDias).map(i => i.ondaPeriodo)[0]
      );
      setPerCincoDias(
        resp.data.filter(i => i.data === cincoDias).map(i => i.ondaPeriodo)[0]
      );
    };
    previsaoAlturaOnda();

    const posicao = async () => {
      const resp = await axios.get(
        "https://api.migueldias.net/buzios/details/recife"
      );
      setPosicao(resp.data[0].posicao);
      setUltimo(resp.data[0].atualizacao);
    };
    posicao();

    const voos = async () => {
      // Make a request for a user with a given ID
      axios
        .get("https://api.migueldias.net/buzios/voosrecife")
        .then(function(response) {
          // handle success
          setVoos(response.data.filter(i => i.data === hoje));
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    voos();

    // eslint-disable-next-line
  }, []);

  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  const distancia = (lat, long) => {
    const distancia = calcCrow(
      posicao.slice(0, 6),
      posicao.slice(9, 15),
      lat,
      long
    ).toFixed(1);

    const distanciaInt = parseInt(distancia);

    const tempoVoo = (distanciaInt / 230) * 60;

    const tempoNav = distanciaInt / 18;

    const tempoVooEditado = parseInt(tempoVoo) + "m";

    // return `${distanciaInt}km / ${tempoVooEditado}`;
    return (
      <div>
        {distanciaInt}km <i className="fas fa-helicopter"></i> {tempoVooEditado}{" "}
        <i className="fas fa-ship"></i> {parseInt(tempoNav)}h
      </div>
    );
  };

  const lastUpdate = () => {
    var b = moment([
      ultimo.slice(0, 4),
      ultimo.slice(5, 7) - 1,
      ultimo.slice(8, 10)
    ]);
    var a = moment([hoje.slice(6, 10), hoje.slice(3, 5) - 1, hoje.slice(0, 2)]);
    return a.diff(b, "days");
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className={classes.section1}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4">
                SKANDI <strong>RECIFE</strong>
              </Typography>
            </Grid>
            <Grid item>
              <PlaceIcon
                style={{ marginBottom: 5, color: "2196f3" }}
              ></PlaceIcon>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="body1">
                {posicao.includes("VIT") || posicao.includes("NIT")
                  ? "Navio no Porto"
                  : posicao}
              </Typography>
            </Grid>
            <Grid item>
              <i
                className="fas fa-sync"
                style={{ marginBottom: 7, color: "red", marginLeft: 10 }}
              ></i>{" "}
              <strong>
                {lastUpdate() === 0 && "Hoje"}
                {lastUpdate() === 1 && lastUpdate() + " Dia"}
                {lastUpdate() > 1 && lastUpdate() + " Dias"}
              </strong>
            </Grid>
          </Grid>
          <Grid container direction="row" alignItems="center">
            <Grid item xs={6}>
              <Chip
                avatar={<Avatar>RJ</Avatar>}
                label={distancia(-22.9, -43.19)}
                clickable
                color="primary"
                variant="outlined"
                size="small"
                style={{ marginBottom: 10 }}
              />
            </Grid>
            <Grid item xs={6}>
              <Chip
                avatar={<Avatar>CF</Avatar>}
                label={distancia(-22.88, -42.02)}
                clickable
                color="secondary"
                variant="outlined"
                size="small"
                style={{ marginBottom: 10 }}
              />
            </Grid>{" "}
            <Grid item xs={6}>
              <Chip
                avatar={
                  <Avatar
                    style={{ backgroundColor: "#d500f9", color: "#ffffff" }}
                  >
                    MA
                  </Avatar>
                }
                label={distancia(-22.38, -41.78)}
                variant="outlined"
                size="small"
                style={{ marginBottom: 10, color: "#d500f9" }}
              />
            </Grid>
            <Grid item xs={6}>
              <Chip
                avatar={
                  <Avatar
                    style={{ backgroundColor: "#009688", color: "#ffffff" }}
                  >
                    VT
                  </Avatar>
                }
                label={distancia(-20.32, -40.33)}
                variant="outlined"
                size="small"
                style={{ marginBottom: 10, color: "#009688" }}
              />
            </Grid>
          </Grid>
          <Typography
            color="textSecondary"
            variant="body2"
            style={{ marginTop: 5 }}
          >
            Condições Meteorológicas.
          </Typography>
        </div>
        <Grid container>
          <Grid item>
            <Button
              color="primary"
              startIcon={<ArrowBackIcon />}
              onClick={() => props.history.push("/")}
              size="large"
              style={{ marginTop: 10 }}
            >
              Voltar
            </Button>
          </Grid>
        </Grid>
        <Divider variant="middle" />

        <div className={classes.section3}>
          <Grid container alignItems="center">
            {voos.map(i => (
              <Grid item key={i.id}>
                <Chip
                  className={classes.chip}
                  label={`${i.data.slice(0, 5)} - ${i.horario}`}
                  icon={<FlightIcon style={{ color: "2196f3" }} />}
                  style={{ backgroundColor: "#fff", marginTop: 10 }}
                />
              </Grid>
            ))}
          </Grid>
        </div>

        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>Data</TableCell>
                <TableCell className={classes.tableHead}>Onda</TableCell>
                <TableCell className={classes.tableHead}>Helideck</TableCell>
                <TableCell className={classes.tableHead}>Clima</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prevHoje.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perHoje + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
              {prevAmanha.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perAmanha + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
              {prevDoisDias.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perDoisDias + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
              {prevTresDias.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perTresDias + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
              {prevQuatroDias.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perQuatroDias + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
              {prevCincoDias.map(row => (
                <TableRow key={row.data}>
                  <TableCell className={classes.tableRow}>
                    {row.data.slice(0, 5)}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {row.onda + " / " + perCincoDias + "s"}
                  </TableCell>
                  <TableCell className={classes.tableRow}>
                    {(row.prev === "Favoravel" && (
                      <CheckCircleRoundedIcon
                        style={{
                          color: "#009933"
                        }}
                      />
                    )) ||
                      (row.prev === "Oscilando" && (
                        <ReportProblemRoundedIcon
                          style={{
                            color: "#e6e600"
                          }}
                        />
                      )) ||
                      (row.prev === "Desfavoravel" && (
                        <HighlightOffRoundedIcon
                          style={{
                            color: "#cc3300"
                          }}
                        />
                      ))}
                  </TableCell>
                  <TableCell>
                    <Avatar alt="Clima no Barco" src={row.tempoBarco} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Chart
          prevHoje={prevHoje}
          prevAmanha={prevAmanha}
          prevTresDias={prevTresDias}
          prevQuatroDias={prevQuatroDias}
          prevCincoDias={prevCincoDias}
          prevDoisDias={prevDoisDias}
          perHoje={perHoje}
          perAmanha={perAmanha}
          perDoisDias={perDoisDias}
          perTresDias={perTresDias}
          perQuatroDias={perQuatroDias}
          perCincoDias={perCincoDias}
        />
      </ThemeProvider>
    </div>
  );
}
