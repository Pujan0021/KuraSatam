import LoadingEffect from "./LoadingEffect";
import defaultImg from "/img/profile.jpg";

interface Friends {
  _id: string;
  name: string;
  receiver: string;
  createdAt: string;
  updatedAt: string;
  imgURL?: string;
}

interface Props {
  friends: Friends[];
  loading: boolean;
  handleProfileClick: (id: string) => void;
}

const UserList = ({ friends, loading, handleProfileClick }: Props) => {
  return (
    <div className="bg-cyan-900 mx-1 p-5 rounded-2xl text-white w-55">
      {loading ? (
        <div className="flex items-center justify-center h-70 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          <LoadingEffect />
        </div>
      ) : (
        <div className="h-70 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          {friends && friends.length > 0 ? (
            friends.map((friend) => (
              <div
                onClick={() => handleProfileClick(friend._id)}
                className="flex bg-gray-800 p-2 mb-1.5 rounded-xl text-center items-center gap-2 hover:cursor-pointer hover:bg-gray-700 transition-colors"
                key={friend._id}
              >
                <img
                  src={friend.imgURL ? friend.imgURL : defaultImg}
                  alt="profile-pic"
                  className="rounded-full object-cover h-10 w-10"
                />
                <div className="font-semibold truncate">{friend.name}</div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center m-auto h-full">
              <p>No friends to chat</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
