import React, {Suspense} from 'react';
import './App.scss';
import Layout from '../layout';
import { Skeleton } from "antd"
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import NotFount from '@/views/error/ErrorPage'
import Login from '@/views/Login/login'
const Home = React.lazy(
  () => import(/* webpackChunkName: "Home" */ '@/views/Home')
);
const About = React.lazy(
  () => import(/* webpackChunkName: "About" */ '@/views/About')
);
const WithSkeleton = <Skeleton active={true} />

const App: React.FC= () => {
  return (
    <Router>
      <Switch>
        <Route path="/404" component={NotFount}></Route>
        <Route path="/login" component={Login}></Route>
        <Route
          path="/"
          render={() => (
            <Layout>
              <Suspense fallback={WithSkeleton}>
              <Switch>
                <Route path="/" exact>
                  <Redirect to="/home" />
                </Route>
                <Route path="/home" component={Home} />
                <Route path="/about" component={About} />
              </Switch>
              </Suspense>
            </Layout>
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
