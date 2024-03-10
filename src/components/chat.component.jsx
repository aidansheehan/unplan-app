import dynamic from 'next/dynamic'

// Dynamically import the ReactSlackChat component with SSR disabled
const ReactSlackChat = dynamic(
    () => import('react-slack-chat').then((mod) => mod.ReactSlackChat), {
    ssr: false
})

const ChatComponent = () => {

    return (
        <div className='absolute top-2' >
        <ReactSlackChat 
            botName={process.env.NEXT_PUBLIC_BOT_NAME}
            apiToken={process.env.NEXT_PUBLIC_BOT_USER_TOKEN_B64}
            channels={[{
                name: "test_chat",
                id: 'C06NSLUQ44T',  // TODO set by user
            }]}
            helpText="Optional help text"
            debugMode={true}    // TODO set to false in production
        />
        </div>
    )
}

export default ChatComponent