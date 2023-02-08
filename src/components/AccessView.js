import ListAccess from "./ListAccess";
import "../App.css";
import WriteAccess from "../components/WriteAccesos";

import React from "react";
import BaseLayout from "../Layout/BaseLayout";

function AccessView({username}) {
  return (
    <BaseLayout username={username}>
      <div className="container mx-auto">
        <div>
          <WriteAccess />
        </div>
        <div>
          <ListAccess />
        </div>
      </div>
    </BaseLayout>
  );
}

export default AccessView;
