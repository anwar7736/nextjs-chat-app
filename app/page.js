"use client";
import { useContext, useEffect, useState } from 'react';
import Messages from './components/Messages';
import Sidebar from './components/Sidebar'
import { FaVideo } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { UserContext, useUserContext } from './contexts/UserContext';
import { MessageContext } from './contexts/MessageContext';
import { io } from 'socket.io-client';
import { auth } from './helpers/helper';
let socket = io("http://localhost:3001");
const Home = () => {
  const [users, setUsers] = useState([]);
  const { user, setUser } = useUserContext()
  const { messages, setMessages } = useContext(MessageContext);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const authUser = auth();
  const getUserList = async () => {
    let res = await fetch(`/api/v1/users?auth_id=${auth()?._id}&search=${search}`);
        res = await res.json();
    if(res.success)
    {
      setUsers(res.data);
    }
  }
  useEffect(() => {
    getUserList();
  }, [search]);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('send-message', JSON.stringify({
      "_id": Math.random(),
      "message": message,
      "is_read": 0,
      "createdAt": "2024-12-15T18:34:25.132Z",
      "sender": [
          {
              "_id": "6748ab6ffad330340f42406b",
              "name": "Md Anwar Hossain"
          }
      ],
      "receiver": [
          {
              "_id": "67489fcee086d443b3434dc8",
              "name": "Test User"
          }
      ]
  }));
    setMessage('');
    loadRealTimeMessages();

  }

  const loadRealTimeMessages = () =>{
    socket.on('receive-message', (data) => {
      console.log(user)
      data = JSON.parse(data);
      if( (data.sender[0]._id == authUser._id && data.receiver[0]._id == user._id) || (data.sender[0]._id == user._id && data.receiver[0]._id == authUser._id) )
        {
          setMessages( (prev) => [...prev, data]);
        }
        else if(data.receiver[0]._id == authUser._id){
          getUserList();
       }
    });
  }
  

  return (
    <div className="px-7 h-screen overflow-hidden flex items-center justify-center bg-[#edf2f7]">
      <div className="flex h-screen overflow-hidden w-full ">
        <Sidebar users={users} setSearch={setSearch} search={search}/>
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
              <form method="POST" onSubmit={sendMessage}>
                <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                  <div className="flex items-center gap-x-2">
                    <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" onChange={(e) => setMessage(e.target.value)} value={message} />
                    <button type="submit" className={`${message.trim()?.length > 0 ? 'bg-indigo-500' : 'bg-indigo-200 cursor-not-allowed'} text-white px-4 py-2 rounded-md mr-6`} disabled={message.trim().length === 0} title={message.trim().length > 0 ? 'Send' : ''}>Send</button>
                  </div>
                </footer>
              </form>
            </div>
          }



        </div>


      </div>
    </div>
  )
}

export default Home