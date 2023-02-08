import React, { useState } from "react";
import "./styles/global.css";
import Login from "./Screen/Login";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AccessView from "./components/AccessView";
import LiveChat from "./contents/GeneratorChat";
import VisorCounter from "./contents/GeneratorVisor";
import Signature from "./contents/SignatureGenerator";
import QR from "./contents/GeneratorQR";

import MailViews from "./mail/MailView";
import Generador from "./contents/GeneratorChat";

import firebaseApp from "./firebase/credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserView from "./components/UserView";
import Dashboard from "./components/Dashboard";
import RegisterUser from "./components/RegisterUser";
import HomePage from "./components/HomePage";
import TodoList from "./components/TodoList";
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function App() {
  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc(firestore, `usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);
    const infoFinal = docuCifrada.data().rol;
    const user = docuCifrada.data().username;
    return [user, infoFinal];


  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol[1],
        username: rol[0],
      };
      setUser(userData);
      //GUARDAR EN LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(userData));
    });
  }



  onAuthStateChanged(auth, (usuarioFirebase) => {
    
    if (usuarioFirebase) {
      //funcion final

      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  });

  // motrar login si no hay usuario solo una vez



  if (user === 
    null

    
    ) {
    return <Login />;
  }
 

  return (
    <div className="dark:bg-black">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            render={() => {
              return user ? <Navigate to="/" replace={true} /> : <Login />;
            }}
          />
          <Route
            path="/"
            element={user.rol === "admin" ? 
            <HomePage 
            username={user.username}
            /> : <UserView username={user.username}/>}
          />
          <Route
            path="/accesos"
            element={
              user.rol === "admin" ? (
                <AccessView username={user.username}/>
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              user.rol === "admin" ? (
                <Dashboard username={user.username}/>
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/register"
            element={
              user.rol === "admin" ? (
                <RegisterUser username={user.username}/>
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/mail"
            element={
              user.rol === "admin" ? (
                <MailViews username={user.username}/>
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/generator"
            element={
              user.rol === "admin" ? (
                <Signature username={user.username}/>
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/chat"
            element={
              user.rol === "admin" ? (
                <LiveChat username={user.username}/>
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/visor"
            element={
              user.rol === "admin" ? (
                <VisorCounter username={user.username}/>
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/signature"
            element={
              user.rol === "admin" ? (
                <Signature username={user.username}/>
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
          />
          <Route
            path="/qr"
            element={
              user.rol === "admin" ? <QR username={user.username}/> : <Navigate to="/" replace={true} />
            }
          />
           <Route
            path="/todolist"
            element={
              user.rol === "admin" ? < TodoList username={user.username}/> : <Navigate to="/" replace={true} />
            }
          />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
