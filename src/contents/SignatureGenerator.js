
import NavContent from "../contents/NavContentGenerator";
import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
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

const SignatureGenerator = ({username}) => {
  const [signature, setSignature] = useState([]);
  const [name, setName] = useState("Jonh Doe");
  const [address, setAddress] = useState("Alexandria,oh, 43001  United States");
  const [phone, setPhone] = useState("888-777-6666");
  const [email, setEmail] = useState("info@domain.com");
  const [website, setWebSite] = useState("dommain.com");
  const [urllogo, seturllogo] = useState(
    "https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FLogoAndresDev.png?alt=media&token=98153248-dadb-4a52-817b-f20138a6794d"
  );
  const [facebook, setFacebook] = useState("facebook.com");
  const [iconstate] = useState("hidden");
  const [twitter, setTwitter] = useState("twitter.com");
  const [youtube, setYouTube] = useState("youtube.com");
  const [instagram, setInstagram] = useState("instagram.com");
  const [pinterest, setPinterest] = useState("pinterset.com");
  const [color, setColor] = useState("#000000");

  const [id, setId] = useState("");
  const [q] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Signature"), {
        id: id,
        name: name,
        address: address,
        phone: phone,
        email: email,
        website: website,
        urllogo: urllogo,
        facebook: facebook,
        twitter: twitter,
        youtube: youtube,
        instagram: instagram,
        pinterest: pinterest,
        color: color,
        timestamp: new Date(),
      });
      setColor("");
    } catch (err) {
      alert(err);
    }
  };

  const handleRead = () => {
    onSnapshot(collection(db, "Signature"), (snapshot) => {
      // use spread op to get id and data
      orderBy(
        setSignature(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
    });
  };

  const handleDelete = async (id) => {
    const Ref = doc(db, "Signature", id);
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
      selector: row => row.id,
      sortable: true,
      filterable: true,
    },
    {
      name: "name",
      selector: row => row.name,
      sortable: true,
      filterable: true,
    },
    {
      name: "address",
      selector: row => row.address,
      sortable: true,
      filterable: true,
    },
    {
      name: "phone",
      selector: row => row.phone,
      sortable: true,
      filterable: true,
    },
    {
      name: "email",
      selector: row => row.email,
      sortable: true,
      filterable: true,
    },
    {
      name: "website",
      selector: row => row.website,
      sortable: true,
      filterable: true,
    },
    {
      name: "urllogo",
      selector: row => row.urllogo,
      sortable: true,
      filterable: true,
    },
    {
      name: "facebook",
      selector: row => row.facebook,
      sortable: true,
      filterable: true,
    },
    {
      name: "twitter",
      selector: row => row.twitter,
      sortable: true,
      filterable: true,
    },
    {
      name: "youtube",
      selector: row => row.youtube,
      sortable: true,
      filterable: true,
    },
    {
      name: "instagram",
      selector: row => row.instagram,
      sortable: true,
      filterable: true,
    },
    {
      name: "pinterest",
      selector: row => row.pinterest,
      sortable: true,
    },
    {
      name: "color",
      selector: row => row.color,
      sortable: true,
      filterable: true,
    },
    {
      name: "acciones",
      selector: row => row.acciones,
      sortable: true,
      filterable: true,
    },
  ];

  function search(rows) {
    return rows.filter((row) => {
      return row.name.toLowerCase().includes(q.toLowerCase());
    });
  }

  const SocialMedia = [
    {
      name: "facebook",
      icon: "https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FSocial%20Mediaa%2Fface_01.png?alt=media&token=482db001-69e2-4438-b10c-007448d0ecb1",
      url: "facebook.com",
      state: facebook,
    },
    {
      name: "twitter",
      icon: "https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FSocial%20Mediaa%2Ftwitter-01.png?alt=media&token=4cc36b7e-47a0-476a-adc5-a560b4e19f9e",
      url: "twitter.com",
      state: twitter,
    },
    {
      name: "youtube",
      icon: "https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FSocial%20Mediaa%2Fyoutube-01.png?alt=media&token=2f687a94-4283-474e-92ad-df5897d20db4",
      url: "youtube.com",
      state: youtube,
    },
    {
      name: "instagram",
      icon: "https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FSocial%20Mediaa%2Finstagram-01.png?alt=media&token=9526db0a-a228-485a-8986-1ad174028f86",
      url: "instagram.com",
      state: instagram,
    },
    {
      name: "pinterest",
      icon: "https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FSocial%20Mediaa%2Fpin-01.png?alt=media&token=d46318fa-5980-47f3-a866-43f14a6d8765",
      url: "pinterest.com",
      state: pinterest,
    },
  ];

  const Signature = `
  <table style="max-width: 600px; border-collapse: collapse; table-layout: fixed; border-spacing: 0; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; min-width: 320px; margin: 0 auto; background-color: #ffffff; width: 100%; color: #344157; font-family: 'Rubik', sans-serif;" cellspacing="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="min-width: 160px; width: 160px;">
    <table style="margin: 0; padding: 0;">
    <tbody>
    <tr>
    <td style="min-width: 83px; padding: 10px 10px 10px 10px;"><img style="width: 60%;margin:auto;" src="${urllogo}" /></td>
    </tr>
    <tr>
    <td style="padding-left: 41px; padding-bottom: 20px; min-width: 83px; padding-right: 40px;text-align:center;">
    <table>
    <tbody>
    <tr style="display:flex;justify-content:center;width:100%;    text-align: center;">
    ${SocialMedia.map((item) => {
      return `<td style="padding: 2px;text-align:center;"><a style="text-decoration: none; color: #344157;" ${
        item.state === "" && iconstate
      } href="${item.state}"><img style="width: 100%;" src="${
        item.icon
      }" /></a></td>`;
    }).join("")}
     </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    <td style="padding: 28px 0 0 18px; width: 316px;">
    <table>
    <tbody>
    <tr>
    <td style="padding-bottom: 8px;">
    <table>
    <tbody>
    <tr>
    <td style="min-width: 150px;">
    <div style="font-size: 24px; font-weight: bold; line-height: 1; padding-right: 5px; color: ${color};" placeholder="name">${name}</div>
    </td>
    <td style="border-left: 1px solid #aaa; padding-left: 14px; padding-top: 2px;">
    <div style="font-size: 13px; padding-top: 3px; color: #555555;">Owner</div>
    </td>
    <td style="padding-left: 14px; padding-top: 2px;">
    <div style="font-size: 13px; padding-top: 3px; color: #aaa;">&nbsp;</div>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    <tr>
    <td style="padding: 13px 0;">
    <table style="font-size: 11px; letter-spacing: .7px;">
    <tbody>
    <tr>
    <td style="min-width: 180px;">
    <table>
    <tbody>
    <tr>
    <td style="padding-top: 12px;"><img src="https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FSocial%20Mediaa%2Ficon-location.png?alt=media&token=27597e13-801b-4e4f-9722-a276f37b18ba" /></td>
    <td style="padding-top: 12px; color: ${color}">${address}</td>
    </tr>
    <tr>
        <td style="padding-top: 12px;"><img src="https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FSocial%20Mediaa%2Ficon-phone.png?alt=media&token=7ebf5766-1064-4480-bc46-42970074f7a4" /></td>
        <td style="padding-top: 12px;"><a style="text-decoration: none; color: ${color};" href="tel:+1${phone}"> ${phone} </a></td>
        </tr>
    <tr>
    <td style="padding-top: 12px;"><img src="https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FSocial%20Mediaa%2Ficon-mail.png?alt=media&token=7bc21388-bb60-4604-9e0c-b421b05395eb" /></td>
    <td style="padding-top: 11px;"><a style="text-decoration: none; color: ${color};" href="mailto:${email}"> ${email}</a></td>
    </tr>
    <td style="padding-top: 9px;"><img src="https://firebasestorage.googleapis.com/v0/b/control-app-56969.appspot.com/o/Resources%2FSocial%20Mediaa%2Ficon-website.png?alt=media&token=f484eb40-89f5-489a-9985-31471a311d2d" /></td>
    <td style="padding-top: 8px;"><a style="text-decoration: none; color: ${color};" href="https://${website}/"> ${website}</a></td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>
    <p>&nbsp;</p>
  `;

  const copyValue = (value) => {
    const text = `${Signature}`;
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
      <div className="mx-auto">
        <NavContent />
      </div>
      <div className="w-full flex justify-center">
        <div className="max-w-max">
          <div>
            <h1
              className="
         text-center
         text-2xl
         font-semibold
         leading-tight
         mb-4 mt-10"
            >
              Signature Generator
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div>
              <div className="w-full flex justify-center flex-col items-center">
                <Tab.Group>
                  <Tab.List className="py-4">
                    <Tab className="text-blue-600 px-2">Personal Data</Tab>
                    <Tab className="text-orange-600 px-2">Social Media</Tab>
                    <Tab className="text-green-600 px-2">Style</Tab>
                  </Tab.List>
                  <Tab.Panels className="w-full px-4 sm:w-8/12">
                    <Tab.Panel>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
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
                            <div>
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Address
                              </label>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                                placeholder="Address"
                                type="text"
                                name="title"
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                                required
                              />
                            </div>
                            <div>
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Phone
                              </label>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                                placeholder="Phone"
                                type="text"
                                name="title"
                                onChange={(e) => setPhone(e.target.value)}
                                value={phone}
                                required
                              />
                            </div>
                            <div>
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Email
                              </label>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                                placeholder="Company Name"
                                type="text"
                                name="title"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                              />
                            </div>
                            <div>
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Web
                              </label>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                                placeholder="Company Name"
                                type="text"
                                name="title"
                                onChange={(e) => setWebSite(e.target.value)}
                                value={website}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </Tab.Panel>
                    <Tab.Panel>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Facebook
                              </label>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                                placeholder="Facebook"
                                type="text"
                                name="title"
                                onChange={(e) => setFacebook(e.target.value)}
                                value={facebook}
                                required
                              />
                            </div>
                            <div>
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Twitter
                              </label>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                                placeholder="Twitter"
                                type="text"
                                name="title"
                                onChange={(e) => setTwitter(e.target.value)}
                                value={twitter}
                                required
                              />
                            </div>
                            <div>
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                YouTube
                              </label>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                                placeholder="YouTube"
                                type="text"
                                name="title"
                                onChange={(e) => setYouTube(e.target.value)}
                                value={youtube}
                                required
                              />
                            </div>
                            <div>
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Instagram
                              </label>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                                placeholder="Instagram"
                                type="text"
                                name="title"
                                onChange={(e) => setInstagram(e.target.value)}
                                value={instagram}
                                required
                              />
                            </div>
                            <div>
                              <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                Pinterest
                              </label>
                              <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                                placeholder="Pinterest"
                                type="text"
                                name="title"
                                onChange={(e) => setPinterest(e.target.value)}
                                value={pinterest}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Logo
                          </label>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input-responsive"
                            placeholder="Pinterest"
                            type="text"
                            name="title"
                            onChange={(e) => seturllogo(e.target.value)}
                            value={urllogo}
                            required
                          />
                        </div>
                        <div>
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
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
                <div className="flex w-full justify-center pt-4">
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
            <div className="container mx-auto px-4 sm:px-8">
              <div className="py-8">
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                  <div className="container mx-auto px-4 sm:px-8 max-w-full justify-center">
                    <div className="flex flex-col">
                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto"></div>
                      <div
                        dangerouslySetInnerHTML={{ __html: Signature }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  className="z-30 block p-2 text-green-700 transition-all bg-green-100 border-2 border-white rounded-full hover:scale-110 focus:outline-none focus:ring active:bg-red-50"
                  onClick={() => copyValue(Signature)}
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
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
            <DataTable
              columns={columns}
              data={search(
                signature.map((items) => ({
                  id: items.id,
                  name: items.name,
                  address: items.address,
                  phone: items.phone,
                  email: items.email,
                  website: items.website,
                  urllogo: items.urllogo,
                  facebook: items.facebook,
                  twitter: items.twitter,
                  youtube: items.youtube,
                  instagram: items.instagram,
                  pinterest: items.pinterest,
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
};

export default SignatureGenerator;
