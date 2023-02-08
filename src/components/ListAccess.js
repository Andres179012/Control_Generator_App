import { useState, useEffect } from "react";
import { collection, orderBy, onSnapshot } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/credenciales";
import { deleteDoc } from "firebase/firestore";
import "../styles/Read.css";
import { TrashIcon, DocumentDuplicateIcon, PencilAltIcon } from "@heroicons/react/outline";
import DataTable from "react-data-table-component";
import  "sweetalert2-react-content";
import Swal from "sweetalert2";

function AccesosAdmin() {
  const [access, setAccess] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [host, setHost] = useState("");
  const [note, setNote] = useState("");
  const [id, setId] = useState("");
  const [q, setQ] = useState("");

  const handleRead = () => {
    onSnapshot(collection(db, "AccessList"), (snapshot) => {
      // use spread op to get id and data
      orderBy( setAccess(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))));
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const Ref = doc(db, "AccessList", id);
    try {
      await updateDoc(Ref, {
        name,
        url,
        user,
        password,
        host,
        date,
        note,
      });
      Swal.fire({
        title: "Actualizado",
        text: "Se actualizó correctamente",
        icon: "success",
        confirmButtonText: "Ok",
      });
      handleRead();
      setShowUpdate(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "No se pudo actualizar",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const handleDelete = async (id) => {
    const Ref = doc(db, "AccessList", id);
    try {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez eliminado, no podrás recuperarlo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.value) {
          deleteDoc(Ref);
          Swal.fire("Eliminado!", "El acceso ha sido eliminado.", "success");
        }
      }).catch(() => {
        Swal.fire("Cancelado", "El acceso no fue eliminado", "error");
      }).then(() => {
        handleRead();
      });
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    handleRead();
  }, []);

  function search(rows) {
    return rows.filter((row) => {
      //buscar por nombre  y por url
      return row.name.toLowerCase().includes(q.toLowerCase()) || row.url.toLowerCase().includes(q.toLowerCase());
    });
  }

  //Copy Row to Clipboard
  const copyRow = (row) => {
    const text = `${row.name}

  URL:  ${row.url} 
  User: ${row.user} 
  PW:   ${row.password} 
  Note: ${row.note}
  Host: ${row.host}
  Date: ${row.date}`;
    navigator.clipboard.writeText(text);
    Swal.fire({
      title: "Copied!",
      text: "The row has been copied to your clipboard.",
      icon: "success",
      confirmButtonText: "OK",
    });
  }

  //Start Data Table
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      filterable: true,
    },
    {
      name: "URL",
      selector: (row) => row.url,
      sortable: true,
    },
    {
      name: "User",
      selector: (row) => row.user,
      sortable: true,
    },
    {
      name: "Password",
      selector: (row) => row.password,
      sortable: true,
    },
    {
      name: "Host",
      selector: (row) => row.host,
      sortable: true,
    },
    {
      name: "Note",
      selector: (row) => row.note,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Actions",
      selector: (row) => row.acciones,
      sortable: true,
    },
  ];
  //End Data Table

  const hosts = [
    {value: ""},
    {value: "Bluehost 1"},
    {value: "Bluehost 2"},
    {value: "Indigo"},
    {value: "Twenty Media"},
    {value: "Hostgator"},
    {value: "Ultimate Web Studio"},
    {value: "Other"},
  ]

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="content-data-table">
              <div className="content-data-table__header flex justify-between flex-wrap">
                <div className="content-data-table__header-title">
                  <h1 className="text-2xl font-bold gradient-text">Access</h1>
                </div>
                <input
                className=" border-2 border-gray-300 rounded-lg px-4 py-2"
                placeholder="Search..."
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              ></input>
              </div>
              <DataTable
                columns={columns}
                data={search(
                  access.map((list) => ({
                    id: list.id,
                    name: list.name,
                    url: list.url,
                    user: list.user,
                    password: list.password,
                    host: list.host,
                    note: list.note,
                    date: list.date,
                    acciones: (
                      
                      <div className="flex items-center">
                        <button
                          className="z-10 block p-2 text-blue-700 transition-all bg-blue-100 border-2 border-white rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
                          onClick={() => {
                            setShowUpdate(true);
                            setName(list.name);
                            setUrl(list.url);
                            setUser(list.user);
                            setPassword(list.password);
                            setHost(list.host);
                            setNote(list.note);
                            setDate(list.date);
                            setId(list.id);
                          }}
                        >
                          <PencilAltIcon className="actions-buttons"  />
                        </button>
                        <button
                          className="z-20 block p-2 text-red-700 transition-all bg-red-100 border-2 border-white rounded-full active:bg-blue-50 hover:scale-110 focus:outline-none focus:ring"
                          onClick={() => handleDelete(list.id)}
                        >
                          <TrashIcon className="actions-buttons" />
                        </button>

                        <button
                          className="z-30 block p-2 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                          onClick={() => copyRow(list)}
                        >
                          <DocumentDuplicateIcon className="actions-buttons" />
                        </button>
                      </div>
                    ),
                  }))
                )}
                pagination
                isFilterable={true}
              />
            </div>

            {/* Modal form */}
            {showUpdate ? (
              <div className="updateTask">
                <div className="modal-content p-8">
                  <h2 className="pb-6">Update Access</h2>
                  <form
                    onSubmit={handleUpdate}
                    className="modal-access"
                    name="updateTask"
                  >
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pt-4"
                      type="text"
                      name="title"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      required
                    />
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
                      type="text"
                      name="title"
                      placeholder="URL"
                      onChange={(e) => setUrl(e.target.value)}
                      value={url}
                      required
                    />
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
                      type="text"
                      name="title"
                      placeholder="User"
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                    />
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
                      type="text"
                      name="title"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mt-4"
                      value={host}
                      onChange={(e) => setHost(e.target.value)}
                      required
                      >
                        {
                          hosts.map(items => (
                            <option
                            >{items.value}</option>
                          ))
                        }
              </select>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
                      type="text"
                      name="description"
                      placeholder="Note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      required
                    />
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
                      type="date"
                      name="description"
                      placeholder="Date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 update mt-4"
                    >
                      Update Access
                    </button>
                    <button
                      className="text-white bg-red-700  focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 update mt-1"
                      onClick={() => setShowUpdate(false)}
                    >
                      Cerrar
                    </button>
                  </form>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default AccesosAdmin;
