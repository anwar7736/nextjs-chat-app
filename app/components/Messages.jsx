import Message from "./Message"
const Messages = ({messages}) => {
    return (
        <div className="h-screen overflow-y-auto p-4 pb-36">
            {
                messages?.map(message => {
                    return  <Message message={message} key={message?.id}/>
                })
            }

        </div>
    )
}

export default Messages