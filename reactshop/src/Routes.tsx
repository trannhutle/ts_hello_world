import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AdminPage from "./AdminPage";
import ProductsPage from "./ProductsPage";
import ProductPage from "./ProductPage";
import NotFoundPage from "./NotFoundPage";
import Header from "./Header";

const Routes: React.SFC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/products" component={ProductsPage}></Route>
        <Route
          exact={true}
          path="/products/:id"
          component={ProductPage}
        ></Route>
        <Route path="/admin" component={AdminPage}></Route>
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};
export default Routes;
