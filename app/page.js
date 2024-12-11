"use client";
import Messages from './components/Messages';
import Sidebar from './components/Sidebar'

const Home = () => {
  const messages = [{ id: 1, message: 'Hello how are you?' }];
  const users = [{ id: 1, name: 'Jon Doe', message: 'Test message' }, { id: 2, name: 'Jane Doe', message: 'Test message' }];
  return (
    <div className="px-7 h-screen overflow-hidden flex items-center justify-center bg-[#edf2f7]">
      <div className="flex h-screen overflow-hidden w-full ">
        <Sidebar users={users} />
        <div className="w-3/4">
          <header className="bg-white p-4 text-gray-700">
            <h1 className="text-2xl font-semibold">Alice</h1>
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