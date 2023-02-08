import React from "react";

import UserView from "../components/UserView";
import "../styles/global.css"
import HomePage from "../components/HomePage";

function Home({ user }) {
  return (
    <div>
      {user.rol === "admin" ? <HomePage /> : <UserView />}
    </div>
  );
}

export default Home;