import { auth, dateTimeFormat } from "../helpers/helper"

const Messages = ({ messages }) => {
    return (
        <div className="h-screen overflow-y-auto p-4 pb-40">
            {
                messages?.map( (message, index) => {
                    return <div key={index}>
                        {
                            message?.sender[0]?._id == auth()?._id
                                ?
                                (<div className="mb-3">
                                    <div className="flex justify-end mb-1 cursor-pointer">
                                        <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                                            <p>{message?.message}</p>
                                        </div>
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                            <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" />

                                        </div>
                                    </div>
                                    <div align="right" className="text-xs text-gray-500 mr-10">{dateTimeFormat(message?.createdAt)}
                                    </div>
                                </div>)
                                :
                                (
                                    <div className="mb-3">
                                        <div align="left" className="text-xs text-gray-500 ml-10">{message?.sender[0]?.name}
                                        </div>
                                        <div className="flex mb-1 cursor-pointer">
                                            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                                <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" />
                                            </div>
                                            <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                                                <p className="text-gray-700">{message?.message}</p>
                                            </div>
                                        </div>
                                        <div align="left" className="text-xs text-gray-500 ml-10">{dateTimeFormat(message?.createdAt)}
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                })
            }

        </div>
    )
}

export default Messages