import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import Matter from "./components/matter/Matter";
import Contact from "./components/Contact/contact";
import Footer from "./components/Footer";
import CategoryPosts from "./components/Categoria/CategoryPosts";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
        <Route path="/write">{user ? <Write /> : <Register />}</Route>
        <Route path="/settings">{user ? <Settings /> : <Register />}</Route>
        <Route path="/post/:postId">
          <Single />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/matter">
          <Matter />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/category/:categoryId">
          <CategoryPosts />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
