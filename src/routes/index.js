import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Layout from '../containers/Layout';
// // import CatalogRoute from './Catalog';


const HelloWorld = () => (
  <p>Hello world!</p>
);


// export default {
//   path: '/',
//   component: Layout,
//   indexRoute: HelloWorld, //CatalogRoute(store),
// };

// import App from './App'
// import About from './About'
// import Repos from './Repos'
// import Repo from './Repo'
// import Home from './Home'

module.exports = (
  <Route path="/" component={Layout}>
    <IndexRoute component={HelloWorld}/>
  </Route>
)
