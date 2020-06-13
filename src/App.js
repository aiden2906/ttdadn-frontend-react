import React from 'react';
import routes from './configs/routes';
import Loadable from 'react-loadable';
import './css/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import MyLoadingComponent from './components/myLoadingComponent';
import SideNav from './components/sidenav';
import TopNav from './components/topnav';
import Footer from './components/footer';
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
            <Component {...props}></Component>
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
          {routes
            .filter((route) => route.isProtected === false)
            .map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  component={Loadable({
                    loader: () => import(`./pages${route.path}`),
                    loading: MyLoadingComponent,
                  })}
                ></Route>
              );
            })}
          <div>
            <TopNav />
            <div id="layoutSidenav">
              <Route component={SideNav}></Route>
              <div id="layoutSidenav_content">
                {routes
                  .filter((route) => route.isProtected === true)
                  .map((route, index) => {
                    return (
                      <this.protectedRoute
                        exact
                        key={index}
                        path={route.path}
                        component={Loadable({
                          loader: () => import(`./pages${route.path}`),
                          loading: MyLoadingComponent,
                        })}
                        routesMenu={routes}
                      ></this.protectedRoute>
                    );
                  })}
                <Footer />
              </div>
            </div>
          </div>
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
