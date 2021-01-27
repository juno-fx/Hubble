import React from 'react';
import ReactDOM from 'react-dom';

import Router from './routing'

import './styles/bootstrap.min.css';
import './styles/base.css';
import './styles/app.css';

ReactDOM.render(
    <React.StrictMode>
        <Router/>
    </React.StrictMode>,
    document.getElementById('root')
);
