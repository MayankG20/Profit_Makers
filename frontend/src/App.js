import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Vendor from './components/vendor/vendorInfo';
import Order from './components/student/order';
import Place from './components/student/place-order';
import ViewOrder from './components/student/view-order';
import Create from './components/vendor/create-product';
import View from './components/vendor/view-product';
import Ready from './components/vendor/rtodis-product';
import Dispatched from './components/vendor/dis-product';

function App() {
  return (
    // <Provider store={store}>
      <Router>
       <div className="container">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component = {Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/vendor/:id" component={Vendor}/>
          <Route exact path="/student/:id" component={Order}/>
          <Route exact path="/student/:id/place" component={Place}/>
          <Route exact path="/student/:id/orders" component={ViewOrder}/>
          <Route exact path="/vendor/:id/create" component={Create}/>
          <Route exact path="/vendor/:id/view" component={View}/>
          <Route exact path="/vendor/:id/ready" component={Ready}/>
          <Route exact path="/vendor/:id/dispatched" component={Dispatched}/>
        </div>
      </Router>
    // </Provider>
  );
}

export default App;
