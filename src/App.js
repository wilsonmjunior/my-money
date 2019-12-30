
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { isAuthenticated } from './Hooks/useAuth'

import Login from './Pages/Login'
import Home from './Pages/Home'
import Movimentacoes from './Pages/Movimentacoes'
import Header from './Components/Header'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <>
          <Header history={props.history} />
          <Component {...props} />
        </>
      ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
    }
  />
);

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/movimentacoes/:data" exact component={Movimentacoes} />
      </Switch>
    </>
  )
}

export default App
