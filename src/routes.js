import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import SingIn from "./pages/SignIn";
import Main from "./pages/Main";
import Financeiro from "./pages/Financeiro";
import Produto from "./components/CadProduto";
import PedidoParaEntrega from "./pages/PedidoParaEntrega";
import Categoria from "./components/CadCategoria";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: `/signin`, state: { from: props.location } }}
        />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/signin" component={SingIn} />

      <PrivateRoute path="/" exact component={Main} />
      <PrivateRoute path="/financeiro" component={Financeiro} />
      <PrivateRoute exact path="/produto" component={Produto} />
      <PrivateRoute path="/produto/edit/:id" component={Produto} />
      <PrivateRoute path="/pedidosparaentrega" component={PedidoParaEntrega} />
      <PrivateRoute exact path="/categoria" component={Categoria} />
      <PrivateRoute path="/categoria/edit/:id" component={Categoria} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
