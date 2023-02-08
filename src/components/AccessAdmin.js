import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/credenciales";
import { deleteDoc } from "firebase/firestore";
import "../styles/Read.css"
import { BellIcon, TrashIcon } from '@heroicons/react/outline'

function AccesosAdmin() {
  const [access, setAccess] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [creationdate, setcreationDate] = useState("");
  const [id, setId] = useState("");

  const handleRead = () => {
    onSnapshot(collection(db, "AccessList"), (snapshot) => {
      // use spread op to get id and data
      setAccess(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  const handleUpdate = async (e) => {
    console.log(id);
    e.preventDefault();
    const Ref = doc(db, "AccessList", id);
    try {
      await updateDoc(Ref, {
        name: name,
        url: url,
        user: user,
        password: password,
        note: note,
        creationdate: creationdate,
      });
    } catch (err) {
      alert(err);
    }
    setShowUpdate(false);
  };

  const handleDelete = async (id) => {
    const Ref = doc(db, "AccessList", id);
    try {
      await deleteDoc(Ref);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    handleRead();
  }, []);


  return (
    <>
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div
                    className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
                  >
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                            <th  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">URL</th>
                            <th  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">User</th>
                            <th  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Password</th>
                            <th  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Notes</th>
                            <th  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                            <th  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {access.map((access) => (
                            <tr 
                            className="border-b"
                            key={access.id}>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{access.name}</td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{access.url}</td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{access.user}</td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{access.password}</td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{access.note}</td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{access.creationdate}</td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <button
                                type="button" className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-2 m-0.5 rounded-lg"
                                  onClick={() => {
                                    setShowUpdate(true);
                                    setName(access.name);
                                    setUrl(access.url);
                                    setUser(access.user);
                                    setPassword(access.password);
                                    setNote(access.note);
                                    setcreationDate(access.creationdate);
                                    setId(access.id);
                                  }}
                                >
                                  <BellIcon className="h-4 w-4 text-white" />
                                </button>
                                <button  
                                type="button" className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-2 rounded-lg"
                                onClick={() => handleDelete(access.id)}>
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                         ))}
                    </tbody>  
                  </table>
          </div>

      {/* Modal form */}
      {showUpdate ? (
        <div className="updateTask">
          <div className="modal-content p-8">
            <h2 className="pb-6">Update Access</h2>
            <form onSubmit={handleUpdate} className="modal-access" name="updateTask">
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pt-4"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setUrl(e.target.value)}
              value={url}
              required
            />
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
              type="text"
              name="description"
              placeholder="Description"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
            <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 update mt-4">
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
