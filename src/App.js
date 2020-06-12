import React from 'react';
import routes from './configs/routes';
import Menu from './components/menu';
import Loadable from 'react-loadable';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MyLoadingComponent from './components/myLoadingComponent';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

class App extends React.Component {
  protectedRoute({ component: Component, routesMenu, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem('token') ? (
            <Menu routes={routesMenu} {...props}>
              <Component {...props} />
            </Menu>
          ) : (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
        }
      ></Route>
    );
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"></Redirect>
          </Route>
          <Route
            path="/login"
            component={Loadable({
              loader: () => import(`./pages/login`),
              loading: MyLoadingComponent,
            })}
          ></Route>
          {routes
            .filter((route) => route.isProtected === true)
            .map((route, index) => {
              const token = localStorage.getItem('token');
              if (token) {
                return (
                  <Route
                    exact
                    path={route.path}
                    component={Loadable({
                      loader: () => import(`./pages${route.path}`),
                      loading: MyLoadingComponent,
                    })}
                  ></Route>
                );
              }
              return <Redirect to={{ pathname: '/login' }}></Redirect>;
            })}
          <Route
            path="*"
            component={Loadable({
              loader: () => import('./pages/nomatch'),
              loading: MyLoadingComponent,
            })}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
