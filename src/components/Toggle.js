import React from 'react';
import { useState } from 'react';
import { FaSun, FaMoon} from "react-icons/fa";

const Toggle = () => {
    const [mode,setMode] = useState(false)

  const handleClick = () => {
    setMode(!mode)
  }

    return (
        <div className="flex items-center">
            <button
                type="button"
                className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                onClick={handleClick}
            >
                <span className="sr-only">Dark Mode</span>
                {mode ? <FaMoon className="h-6 w-6" aria-hidden="true" /> : <FaSun className="h-6 w-6" aria-hidden="true" />}
            </button>
            
        </div>
    )
}

export default Toggle;