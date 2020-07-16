import React from 'react';
import routes from './configs/routes';
import Loadable from 'react-loadable';
import MyLoadingComponent from './components/myLoadingComponent';
import SideNav from './components/sidenav';
import TopNav from './components/topnav';
import Footer from './components/footer';
import socketIOClient from 'socket.io-client';
import * as env from './configs/environment';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './css/styles.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';

class App extends React.Component {
  createNotification(type, content) {
    console.log(type);
    switch (type) {
      case 'info':
        return NotificationManager.info(content);
      case 'success':
        return NotificationManager.success(content, 'Title here');
      case 'warning':
        return NotificationManager.warning(content, 'Close after 10000ms', 10000);
      case 'error':
        return NotificationManager.error(content, 'Click me!', 5000, () => {
          alert('callback');
        });
    }
  }

  componentWillMount() {
    const socket = socketIOClient(env.ENDPOINT);
    socket.on(env.SOCKET_NOTIFICATION, (data) => {
      const { device_id, content, type } = data;
      this.createNotification(type, `${device_id} : ${content}`);
    });
  }

  protectedRoute({ component: Component, routesMenu, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          localStorage.getItem('token') ? (
            <Component {...props}></Component>
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
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
                <NotificationContainer />
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
