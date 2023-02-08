import React, { useState } from "react";
import {
  collection,
  addDoc,
} from "firebase/firestore";
import { db } from "../../firebase/credenciales";
import "../../index.css";
import {
  ArchiveIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import "sweetalert2-react-content";

function PersonalData() {

    const [signature, setSignature] = useState([]);
  const [name, setName] = useState("Jonh Doe");
  const [address, setAddress] = useState("Alexandria,oh, 43001  United States");
  const [phone, setPhone] = useState("888-777-6666");
  const [email, setEmail] = useState("info@domain.com");
  const [website, setWebSite] = useState("dommain.com");
  const [urllogo, setUrlLogo] = useState("https://firebasestorage.googleapis.com/v0/b/searchapp-25415.appspot.com/o/Interscope.08186ff3de38a8697017.png?alt=media&token=b12ef143-cf53-473e-b8c1-c59e044e96ac");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYouTube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [color, setColor] = useState("#000000");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Signature"), {
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


  return (
    <div>
        <form onSubmit={handleSubmit}>
           <div class="flex flex-wrap justify-center ">
             <div class="flex flex-wrap justify-center max-w-7xl">
               <div class="flex flex-wrap  md:w-auto w-full p-3">
                 <label
                   for="first_name"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                 >
                   Customer
                 </label>
                 <input
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                   placeholder="Customer"
                   type="text"
                   name="title"
                   onChange={(e) => setName(e.target.value)}
                   value={name}
                   required
                 />
               </div>
               <div class="flex flex-wrap  md:w-auto w-full p-3">
                 <label
                   for="first_name"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                 >
                   URL Logo
                 </label>
                 <input
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                   placeholder="URL Logo"
                   type="text"
                   name="title"
                   onChange={(e) => setUrlLogo(e.target.value)}
                   value={urllogo}
                   required
                 />
               </div>
               <div class="flex flex-wrap  md:w-auto w-full p-3">
                 <label
                   for="first_name"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                 >
                   Address
                 </label>
                 <input
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                   placeholder="Address"
                   type="text"
                   name="title"
                   onChange={(e) => setAddress(e.target.value)}
                   value={address}
                   required
                 />
               </div>
               <div class="flex flex-wrap  md:w-auto w-full p-3">
                 <label
                   for="first_name"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                 >
                   Phone
                 </label>
                 <input
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                   placeholder="Phone"
                   type="text"
                   name="title"
                   onChange={(e) => setPhone(e.target.value)}
                   value={phone}
                   required
                 />
               </div>
               <div class="flex flex-wrap  md:w-auto w-full p-3">
                 <label
                   for="first_name"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                 >
                   Email
                 </label>
                 <input
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                   placeholder="Email"
                   type="text"
                   name="title"
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
                   required
                 />
               </div>
               <div class="flex flex-wrap  md:w-auto w-full p-3">
                 <label
                   for="first_name"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                 >
                   Web
                 </label>
                 <input
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                   placeholder="Web"
                   type="text"
                   name="title"
                   onChange={(e) => setWebSite(e.target.value)}
                   value={website}
                   required
                 />
               </div>
               <div class="flex flex-wrap  md:w-auto w-full p-3">
                 <label
                   for="first_name"
                   class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                 >
                   COLOR
                 </label>
                 <input
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 md:w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                   type="color"
                   value={color}
                   onChange={(e) => setColor(e.target.value)}
                   required
                 />
               </div>
               <div className="flex w-full justify-center pt-3 pb-3">
                 <button
                   class="z-10 block p-2 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
                   type="submit"
                   data-bs-toggle="tooltip"
                   data-bs-placement="top"
                   title="Add"
                 >
                   <PlusIcon className="actions-buttons" />
                 </button>
                 <button
                   class="z-10 block p-2 text-orange-700 transition-all bg-orange-100 border-2 border-white rounded-full active:bg-green-50 hover:scale-110 focus:outline-none focus:ring"
                   onClick={() => {
                     setName("");
                     setColor("");
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
    </div>
  )
}

export default PersonalData