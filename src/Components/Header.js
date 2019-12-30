/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../Hooks/useAuth';

const Header = ({ history }) => {
  const logout = () => {
    localStorage.removeItem('token')
    history.replace('/login')
  }

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyMoney</Link>
        {
          isAuthenticated() && (
            <div className="form-inline">
              <button className="btn btn-outline-default my-2 my-sm-0" onClick={logout}>Sair</button>
            </div>
          )
        }
      </div>
    </nav>
  );
}

export default Header;
