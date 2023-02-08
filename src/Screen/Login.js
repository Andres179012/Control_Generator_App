import React, { useState } from "react";
import "../styles/iofrm-style.css";
import "../styles/iofrm-theme27.css";
import firebaseApp from "../firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
const auth = getAuth(firebaseApp);

function Login() {
  const firestore = getFirestore(firebaseApp);
  const [isRegistrando, setIsRegistrando] = useState(false);

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });

    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol });
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;

    if (isRegistrando) {
      // registrar
      registrarUsuario(email, password, rol);
    } else {
      // login
      signInWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <div>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
    flex items-center justify-center"
        >
          <div className="w-full h-100">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FLogoAndresDev.png?alt=media&token=98153248-dadb-4a52-817b-f20138a6794d"
              alt="Logo"
              className="w-[30%]"
            />
            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Log In To Your Account
            </h1>

            <form onSubmit={submitHandler} className="mt-6">
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                type="text"
                name="username"
                placeholder="E-mail Address"
                id="email"
                required
              />
              <input
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                type="password"
                placeholder="Password"
                id="password"
                required
              />
              <div className="form-button">
                <button
                  id="submit"
                  type="submit"
                  className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
            px-4 py-3 mt-6"
                  value={isRegistrando ? "Register" : "LogIn"}
                >
                  LogIn
                </button>
                <button
                  onClick={() => setIsRegistrando(!isRegistrando)}
                  type="submit"
                  className="ibtn ibtn-full registrando"
                >
                  {isRegistrando ? "Ya tengo una cuenta" : "Quiero registrarme"}
                </button>
              </div>
              <select id="rol" className="form-control registrando" type="text">
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </form>
            <hr className="my-6 border-gray-300 w-full" />
            <select id="rol" className="form-control registrando" type="text">
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
          </div>
        </div>
        <div className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FBgLogin_Mesa%20de%20trabajo%201.png?alt=media&token=2d0e70ce-20e5-4d37-926e-4d1f31f5c44a"
            alt="Backgroun Login"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}

export default Login;
