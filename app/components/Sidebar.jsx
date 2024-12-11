import React from 'react'
import Users from './Users'

const Sidebar = ({users}) => {
    return (

        <div className="w-1/4 bg-white border-r border-gray-300">
            <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
                <h1 className="text-2xl font-semibold">Chat Web</h1>
            </header>

            <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                <Users users={users} />
            </div>
        </div>

    )
}

export default Sidebar