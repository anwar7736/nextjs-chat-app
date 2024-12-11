const User = ({ user }) => {
    return (
        <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" />
            </div>
            <div className="flex-1">
                <div className="flex">
                    <div className="font-semibold cursor-pointer">
                        <span className="ml-1 text-md">{user?.name}</span>
                        <sup className="p-1 bg-green-500 ml-1 rounded" style={{ fontSize: '0px' }}></sup>
                        <span className="px-1 bg-red-600 ml-1 rounded text-white text-xs">20</span>
                    </div>
                </div>
                <p className="text-gray-600 text-xs">{user?.message}</p>
            </div>
        </div>
    )
}

export default User