import React from 'react';
import ReactDOM from 'react-dom';
// import { fromJS } from 'immutable';

import App from './components/App';
import routes from './routes';

// import createStore from 'redux/store/createStore';


// const initialState = Object.assign({}, window.__INITIAL_STATE__);
// Object.keys(initialState).forEach((key) => { initialState[key] = fromJS(initialState[key]); });

// const store = createStore(initialState);
const MOUNT_NODE = document.getElementById('root');

// let render = () => {
//   const App = require('./components/App').default;
//   const routes = require('./routes/index').default(store);

//   ReactDOM.render(
//     <App store={store} routes={routes} />,
//     MOUNT_NODE,
//   );
// };

// if(!__TEST__) render();


ReactDOM.render( <App routes={routes} />, MOUNT_NODE);
