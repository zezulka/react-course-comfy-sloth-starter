import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  About,
  AuthWrapper,
  Cart,
  Checkout,
  Error,
  Home,
  PrivateRoute,
  Products,
  SingleProduct,
} from "./pages";

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <PrivateRoute path="/checkout">
            <Checkout />
          </PrivateRoute>
          <Route path="/products">
            <Products />
          </Route>
          <Route path="/product/:id" children={<SingleProduct />} />
          <Route>
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
