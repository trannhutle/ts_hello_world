import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import NotFoundPage from "./NotFoundPage";
import Header from "./Header";
import LoginPage from "./LoginPage";

import { Suspense } from "react";
const AdminPage = React.lazy(() => import("./AdminPage"));

const Routes: React.SFC = () => {
  const [loggedIn, setLoggedIn] = React.useState(true);

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact={true} path="/products" component={ProductsPage}></Route>
        <Route path="/products/:id" component={ProductPage}></Route>
        <Route path="/admin">
          {loggedIn ? (
            <Suspense
              fallback={<div className="page-container">Loading...</div>}
            >
              <AdminPage />
            </Suspense>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};
export default Routes;
