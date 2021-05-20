import React from "react";
import Homecontent from "./components/home/Home";
import Contribute from "./components/contribute/Contribute";
import PostPage from "./components/post/PostPage";
import Navigator from "./components/Navigator";
import Activate from "./components/login/Activate";
import Reset from "./components/login/Reset";
import Cookies from "js-cookie";
import Login from "./components/login/index.jsx";
import Profile from "./components/profile/index";
import RoadMap from "./components/roadmap/index";
import ContentMain from "./components/content/index.jsx"
import Contributor from "./components/contributor/index.jsx"
import { createBrowserHistory } from 'history';
import NoMatch from "./components/NoMatch";
import {baseUrl} from "./components/shared/baseUrl";
import About from "./components/About";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


export default function App() {
  const history = createBrowserHistory();
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
      <Navigator/>
      <PostPage />
      </Route>
      <Route path = "/contents/:Id?/:Search?">
      <Navigator/>
      <ContentMain />
      </Route>
      <Route path = "/login/:Linked?">
      <Navigator/>
      {Cookies.get('sessions')!==undefined ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path = "/activate/:Hash">
      <Activate />
      </Route>
      <Route path = "/reset/:Hash">
      <Reset />
      </Route>
      <Route path = "/profile">
      <Navigator/>
      <Profile />
      </Route>
      <Route path="/contribute">
      <Navigator/>
      <Contribute /></Route>
      <Route path="/contributors">
      <Navigator/>
      <Contributor /></Route>
      <Route path = "/roadmap">
      <RoadMap />
      </Route>
      <Route path = "/about">
      <Navigator/>
      <About />
      </Route>
      <Route path="*">
            <NoMatch />
          </Route>
      </Switch>
    </div>
</Router>
  );
}
