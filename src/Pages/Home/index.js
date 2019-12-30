import React from 'react'

import AdicionarMes from './AdicionarMes'
import Meses from './Meses'
import { Route, Switch } from 'react-router-dom'
import Movimentacoes from '../Movimentacoes'

const Home = (props) => {
  return (
    <>
      <div className="container-fluid">
        <div className="card">
          <div className="container-fluid" style={{ marginTop: 20 }}>
            <AdicionarMes />
            <br />
            <Meses />
            <Switch>
              <Route path="/movimentacoes/:data"  component={Movimentacoes} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home