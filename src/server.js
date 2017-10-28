import path from 'path';

import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from 'react-router'

import Html from './components/Html';
import App from './components/App';
// import createStore from './redux/store/createStore';
import routes from './routes';
import { match, RouterContext } from 'react-router'

// const project = require('../project.config')

const port = 3333;
// const basePath = './';
const basePath = process.cwd();
const outDir = 'static';


// http://redux.js.org/docs/recipes/ServerRendering.html
function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(counterApp)

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const preloadedState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, preloadedState))
}

async function stub() {
}

console.log('Starting server...');

const app = express();
// app.use(express.static(path.resolve(project.basePath, project.outDir)));
app.use(express.static(path.resolve(basePath, outDir)));

app.use(function(req, res, next) {
  var router = Router.create({location: req.url, routes: routes});
  router.run(function(Handler, state) {
    console.log(Handler);
    // var html = React.renderToString(<Handler/>);
    // return res.render('react_page', {html: html});
    const data = {
      title: 'Каталог',
      description: 'Пример вёрстки каталога',
      // style: '/styles/main.css',
      scripts: [
        '/client.bundle.js',
      ],
    };
    // <App store={store} routes={routes} />,
    data.children = ReactDOM.renderToString(<RouterContext {...props}/>);
    data.state = {}; // store.getState();

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.send(html);
    next();
  });
});

// app.get('*', (req, res) => {
//   console.log("get '*'");
//   match({ routes: routes, location: req.url }, (err, redirect, props) => {
//     // in here we can make some decisions all at once
//     if (err) {
//       // there was an error somewhere during route matching
//       res.status(500).send(err.message)
//     } else if (redirect) {
//       // we haven't talked about `onEnter` hooks on routes, but before a
//       // route is entered, it can redirect. Here we handle on the server.
//       res.redirect(redirect.pathname + redirect.search)
//     } else if (props) {
//       const data = {
//         title: 'Каталог',
//         description: 'Пример вёрстки каталога',
//         // style: '/styles/main.css',
//         scripts: [
//           '/client.bundle.js',
//         ],
//       };
//       // <App store={store} routes={routes} />,
//       data.children = ReactDOM.renderToString(<RouterContext {...props}/>);
//       data.state = {}; // store.getState();

//       const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
//       res.send(renderPage(appHtml))
//     } else {
//       // no errors, no redirect, we just didn't match anything
//       res.status(404).send('Not Found')
//     }
//   })
// });

// // app.get('/catalog', async (req, res, next) => {
// app.get('/', (req, res, next) => {
//   try {
//     // const store = createStore({});
//     // await stub();
//     // store.dispatch(setBuildings(await fetchBuildings()));

//     // const route = await UniversalRouter.resolve(routes, {
//     //   ...context,
//     //   path: req.path,
//     //   query: req.query,
//     // });

//     const data = {
//       title: 'Каталог',
//       description: 'Пример вёрстки каталога',
//     //   style: '/styles/main.css',
//       scripts: [
//         '/client.bundle.js',
//       ],
//     };
//     // <App store={store} routes={routes} />,
//     data.children = ReactDOM.renderToString(
//       <App routes={routes.indexRoute} />,
//     );
//     data.state = {}; // store.getState();

//     const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
//     console.log(html);
//     res.status(/* route.status || */ 200);
//     res.send(`<!doctype html>${ html }`);
//   } catch (err) {
//     console.log(err);
//     next(err);
//   }
//   // res.send('hello world');
// });

app.listen(port, () => {
  console.log('basePath:', basePath);
  console.log('outDir:', outDir);
  console.log('Server is running at http://localhost:' + port);
});


module.exports = app;
