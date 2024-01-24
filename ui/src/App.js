import react from "react";
import './App.css';
import Home from "./Home";
import Admin from "./admin";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "./Unauthorized";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact >
            <Home/>
          </Route>
          <PrivateRoute path="/admin" exact >
            <Admin/>
          </PrivateRoute>
          <Route path="/Unauthorized" exact >
            <Unauthorized/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
