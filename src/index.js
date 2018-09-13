import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './index.scss';
import MyApp from './business/Main/'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((<MyApp />), document.getElementById('root'));
registerServiceWorker();
