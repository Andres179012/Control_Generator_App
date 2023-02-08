import React, { useState, useEffect } from "react";
import {
  collection,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
} from "firebase/firestore";
import  { db } from "../firebase/credenciales";
import { deleteDoc } from "firebase/firestore";
import "../index.css";
import Swal from "sweetalert2";
import {
  TrashIcon,
  DocumentDuplicateIcon,
  PencilAltIcon,
  ArchiveIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import DataTable from "react-data-table-component";
import "sweetalert2-react-content";

function GeneradorLiveChat() {
  const [livechatcode, setLiveChatCode] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("");
  const [number, setNumber] = useState("");
  const [setId] = useState("");
  const [q] = useState("");
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Si el name ya existe, no se agrega
    try {
      await addDoc(collection(db, "LiveChat"), {
        name: name,
        url: url,
        color: color,
        number: number,
        timestamp: new Date(),
      });
      setName("");
      setUrl("");
      setColor("");
      setNumber("");
    } catch (err) {
      alert(err);
    }
  };

  const handleRead = () => {
    onSnapshot(collection(db, "LiveChat"), (snapshot) => {
      // use spread op to get id and data
      orderBy(
        setLiveChatCode(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
    });
  };

  const handleDelete = async (id) => {
    const Ref = doc(db, "LiveChat", id);
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperarlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      })
        .then((result) => {
          if (result.value) {
            deleteDoc(Ref);
            Swal.fire("Eliminado!", "El acceso ha sido eliminado.", "success");
          }
        })
        .catch(() => {
          Swal.fire("Cancelado", "El acceso no fue eliminado", "error");
        })
        .then(() => {
          handleRead();
        });
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    handleRead();
  }, []);

  const columns = [
    {
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      filterable: true,
    },
    {
      name: "name",
      selector: (row) => row.name,
      sortable: true,
      filterable: true,
    },
    {
      name: "url",
      selector: (row) => row.url,
      sortable: true,
      filterable: true,
    },
    {
      name: "color",
      selector: (row) => row.color,
      sortable: true,
      filterable: true,
    },
    {
      name: "number",
      selector: (row) => row.number,
      sortable: true,
      filterable: true,
    },
    {
      name: "acciones",
      selector: (row) => row.acciones,
      sortable: true,
      filterable: true,
    },
  ];

  function search(rows) {
    return rows.filter((row) => {
      return row.name.toLowerCase().includes(q.toLowerCase());
    });
  }

  const CodeLiveChat = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Live Chat UI</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/4.0.2/bootstrap-material-design.css"
    />
    <script src="https://unpkg.com/boxicons@2.1.2/dist/boxicons.js"></script>
    <link
      href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/boxicons/2.0.1/css/boxicons.min.css" integrity="sha512-QFPgv160B7hqiaf+HdW6HkJZ53DHQOlpraV98UdNAqU7h30lWu/bYwg/rTceL/l5P1U18IcQKkyAmtUX872qHQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <style>
      :root {
        --primary-color: ${color};
      }

      #center-text {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
      #chat-circle {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: var(--primary-color);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        color: white;
        padding: 16px;
        cursor: pointer;
      }

      .btn#my-btn {
        background: white;
        padding-top: 13px;
        padding-bottom: 12px;
        border-radius: 45px;
        padding-right: 40px;
        padding-left: 40px;
        color: var(--primary-color);
      }
      #chat-overlay {
        background: rgba(255, 255, 255, 0.1);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: none;
      }

      .material-icons {
        background: white;
        color: black;
        border-radius: 50%;
      }

      .chat-box {
        display: none;
        background: #efefef;
        position: fixed;
        left: 20px;
        bottom: 20px;
        width: 350px;
        max-width: 85vw;
        max-height: 100vh;
        border-radius: 5px;
        z-index: 999;
      }
      .chat-box-toggle {
        float: right;
        margin-right: 15px;
        cursor: pointer;
      }
      .chat-box-header {
        background: var(--primary-color);
        height: 90px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        color: white;
        text-align: center;
        font-size: 20px;
        padding: 20px 20px 10px 20px;
        display: flex;
        justify-content: center;
        align-self: center;
      }
      .chat-box-body {
        position: relative;
        height: 370px;
        height: auto;
        border: 1px solid #ccc;
        overflow: hidden;
      }
      .chat-box-body:after {
        content: "";
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=");
        opacity: 0.1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        height: 100%;
        position: absolute;
        z-index: -1;
      }
      @media only screen and (max-width: 500px) {
        .chat-logs {
          height: 40vh;
        }
      }
      .content-photo-header {
        width: 20%;
      }

      .content-photo-header img {
        width: 2.8em;
        object-fit: cover;
      }

      .content-photo-header img::before {
        content: "";
        display: block;
        padding-top: 100%;
        background-color: black;
      }

      .content-text-header-replay {
        width: 70%;
        text-align: start;
        padding-left: 10px;
      }

      .content-text-header-replay span {
        font-size: 16px;
        line-height: 1px;
      }

      .content-close-butom {
        width: 10%;
        height: 100%;
        display: flex;
      }

      .content-actions {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: flex-end;
      }

      .icon-chat {
        width: 4em;
        height: 4em;
        background-color: var(--primary-color);
        border-radius: 50%;
      }

      /*Icon Center*/
      .icon-style {
        background: var(--primary-color);
        padding: 0.5em;
        border-radius: 50%;
        color: white;
        margin: 10px 10px 30px 10px;
        font-size: 1.5em;
      }

      .icon-style:hover {
        background: var(--primary-color);
      }

      .photo-chat-user {
        width: 4vw;
        height: 4vw;
        border-radius: 50%;
        background-color: var(--primary-color);
        margin: 10px 10px 30px 10px;
      }

      .content-text-start {
        width: 100%;
        text-align: center;
      }

      .content-chat {
        width: 100%;
        height: 100%;
        padding: 30px 10px 30px 10px;
        display: flex;
        flex-wrap: nowrap;
      }

      .online {
        position: relative;
        top: -8px;
        left: 35px;
        width: 13px;
        height: 13px;
        background-color: #8bc34a;
        border-radius: 13px;
        border: 3px solid #fafafa;
      }

      .content-chat-photo {
        width: 20%;
        height: 100%;
        background-color: #f5f5f5;
        padding: 10px;
        margin: 10px;
        border-radius: 50%;
        display: flex;
        flex-wrap: nowrap;
      }

      .img-company {
        object-fit: cover;
        width: 2.5em;
        height: 2.5em;
      }

      .content-photo-header {
        background: white;
        border-radius: 50%;
        width: 3em;
        height: 3em;
      }

      .img-company-header {
        object-fit: cover;
      }

      .content-message-chat {
        width: 80%;
        height: 100%;
        background-color: #ffffff;
        padding: 10px;
        margin: 10px;
        display: flex;
        flex-wrap: nowrap;
        border-radius: 0 10px 10px 10px;
      }

      .visor-Counter {
        width: 100%;
        display: flex;
        justify-content: center;
        background: white;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
      }

      .stat {
        width: 100%;
        display: flex;
        justify-content: center;
        background: white;
        font-size: 16px;
      }

      .bxs-show {
        color: var(--primary-color);
        padding-left: 4px;
      }
      .whatsapp {
        background: #0ec12f;
        color: white;
      }

      .whatsapp:hover {
        background: #0ec12f;
        color: white;
      }
    </style>
  </head>
  <body>
    <div id="body">
      <div id="chat-circle" className="btn btn-raised">
        <div id="chat-overlay"></div>
        <i className="bx bxs-chat bx-tada" style="font-size: 2em"></i>
      </div>
      <div className="chat-box">
        <div className="chat-box-header">
          <div className="content-photo-header">
            <img
              src="${url}"
              alt=""
              className="img-company-header"
            />
            <div className="online"></div>
          </div>
          <div className="content-text-header-replay">
          <span style="font-size: 16px; font-weight: bold;line-height: 5px;">
          ${name}</span
            ><br />
            <span style="padding-top: 5px; font-size: 12px">
            Typically Replies In Minutes
            </span>
          </div>
          <div className="content-close-butom">
            <span className="chat-box-toggle"
              ><i className="material-icons">close</i></span
            >
          </div>
        </div>
        <div className="chat-box-body">
          <div className="chat-box-overlay" style="z-index: 5">
            <div>
              <div className="content-chat">
                <div className="content-chat-photo">
                  <img
                    src="${url}"
                    alt=""
                    className="img-company"
                  />
                </div>
                <div className="content-message-chat">
                  <p>
                    Hi there <span className="bx bx-tada">👋</span><br />
                    How can we help you?
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-text-start">
            <spam style="text-align: center">Start Chat with:</spam>
          </div>
          <div className="content-actions">
            <a href="https://wa.me/1${number}" target="_blank">
              <div>
              <i className='bx bxl-whatsapp icon-style whatsapp'></i>
              </div></a
            >
          </div>
        </div>
      </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
    <script>
      $(function () {
        $(document).delegate(".chat-btn", "click", function () {
          var value = $(this).attr("chat-value");
          var name = $(this).html();
          $("#chat-input").attr("disabled", false);
          generate_message(name, "self");
        });

        $("#chat-circle").click(function () {
          $("#chat-circle").toggle("scale");
          $(".chat-box").toggle("scale");
        });

        $(".chat-box-toggle").click(function () {
          $("#chat-circle").toggle("scale");
          $(".chat-box").toggle("scale");
        }); 
      });
    </script>
  </body>
