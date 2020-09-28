import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SET_CURRENT_USER } from '../../constants/actionTypes';

export const Register = () => {
  const [username, setUsername] = useState('');

  const dispatch = useDispatch();

  const register = (event) => {
    event.preventDefault();
    dispatch({ type: SET_CURRENT_USER, payload: username });
  };

  return (
    <div className="register">
      <form onSubmit={register}>
        <h3 className="mb-4">Welcome to the Sharing Hub</h3>
        <fieldset className="form-group">
          <input
            className="form-control form-control-lg"
            type="text"
            placeholder="Enter a username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </fieldset>
        <button
          className="btn btn-lg pull-xs-right btn-primary w-100"
          disabled={username.length < 3}
        >
          Register
        </button>
      </form>
    </div>
  );
};
