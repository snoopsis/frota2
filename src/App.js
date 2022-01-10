import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Olinda from "./components/Olinda";
import Recife from "./components/Recife";
import Acu from "./components/Acu";
import Buzios from "./components/Buzios";
import Home from "./components/Home";

const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/olinda" component={Olinda} />
          <Route exact path="/recife" component={Recife} />
          <Route exact path="/acu" component={Acu} />
          <Route exact path="/buzios" component={Buzios} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
