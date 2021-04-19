import React from 'react';

import { Route, Redirect } from "react-router-dom";


const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        rest.needLogin !== true ? <Redirect to="/board" /> : <Component {...props} />
      }
    />
  );
  

  export default ProtectedRoute