"use client";
import { useContext, useEffect, useState } from 'react';
import Messages from './components/Messages';
import Sidebar from './components/Sidebar'
import { FaVideo } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { UserContext } from './contexts/UserContext';
import { MessageContext } from './contexts/MessageContext';

const Home = () => {
  const { user, setUser } = useContext(UserContext);
  const { messages, setMessages } = useContext(MessageContext);
  const [message, setMessage] = useState('');
  return (
    <div className="px-7 h-screen overflow-hidden flex items-center justify-center bg-[#edf2f7]">
      <div className="flex h-screen overflow-hidden w-full ">
        <Sidebar />
        <div className="w-3/4">
          {
            user && (
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
            )
          }
          {
            messages?.length > 0 && (<Messages messages={messages} />)
          }
          {
            user &&
            <div>
              <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                <div className="flex items-center gap-x-2">
                  <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" onChange={(e) => setMessage(e.target.value)} value={message}/>
                  <button className={`${message.trim()?.length > 0 ? 'bg-indigo-500' : 'bg-indigo-200 cursor-not-allowed'} text-white px-4 py-2 rounded-md mr-6`} disabled={message.trim().length === 0} title={message.trim().length > 0 ? 'Send' : ''}>Send</button>
                </div>
              </footer>
            </div>
          }



        </div>


      </div>
    </div>
  )
}

export default Home