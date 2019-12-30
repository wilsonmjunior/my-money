import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom'

import App from './App'

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'))
