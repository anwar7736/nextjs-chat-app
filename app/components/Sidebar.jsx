import React, { useState } from 'react'
import Users from './Users'
import { IoMdArrowDropdown } from "react-icons/io";

const Sidebar = ({ users }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (

        <div className="w-1/4 bg-white border-r border-gray-300">
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                <h1 className="text-2xl font-semibold">Md Anwar Hossain</h1>
                <div className="px-3 cursor-pointer" onClick={toggleDropdown}>
                    <IoMdArrowDropdown title="More" id="dropdownDefaultButton" />
                </div>
                <div className={`z-10 ${isDropdownOpen ? '' : 'hidden'
                    } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute dropdown-list`}>
                    <ul className="py-1 px-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                        </li>
                    </ul>
                </div>
            </header>

            <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                <Users users={users} />
            </div>
        </div>

    )
}

export default Sidebar