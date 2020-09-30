import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGOUT } from '../constants/actionTypes';

const Header = (props) => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.common.currentUser);

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          {props.appName.toLowerCase()}
        </Link>

        {currentUser && (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <button className="btn btn-outline" onClick={logout}>
                Sign out
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Header;
