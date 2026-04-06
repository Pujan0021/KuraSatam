// import { useParams } from "react-router-dom";
import LoadingEffect from "./LoadingEffect";

interface Friends {
  _id: string;
  name: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
}
interface Props {
  messages: Friends[];
  loading: boolean;
}

const UserList = ({ friends, loading, handleProfileClick }: Props) => {
  return (
    <div className="bg-cyan-900 mx-1 p-5 rounded-2xl text-white w-55">
      {loading ? (
        <div className="flex items-center justify-center h-60 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          <LoadingEffect />
        </div>
      ) : (
        <div>
          {friends && friends.length > 0 ? (
            friends.map((friend) => (
              <div
                onClick={() => handleProfileClick(friend._id)}
                className="flex bg-gray-800 p-3 mb-2 rounded-xl text-center items-center gap-2 hover:cursor-pointer"
                key={friend._id}
              >
                <img
                  src="/img/profile.jpg"
                  alt="profile-pic"
                  className="rounded-[50%] object-center h-10"
                />
                <div className="font-semibold">{friend.name}</div>
              </div>
            ))
          ) : (
            <p className="bg-gray-800 p-3">No one to chat.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
