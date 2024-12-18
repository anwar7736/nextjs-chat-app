"use client";
import { useContext, useEffect, useState } from 'react';
import Messages from './components/Messages';
import Sidebar from './components/Sidebar'
import { FaVideo } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
import { UserContext } from './contexts/UserContext';
import { MessageContext } from './contexts/MessageContext';
import { io } from 'socket.io-client';
import { auth } from './helpers/helper';
let socket = io("http://localhost:3001");
const Home = () => {
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const { user, setUser } = useContext(UserContext)
  const { messages, setMessages } = useContext(MessageContext);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const authUser = auth();
  const getUserList = async () => {
    let res = await fetch(`/api/v1/users?auth_id=${auth()?._id}&search=${search}`);
    res = await res.json();
    if (res.success) {
      setUsers(res.data);
    }
  }

  useEffect(() => {
    getUserList();
  }, [search]);

  useEffect(() => {
    socket.emit('register-user', authUser._id);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    const data = { "message": message, "sender_id": authUser._id, "receiver_id": user._id };
    setMessage('');
    let res = await fetch("api/v1/messages", {
      method: "POST",
      body: JSON.stringify(data)
    });
    res = await res.json();
    if (res.success) {
      socket.emit('private-message', JSON.stringify({
        "_id": res?._id,
        "message": data?.message,
        "createdAt": res?.createdAt,
        "sender": [
          {
            "_id": authUser._id,
            "name": authUser.name
          }
        ],
        "receiver": [
          {
            "_id": user._id,
            "name": user.name
          }
        ]
      }));
    }
    // loadRealTimeMessages();

  }

  const loadRealTimeMessages = () => {
    // Remove any previous listeners to avoid duplicates
    socket.off('private-message');
    // Attach a new listener
    socket.on('private-message', async (data) => {
      if (
        (data.sender[0]._id === authUser._id && data.receiver[0]._id === user._id) ||
        (data.sender[0]._id === user._id && data.receiver[0]._id === authUser._id)
      ) {
        setMessages((prev) => [...prev, data]);
        if (data.receiver[0]._id === authUser._id) {
          let res = await fetch("api/v1/messages", {
            method: "PUT",
            body: JSON.stringify({sender_id:user._id, receiver_id:authUser._id})
          });
          res = await res.json();
        }

      } else if (data.receiver[0]._id === authUser._id) {
        getUserList();
      }
    });
  };

  const loadActiveUsers = () => {
    // Remove any previous listeners to avoid duplicates
    socket.off('active-users');
    // Attach a new listener
    socket.on('active-users', (data) => {
      setActiveUsers(data);

    });
  };


  useEffect(() => {
    loadRealTimeMessages();
    loadActiveUsers();
  }, [user, authUser]);

  return (
    <div className="px-7 h-screen overflow-hidden flex items-center justify-center bg-[#edf2f7]">
      <div className="flex h-screen overflow-hidden w-full ">
        <Sidebar users={users} setSearch={setSearch} search={search} activeUsers={activeUsers} />
        <div className="w-3/4">
          {
            user && (
              <header className="bg-white p-4 text-gray-700 flex justify-between">
                <div className="text-xl font-semibold cursor-pointer">
                  <span className="ml-1">{user?.name}</span>
                  {
                    activeUsers.includes(user?._id) && (<sup className="p-1 bg-green-500 ml-1 rounded" style={{ fontSize: '0px' }}></sup>)
                  }
                </div>
                <div className="flex justify-end px-2">
                  <div className="px-3 cursor-pointer hidden">
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