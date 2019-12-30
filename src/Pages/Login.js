import React, { useEffect, useState } from 'react'
import { usePost, isAuthenticated } from '../Hooks/useAuth'
import { Redirect } from 'react-router-dom'

const Login = () => {
  const [postData, logar] = usePost('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBcJebxFYbBFcoZzM6NwL_BO3iUfYEfABw')
  const [logado, setLogado] = useState(false)
  const [dados, setDados] = useState({})
  
  // reativo
  useEffect(() => {
    if (Object.keys(postData.data).length > 0) {
      localStorage.setItem('token', postData.data.idToken)
      setLogado(true)
    }
  }, [postData])

  const login = async () => {
    await logar({
      email: dados.email,
      password: dados.password,
      returnSecureToken: true
    })
  }
  
  if (logado || isAuthenticated()) {
    return <Redirect to="/" />
  }

  const onChange = (field) => e => {
    setDados({
      ...dados,
      [field]: e.target.value,
    })
  }

  return ( 
    <div className="d-flex justify-content-center">
      <div className="card" style={{ padding: 10 }}>
        <div className="row">
          <div className="col-sm-12">
            <h5>Login</h5>
          </div>
          <div className="col-sm-12">
            <label>Email</label>
            <input className="form-control" type="text" onChange={onChange('email')} />
          </div>
          <div className="col-sm-12">
            <label>Senha</label>
            <input className="form-control" type="password" onChange={onChange('password')} />
          </div>
          <div className="col-sm-12" style={{ marginTop: 30 }}>
            <button onClick={login} className="btn btn-secondary">Logar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login