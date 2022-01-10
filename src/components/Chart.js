import React from "react";
import Grid from "@material-ui/core/Grid";
import { Bar, Line } from "react-chartjs-2";
import cyan from "@material-ui/core/colors/cyan";
import deepPurple from "@material-ui/core/colors/deepPurple";

const Chart = ({
  prevHoje,
  prevAmanha,
  prevDoisDias,
  prevTresDias,
  prevQuatroDias,
  prevCincoDias,
  perHoje,
  perAmanha,
  perDoisDias,
  perTresDias,
  perQuatroDias,
  perCincoDias
}) => {
  const barData = {
    labels: [
      prevHoje.map(i => i.data.slice(0, 5)),
      prevAmanha.map(i => i.data.slice(0, 5)),
      prevDoisDias.map(i => i.data.slice(0, 5)),
      prevTresDias.map(i => i.data.slice(0, 5)),
      prevQuatroDias.map(i => i.data.slice(0, 5)),
      prevCincoDias.map(i => i.data.slice(0, 5))
    ],
    datasets: [
      {
        label: "Periodo de Onda",
        backgroundColor: cyan[400],
        data: [
          perHoje,
          perAmanha,
          perDoisDias,
          perTresDias,
          perQuatroDias,
          perCincoDias
        ]
      }
    ]
  };

  const lineData = {
    labels: [
      prevHoje.map(i => i.data.slice(0, 5)),
      prevAmanha.map(i => i.data.slice(0, 5)),
      prevDoisDias.map(i => i.data.slice(0, 5)),
      prevTresDias.map(i => i.data.slice(0, 5)),
      prevQuatroDias.map(i => i.data.slice(0, 5)),
      prevCincoDias.map(i => i.data.slice(0, 5))
    ],
    datasets: [
      {
        label: "Altura de Onda",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: deepPurple[400],
        data: [
          parseFloat(prevHoje.map(i => i.onda)),
          parseFloat(prevAmanha.map(i => i.onda)),
          parseFloat(prevDoisDias.map(i => i.onda)),
          parseFloat(prevTresDias.map(i => i.onda)),
          parseFloat(prevQuatroDias.map(i => i.onda)),
          parseFloat(prevCincoDias.map(i => i.onda))
        ]
      }
    ]
  };

  return (
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
          <Line data={lineData} />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Bar data={barData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Chart;
