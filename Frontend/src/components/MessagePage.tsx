import LoadingEffect from "./LoadingEffect";
import MessageInput from "./MessageInput";
import SelectUser from "./SelectUser";

interface Message {
  _id: string;
  text: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
}
interface Props {
  messages: Message[];
  loading: boolean;
  id: string;
}
const MessagePage = ({ messages, loading, id }: Props) => {
  return (
    <div className="bg-cyan-900 p-5 rounded-2xl text-white w-95 ">
      {loading ? (
        <div className="flex items-center justify-center h-60">
          <LoadingEffect />
        </div>
      ) : !id ? (
        <SelectUser />
      ) : (
        <ol className="h-60">
          {messages && messages.length > 0 ? (
            messages.map((msg) => (
              <li
                className="bg-gray-800 shadow-white shadow-xs px-2 py-2 rounded-lg font-semibold text-sm mb-2 w-max 

                "
                key={msg._id}
              >
                {msg.text}
              </li>
            ))
          ) : (
            <div className="flex justify-center items-center m-auto h-60">
              <div>
                <p>No messages</p>
              </div>
            </div>
          )}
        </ol>
      )}
      {id ? <MessageInput id={id} /> : null}
    </div>
  );
};

export default MessagePage;