</html>

  
  `;

  const copyValue = (value) => {
    const text = `${CodeLiveChat}`;
    navigator.clipboard.writeText(text);
    Swal.fire({
      title: "Copied!",
      text: "Your code has been copied to your clipboard.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="max-w-max">
          <div>
            <h1
              className="
          text-center
          dark:text-white
          text-2xl
          font-semibold
          leading-tight
          mb-4 mt-10"
        
            >
              Whatsapp chat
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap justify-center">
              <div className="flex flex-wrap justify-center max-w-7xl">
                <div className="flex flex-wrap md:w-auto w-full p-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Company Name
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                    placeholder="Company Name"
                    type="text"
                    name="title"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />
                </div>
                <div className="flex flex-wrap md:w-auto w-full p-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    URL IMAGE
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block min-w-full md:w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                    placeholder="URL IMAGE"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-wrap md:w-auto w-full p-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    COLOR
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 md:w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-wrap md:w-auto w-full p-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    NUMBER
                  </label>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                    placeholder="NUMBER"
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="flex w-full justify-center pt-3 pb-3">
                  <button
                    className="z-10 block p-2 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
                    type="submit"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Add"
                  >
                    <PlusIcon className="actions-buttons" />
                  </button>
                  <button
                    className="z-10 block p-2 text-orange-700 transition-all bg-orange-100 border-2 border-white rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
                    onClick={() => {
                      setName("");
                      setUrl("");
                      setColor("");
                      setNumber("");
                      setId("");
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Clear"
                  >
                    <ArchiveIcon className="actions-buttons" />
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="container mx-auto px-4 sm:px-8 max-w-full justify-center">
            <div className="py-8 flex flex-col">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <textarea
                  className="bg-gray-50 h-[200px] border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                  value={CodeLiveChat}

                  disabled
                  onChange={(e) => setLiveChatCode(e.target.value.toString)}
                ></textarea>
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="z-30 block p-2 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                  onClick={() => copyValue(CodeLiveChat)}
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Copy"
                >
                  <DocumentDuplicateIcon className="actions-buttons" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-8 max-w-min">
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <DataTable
              columns={columns}
              data={search(
                livechatcode.map((items) => ({
                  id: items.id,
                  name: items.name,
                  url: items.url,
                  color: items.color,
                  number: items.number,

                  acciones: (
                    <div className="flex items-center">
                      <button
                        className="block p-2 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-green-50"
                        onClick={() => {
                          setName(items.name);
                          setUrl(items.url);
                          setColor(items.color);
                          setNumber(items.number);
                          setId(items.id);
                        }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Edit"
                      >
                        <PencilAltIcon className="actions-buttons" />
                      </button>
                      <button
                        className="block p-2 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full"
                        onClick={() => {
                          handleDelete(items.id);
                        }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Delete"
                      >
                        <TrashIcon className="actions-buttons" />
                      </button>
                    </div>
                  ),
                }))
              )}
              pagination
              isFilterable={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneradorLiveChat;
