import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders header without crashing', () => {
  ReactDOM.render(
    <Router>
      <Header appName="App" />
    </Router>,
    document.createElement('div')
  );
});
