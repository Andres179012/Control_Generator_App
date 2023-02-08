import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/credenciales";
import "../index.css";

function WriteAccesos() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "MaiList"), {
        name: name,
        url: url,
        user: user,
        password: password,
        note: note === "" ? "There Is Not" : note,
      });
      setName("");
      setUrl("");
      setUser("");
      setPassword("");
      setNote("");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div>
        <div>
          <h1
            className="
          text-center
          text-2xl
          font-semibold
          leading-tight
          mb-4 mt-6"
          >
            Mail List
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap justify-center access_List">
            <div className="flex flex-wrap">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Company
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                placeholder="Company"
                type="text"
                name="title"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="flex flex-wrap">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                URL
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                placeholder="URL"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-wrap">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                User
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                placeholder="User"
                type="text"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-wrap">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Password
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                placeholder="Password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-wrap">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Note
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                placeholder="Note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="content-btn-responsive">
              <button
                className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-4 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 btn-form-responsive"
                type="submit"
              >
                Add Mail
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default WriteAccesos;
