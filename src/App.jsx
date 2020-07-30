import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Welcome from './pages/welcome/welcome.jsx';
import Login from './pages/login/login.jsx';
import Index from './pages/index/index.jsx';

function App() {
  return (
    <div className="main">
      <Router>
        <Route path="/" exact component={Welcome}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/index" component={Index}></Route>
      </Router>
    </div>
  )
}

export default App;
