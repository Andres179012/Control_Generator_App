import React, { useState, useEffect } from "react";
import {
  collection,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/credenciales";
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

function GeneradorVisorCounter() {
  const [visorcounter, setVisorCounter] = useState([]);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [id, setId] = useState("");
  const [q] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "VisorCounter"), {
        id: id,
        name: name,
        color: color,
        timestamp: new Date(),
      });
      setName("");
      setColor("");
    } catch (err) {
      alert(err);
    }
  };

  const handleRead = () => {
    onSnapshot(collection(db, "VisorCounter"), (snapshot) => {
      // use spread op to get id and data
      orderBy(
        setVisorCounter(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
    });
  };

  const handleDelete = async (id) => {
    const Ref = doc(db, "VisorCounter", id);
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
      name: "color",
      selector: (row) => row.color,
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
    <title>LVisor Counter</title>
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
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <style>
      :root {
        --primary-color: ${color};
      }

      #center-text-visor {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
      }
      #chat-circle-visor {
        position: fixed;
        bottom: 90px;
        left: 20px;
        background: var(--primary-color);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        color: white;
        padding: 16px;
        cursor: pointer;
      }

      .material-icons {
        background: var(--primary-color);
        color: white;
        border-radius: 50%;
      }

      .chat-box-visor {
        display: none;
        position: fixed;
        left: 10px;
        bottom: 30px;
        width: 350px;
        max-width: 85vw;
        max-height: 100vh;
        border-radius: 5px;
        z-index: 99;
      }
      .chat-box-toggle-visor {
        float: right;
        margin-top: -30px;
        margin-right: 15px;
        cursor: pointer;
      }
      .chat-box-body-visor {
        position: relative;
        overflow: hidden;
        padding-top: 30px;
      }
      .chat-box-body-visor:after {
        content: "";
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
        .chat-logs-visor {
          height: 40vh;
        }
      }

      /*Icon Center*/
      .icon-style-visor {
        background: var(--primary-color);
        padding: 0.5em;
        border-radius: 50%;
        color: white;
        margin: 10px 10px 30px 10px;
        font-size: 1.5em;
      }

      .icon-style-visor:hover {
        background: var(--primary-color);
      }

      .content-photo-header-visor {
        background: white;
        border-radius: 50%;
        width: 3em;
        height: 3em;
      }

      .img-company-header-visor {
        object-fit: cover;
      }

      .content-message-chat-visor {
        width: 80%;
        height: 100%;
        background-color: #ffffff;
        padding: 10px;
        margin: 10px;
        display: flex;
        flex-wrap: nowrap;
        border-radius: 0 10px 10px 10px;
      }

      .visor-Counter-visor {
        width: 100%;
        display: flex;
        justify-content: center;
        background: white;
        justify-content: center;
        padding-top: 10px;
        padding-bottom: 10px;
      }

      .stat-visor {
        width: 100%;
        display: flex;
        justify-content: center;
        background: white;
        font-size: 16px;
      }

      .bxs-show-visor {
        color: var(--primary-color);
        padding-left: 4px;
      }

      .content-visor-counter-visor {
        width: 100%;
        display: flex;
        justify-content: center;
        font-size: 16px;
        margin-bottom: 15px;
      }

      .exHZsE {
        background: var(--primary-color) !important;
      }

      .whatsapp-visor {
        background: #0ec12f;
        color: white;
      }

      .whatsapp-visor:hover {
        background: #0ec12f;
        color: white;
      }

      .material-icons-visor {
        background: var(--primary-color);
        color: white;
        padding: 5px;
        border-radius: 50%;
      }
    </style>
  </head>
  <body>
    <div id="body-visor">
      <div id="chat-circle-visor" className="btn btn-raised">
        <i className="bx bx-line-chart bx-tada" style="font-size: 2em"></i>
      </div>
      <div className="chat-box-visor">
        <div className="chat-box-body-visor">
          <div className="content-visor-counter-visor">
            <span className="chat-box-toggle-visor"
              ><i className="material-icons">close</i></span
            >
            <script
              src="https://apps.elfsight.com/p/platform.js"
              defer
            ></script>
            <div
              className="elfsight-app-b8a56f1e-13f0-420d-a542-091d4e218b2d"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <!-- partial -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/js/bootstrap.min.js"></script>
    <script>
      $(function () {
        $(document).delegate(".chat-btn", "click", function () {
          var value = $(this).attr("chat-value");
          var name = $(this).html();
          $("#chat-input-visor").attr("disabled", false);
          generate_message(name, "self");
        });

        $("#chat-circle-visor").click(function () {
          $("#chat-circle-visor").toggle("scale");
          $(".chat-box-visor").toggle("scale");
        });

        $(".chat-box-toggle-visor").click(function () {
          $("#chat-circle-visor").toggle("scale");
          $(".chat-box-visor").toggle("scale");
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
              Visor Counter UI
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap justify-center ">
              <div className="flex flex-wrap justify-center max-w-7xl">
                <div className="flex flex-wrap  md:w-auto w-full p-3">
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
                <div className="flex flex-wrap  md:w-auto w-full p-3">
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
                      setColor("");
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
            <div className="flex flex-col">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"></div>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive h-[250px]"
                value={CodeLiveChat}
                disabled
                onChange={(e) => setVisorCounter(e.target.value.toString)}
              ></textarea>
              <div id="code">
                
              </div>
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
      <div className="container mx-auto px-4 sm:px-8 max-w-min">
        <div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <DataTable
              columns={columns}
              data={search(
                visorcounter.map((items) => ({
                  id: items.id,
                  name: items.name,
                  color: items.color,

                  acciones: (
                    <div className="flex items-center">
                      <button
                        className="block p-2 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-green-50"
                        onClick={() => {
                          setName(items.name);
                          setColor(items.color);
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

export default GeneradorVisorCounter;
