import React from "react";
import Image from "./Image";
import { withAuthenticator } from "aws-amplify-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { Auth } from "aws-amplify";

import "./App.css";
import { Button } from "element-react";
import Navbar from "./components/NavBar";

function App() {
  async function handleSignOut() {
    try {
      await Auth.signOut();
    } catch (err) {
      console.log("error signing out user", err);
    }
  }
  return (
    <Router>
      <>
        <Navbar handleSignOut={handleSignOut} />

        <div className="app-container">
          <Route exact path="/" component={HomePage} />
          <Route path="/addImage" component={() => <Image />} />
        </div>
      </>
    </Router>
  );
}

export default withAuthenticator(App);
