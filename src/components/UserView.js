import React from "react";

import CorporativeEmail from "../mail/ListMail";
//Export Firebase instance for use in other components
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
import NavHeader from "./NavHeader";
const auth = getAuth(firebaseApp);

export default function UserView({ username }) {
  return (
    <div>
      <NavHeader username={username} />
      <div className="flex justify-end mr-8">
        <button
          onClick={() => signOut(auth)}
          className="btn btn-danger bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign Out
        </button>
      </div>
      <CorporativeEmail
        syleBtn={{
          display: "none",
        }}
      />
    </div>
  );
}
