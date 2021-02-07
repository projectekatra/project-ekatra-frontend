import React from "react";
import ReactGA from 'react-ga';
import Homecontent from "./components/home/Home";
import Contribute from "./components/contribute/Contribute";
import PostPage from "./components/post/PostPage";
import Navigator from "./components/Navigator";
import Cookies from "js-cookie";
import Login from "./components/login/index.jsx";
import Profile from "./components/profile/index";
import Temp from "./components/temp/index";
import ContentMain from "./components/content/index.jsx"
import Contributor from "./components/contributor/index.jsx"
import { createBrowserHistory } from 'history';
import NoMatch from "./components/NoMatch";
import {baseUrl} from "./components/shared/baseUrl";

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


export default function App() {
  const history = createBrowserHistory();
  history.listen(location => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

if(Cookies.get("data")===undefined && Cookies.get("sessions")!==undefined)
{
fetch(baseUrl+"api/userData/"+Cookies.getJSON("sessions").id)
.then((response) => response.json())
.then((data) => {
	Cookies.set("data",{name: data.name,email: data.email, upvotes: data.upvoted, visited: data.visited})
  })
 .catch(err => {
	 console.log(err)
	})	
}



  return (
<Router basename='/' history = {history}>
    <div>
      <Switch>
      <Route exact path="/">
      <Navigator />
      <Homecontent />
      </Route>
      <Route path="/post/:Id">
      <Navigator background="white" />
      <PostPage />
      </Route>
      <Route path = "/contents/:Id?/:Search?">
      <Navigator background = "white" />
      <ContentMain />
      </Route>
      <Route path = "/login/:Linked?">
      {Cookies.get('sessions')!==undefined ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path = "/profile">
      <Navigator background= "#ffdcb8"/>
      <Profile />
      </Route>
      <Route path="/contribute">
      <Navigator background="#50a3a2" />
      <Contribute /></Route>
      <Route path="/temp">
      <Temp /></Route>
      <Route path="/contributors">
      <Navigator background="#F7A278" />
      <Contributor /></Route>
<Route path="*">
            <NoMatch />
          </Route>
      </Switch>
    </div>
</Router>
  );
}
