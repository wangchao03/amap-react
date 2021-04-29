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
const Home = React.lazy(
  () => import(/* webpackChunkName: "Dashboard" */ '@/views/Home')
);
const About = React.lazy(
  () => import(/* webpackChunkName: "Dashboard" */ '@/views/About')
);
const WithSkeleton = <Skeleton active={true} />

const App: React.FC= () => {
  return (
    <Router>
      <Switch>
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
