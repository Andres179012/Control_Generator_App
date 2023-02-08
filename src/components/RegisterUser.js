import React from "react";
import "../App.css";
import firebaseApp from "../firebase/credenciales";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import NavHeader from "./NavHeader";
import  "sweetalert2-react-content";
import Swal from "sweetalert2";
import BaseLayout from "../Layout/BaseLayout";
const auth = getAuth(firebaseApp);

function RegisterUser({username}) {
  const firestore = getFirestore(firebaseApp);

  async function registrarUsuario(email, password, username,rol) {
    //crear usuario
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((usuarioFirebase) => {
      return usuarioFirebase;
    });
    Swal.fire({
      title: "Registro exitoso",
      text: "Usuario registrado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`);
    setDoc(docuRef, { correo: email, rol: rol, password: password, username:username });

    //Clear Inputs
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  }

  function submitHandler(e) {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;
    const username = e.target.elements.username.value;

      // registrar
      registrarUsuario(email, password,username,rol);
    
  }

  return (
    <BaseLayout username={username}>
    
    <div className="form-body without-side">
      <div className="row">
            <div className="form-holder h-[91vh]">
                <div className="form-content">
                    <div className="form-items">
                        <h3 className="form-title-center">Register New User</h3>
                        <form onSubmit={submitHandler}>
                            <input className="form-control" type="text" autoComplete="off" name="username" placeholder="username" id="username" required/>
                            <input className="form-control" type="text" autoComplete="off" name="email" placeholder="E-mail Address" id="email" required/>
                            <input className="form-control" placeholder="Password" id="password"/>
                            <select name="rol" id="rol" data-dropdown-toggle="dropdown" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                                <option value="admin">Administrador</option>
                                <option value="user">Usuario</option>
                            </select>
                            <div className="form-button">
                                <button onClick={() => registrarUsuario()} 
                                className="btn btn-primary btn-block"
                                 type="submit">
                                  Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </BaseLayout>
  );
}

export default RegisterUser;