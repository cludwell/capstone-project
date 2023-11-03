import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";
import Header from "./components/Header.jsx";
import Landing from "./components/Landing";
import AlbumDetails from "./components/AlbumDetails";
import BandDetails from "./components/BandDetails";
import UserDetails from "./components/UserDetails";
import BandFormPOST from "./components/BandFormPOST";
import BandFormPut from "./components/BandFormPut";
import AlbumFormPost from "./components/AlbumFormPost";
import AlbumFormPut from "./components/AlbumFormPut";
import AboutPage from "./components/AboutPage";

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
          <Route path='/albums/:albumId/edit' exact={true} component={AlbumFormPut} />
          <Route path='/albums/:albumId' exact={true} component={AlbumDetails} />
          <Route path='/bands/new' exact={true} component={BandFormPOST} />
          <Route path='/bands/:bandId' exact={true} component={BandDetails} />
          <Route path='/users/:userId' exact={true} component={UserDetails} />
          <Route path='/bands/edit/:bandId' exact={true} component={BandFormPut} />
          <Route path='/bands/new' exact={true} component={BandFormPOST} />
          <Route path='/bands/:bandId/newAlbum' exact={true} component={AlbumFormPost} />
          <Route path='/about' exact={true} component={AboutPage} />
        </Switch>
    </>
  );
}

export default App;
