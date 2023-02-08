import { NavLink } from "react-router-dom";
import { BiChat, BiChart, BiCreditCardFront, BiQr } from "react-icons/bi";
import BaseLayout from "../Layout/BaseLayout";

function NavContentGenerator({ username }) {
  return (
    <BaseLayout username={username}>
      <div className="mx-auto">
        <div className="w-full flex justify-center pt-6">
          <div className="w-full max-h-min flex justify-center">
            <NavLink
              to="/signature"
              className="flex justify-center flex-col items-center md:py-2 md:px-4 px-2"
            >
              <BiCreditCardFront className="text-2xl text-green-500" />
              <span className="text-[16px] font-bold sm:block hidden dark:text-white">
                {" "}
                Signature{" "}
              </span>
            </NavLink>
            <NavLink
              to="/qr"
              className="flex justify-center flex-col items-center md:py-2 md:px-4 px-2"
            >
              <BiQr className="text-2xl text-cyan-500" />
              <span className="text-[16px] font-bold sm:block hidden dark:text-white">
                {" "}
                QR{" "}
              </span>
            </NavLink>
            <NavLink
              to="/chat"
              className="flex justify-center flex-col items-center md:py-2 md:px-4 px-2"
            >
              <BiChat className="text-2xl text-blue-600" />
              <span className="text-[16px] font-bold sm:block hidden dark:text-white">
                {" "}
                LiveChat{" "}
              </span>
            </NavLink>
            <NavLink
              to="/visor"
              className="flex justify-center flex-col items-center md:py-2 md:px-4 px-2"
            >
              <BiChart className="text-2xl text-orange-500" />
              <span className="text-[16px] font-bold sm:block hidden dark:text-white">
                {" "}
                VisorCounter{" "}
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
}

export default NavContentGenerator;
