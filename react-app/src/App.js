import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
// import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Landing from "./components/Landing";
import AlbumDetails from "./components/AlbumDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Header isLoaded={isLoaded} />
        <Switch>
          <Route path={`/`} exact={true} component={Landing}/>
          <Route path='/albums/:albumId' exact={true} component={AlbumDetails
          } />
          <Route path="/login" component={LoginFormPage} />
          <Route path="/signup" component={SignupFormPage}/>
        </Switch>
    </>
  );
}

export default App;
