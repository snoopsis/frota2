import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Olinda from "./components/Olinda";
import Recife from "./components/Recife";
import Acu from "./components/Acu";
import Buzios from "./components/Buzios";
import Home from "./components/Home";
import moment from "moment";
const hoje = moment().format("DD/MM/YYYY");

const App = () => {
  const [voosOlinda, setVoosOlinda] = useState([]);

  useEffect(() => {
    const voosOlinda = async () => {
      // Make a request for a user with a given ID
      axios
        .get("https://api.migueldias.net/buzios/voosolinda")
        .then(function(response) {
          // handle success
          setVoosOlinda(response.data.filter(i => i.data === hoje));
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    voosOlinda();
  }, []);

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home {...props} hoje={hoje} />}
          />
          <Route
            exact
            path="/olinda"
            render={props => <Olinda {...props} voosOlinda={voosOlinda} />}
          />
          <Route exact path="/recife" component={Recife} />
          <Route exact path="/acu" component={Acu} />
          <Route exact path="/buzios" component={Buzios} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
