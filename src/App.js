import React, {useState, useEffect} from 'react';
import Splash from "./components/splash/Splash"
import Board from "./components/board/Board"
import Theme from "./Theme"
import ProtectedRoute from "./utils/ProtectedRoute"
import PrivateRoute from "./utils/PrivateRoute"
import { BrowserRouter, Switch } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import {loadCurrentUser} from "./components/store/actions/user"
import TopBar from "./components/topBar/TopBar"

function App({ needLogin }) {
  const[load, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadCurrentUser());
    setLoaded(true);
  },[])

  if (!load) return null

  return (
    <>
      <Theme>
        <TopBar/>
        <BrowserRouter>
          <ProtectedRoute exact={true} path="/" needLogin={needLogin} component={Splash} />
          <Switch>
            <PrivateRoute exact={true} path="/board" needLogin={needLogin} component={Board} />
          </Switch>
        </BrowserRouter>
      </Theme>
    </>
  );
}

const AppContainer = () => {
  const needLogin = !(useSelector(state=>state.user.current_user))
  return <App needLogin={needLogin}></App>
}

export default AppContainer;
