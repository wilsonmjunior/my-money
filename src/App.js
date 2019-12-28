
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Components/Header';
import Home from "./Pages/Home";
import Movimentacoes from './Pages/Movimentacoes';

function App () {
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Home} />
      <Route path="/movimentacoes/:data" exact component={Movimentacoes} />
    </Router>
  );
}

export default App;
