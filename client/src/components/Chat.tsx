import { LuRefreshCcw } from "react-icons/lu";
import { TbSend } from "react-icons/tb";
import ChatMessage from "./ChatMessage";
import useChatLogic from "./useChatLogic";

function Chat({ updateLocationData }: any) {
  const { chatContainer, input, chatLog, setInput, clearChat, handleSubmit } =
    useChatLogic({ updateLocationData });

  return (
    <>
      <div className="overflow-hidden w-full lg:w-2/5 flex relative items-center justify-start">
        <div className="flex-1 p-1 m-2 flex flex-col h-72 lg:h-96">
          {/* <div className="border-t-2 border-gray-500 px-4 pt-4 mb-2 sm:mb-0"> */}
          <div className="relative flex">
            <form onSubmit={handleSubmit} className="w-3/4 sm:w-4/5 md:w-5/6">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="text"
                placeholder="Find a destination"
                className="w-full focus:outline-none shadow-xl focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-2 bg-gray-200 rounded-md py-1"
              />
            </form>

            <div className="absolute shadow-xl right-0 items-center inset-y-0 sm:flex">
              <button
                onClick={handleSubmit}
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-2 py-1 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
              >
                <span className="font-bold pr-2">Send</span>
                <TbSend size={15} />
              </button>
            </div>
            {/* </div> */}
          </div>
          <div className="flex items-center p-1 space-x-2 justify-end">
            <button
              onClick={clearChat}
              type="button"
              className="inline-flex items-center justify-center rounded-lg border h-6 w-6 transition duration-500 ease-in-out text-white hover:bg-gray-300 focus:outline-none"
            >
              <LuRefreshCcw size={15} />
            </button>
          </div>
          <div
            ref={chatContainer}
            id="messages"
            className="flex h-80 flex-col space-y-4 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {chatLog.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))}
          </div>
        </div>
      </div>
      {/* <Cards locationData={locationData} /> */}
    </>
  );
}

export default Chat;
