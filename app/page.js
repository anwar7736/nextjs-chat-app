"use client";
import { useContext, useEffect, useState } from 'react';
import Messages from './components/Messages';
import Sidebar from './components/Sidebar'
import { FaVideo } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { UserContext } from './contexts/UserContext';

const Home = () => {
  const messages = [{ id: 1, message: 'Hello how are you?' }];
  const {user, setUser} = useContext(UserContext);
  return (
    <div className="px-7 h-screen overflow-hidden flex items-center justify-center bg-[#edf2f7]">
      <div className="flex h-screen overflow-hidden w-full ">
        <Sidebar/>
        <div className="w-3/4">
          <header className="bg-white p-4 text-gray-700 flex justify-between">
            <div className="text-xl font-semibold cursor-pointer">
              <span className="ml-1">{user?.name}</span>
              <sup className="p-1 bg-green-500 ml-1 rounded" style={{ fontSize: '0px' }}></sup>
            </div>
            <div className="flex justify-end px-2">
              <div className="px-3 cursor-pointer">
                <MdAddIcCall title="voice call" />
              </div>
              <div className="px-3 cursor-pointer">
                <FaVideo title="video call" />
              </div>

            </div>
          </header>
          <Messages messages={messages} />
          <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
            <div className="flex items-center gap-x-2">
              <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-md mr-6">Send</button>
            </div>
          </footer>

        </div>


      </div>
    </div>
  )
}

export default Home