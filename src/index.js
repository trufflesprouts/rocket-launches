import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './containers/App';
import SingleLaunch from './components/SingleLaunch';

import './index.css';

const Index = () => {
  return (
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/launch/:agency/:id" component={SingleLaunch} />
      </div>
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById('root'));
