import { SiOpenai } from "react-icons/si";
import { HiUser } from "react-icons/hi";

function ChatMessage({ message }: any) {
  if (message.role === "system") {
    return null;
  }

  return (
    <div className="chat-message">
      <div
        className={`flex items-end ${message.role === "user" && "justify-end"}`}
      >
        <div
          className={`flex flex-col space-y-2 text-xs max-w-2xl mx-2 ${
            message.role === "assistant" && "order-2 items-start"
          } ${message.role === "user" && "order-1 items-end"}`}
        >
          <div>
            <span
              className={`px-4 py-2 rounded-lg inline-block ${
                message.role === "assistant" &&
                "rounded-bl-none bg-gray-600 bg-opacity-70 text-white"
              } ${
                message.role === "user" &&
                "rounded-br-none bg-blue-600 bg-opacity-70 text-white"
              }`}
            >
              {message.content}
            </span>
          </div>
        </div>
        {message.role === "assistant" && (
          <SiOpenai className="text-white w-6 h-6 rounded-full order-1" />
        )}
        {message.role === "user" && (
          <HiUser className="w-6 h-6 rounded-full order-2" />
        )}
      </div>
    </div>
  );
}
export default ChatMessage;
