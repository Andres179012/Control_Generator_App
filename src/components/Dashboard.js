import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/credenciales";
import "../styles/Read.css";
import "sweetalert2-react-content";
import BaseLayout from "../Layout/BaseLayout";

function Dashboard({username}) {
  const [access, setAccess] = useState([]);
  const [mails, setMail] = useState([]);
  const [contadorAccess, setContadorAccess] = useState(0);
  const [contadorMail, setContadorMail] = useState(0);

  const handleRead = () => {
    onSnapshot(collection(db, "AccessList"), (snapshot) => {
      // use spread op to get id and data
      setAccess(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setContadorAccess(snapshot.docs.length);
    });
    onSnapshot(collection(db, "MaiList"), (snapshot) => {
      // use spread op to get id and data
      setMail(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setContadorMail(snapshot.docs.length);
    });
  };

  useEffect(() => {
    handleRead();
  }, []);

  return (
    <BaseLayout username={username}>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="Dashboard">
          <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
            <div className="w-full max-w-3xl">
              <div className="-mx-2 md:flex">
                <div className="w-full md:w-1/2 px-2">
                  <div className="rounded-lg shadow-sm mb-4">
                    <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                      <div className="px-3 pt-8 pb-10 text-center relative z-10">
                        <h4 className="text-sm uppercase text-blue-500 leading-tight">
                          Total Access
                        </h4>
                        <h3 className="text-3xl text-blue-700 font-semibold leading-tight my-3">
                          {contadorAccess}
                        </h3>
                      </div>
                      <div className="absolute bottom-0 inset-x-0">
                        <canvas id="chart1" height="70"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-2">
                  <div className="rounded-lg shadow-sm mb-4">
                    <div className="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
                      <div className="px-3 pt-8 pb-10 text-center relative z-10">
                        <h4 className="text-sm uppercase text-red-500 leading-tight">
                          Total Mail
                        </h4>
                        <h3 className="text-3xl text-red-700 font-semibold leading-tight my-3">
                          {contadorMail}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default Dashboard;
