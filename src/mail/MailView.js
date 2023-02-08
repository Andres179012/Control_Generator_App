import AccessView from "./ListMail";
import "../App.css";
import WriteAccess from "./WriteMail";
import React from "react";
import BaseLayout from "../Layout/BaseLayout";

function MailView({username}) {
  return (
    <BaseLayout username={username}>
      <div className="container mx-auto">
        <div></div>
        <div>
          <WriteAccess />
        </div>
        <div>
          <AccessView />
        </div>
        <div></div>
      </div>
    </BaseLayout>
  );
}

export default MailView;
