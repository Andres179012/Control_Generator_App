import React from "react";
import {
  FaChartLine,
  FaRocket,
  FaReact,
  FaWordpress,
} from "react-icons/fa";
import { BiArrowFromLeft, BiEnvelope, BiChat } from "react-icons/bi";
import "../App.css";

//Export Firebase instance for use in other components
import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

const auth = getAuth(firebaseApp);

function HomeView() {
  return (
    <>
      <div className="flex flex-wrap w-full dark:bg-black content-global-card-home justify-center h-[90vh]">
        <div className="flex  flex-wrap w-full justify-center self-center items-center h-full">
          <div className="flex md:flex-col flex-row px-1 md:self-center">
            <Link to="/dashboard">
              <div className="md:w-48 md:h-44 w-32 h-32 m-1 rounded-lg shadow-md text-center flex justify-center self-center items-center flex-col px-6 py-8 ring-1">
                <FaChartLine className="text-4xl text-blue-500" />
                <span className="text-sm dark:text-white">DashBoard</span>
              </div>
            </Link>
            <Link to="/generator">
              <div className="md:w-48 md:h-44 w-32 h-32 m-1 rounded-lg shadow-md text-center flex justify-center self-center items-center flex-col px-6 py-8 ring-1">
                <BiChat className="text-4xl text-blue-500" />
                <span className="text-sm dark:text-white">Generator</span>
              </div>
            </Link>
          </div>
          <div className="flex flex-col px- m-0.51">
            <Link to="/accesos">
              <div className="md:w-48 md:h-44 w-32 h-32 m-1 rounded-lg shadow-md text-center flex justify-center self-center items-center flex-col px-6 py-8 ring-1">
                <FaRocket className="text-4xl text-blue-500" />
                <span className="text-sm dark:text-white">Accesos</span>
              </div>
            </Link>
            <div className="card-responsive-col-hidde w-48 h-48 m-1 rounded-lg shadow-md text-center flex justify-center self-center items-center flex-col px-6 py-8 ring-1">
                <FaReact className="text-[100px] text-blue-500 nbx bx-spi" />
            </div>
            <div className="md:w-48 md:h-44 w-32 h-32 m-1 rounded-lg shadow-md text-center flex justify-center self-center items-center flex-col px-6 py-8 ring-1 cursor-pointer"
            onClick={() => signOut(auth)}
            >
              <BiArrowFromLeft
                className="text-4xl text-blue-500"
                
              />  
              <span className="text-sm dark:text-white">LogOut</span>
            </div>
          </div>
          <div className="flex flex-col px- m-0.51 self-center">
            <Link to="/mail">
              <div className="md:w-48 md:h-44 w-32 h-32 m-1 rounded-lg shadow-md text-center flex justify-center self-center items-center flex-col px-6 py-8 ring-1">
                <BiEnvelope className="text-4xl text-blue-500" />
                <span className="text-sm dark:text-white">
                  Correos Corporativos
                </span>
              </div>
            </Link>
            <Link to="/register">
              <div className="md:w-48 md:h-44 w-32 h-32 m-1 rounded-lg shadow-md text-center flex justify-center self-center items-center flex-col px-6 py-8 ring-1">
                <FaWordpress className="text-4xl text-blue-500" />
                <span className="text-sm dark:text-white">Manage User</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeView;
