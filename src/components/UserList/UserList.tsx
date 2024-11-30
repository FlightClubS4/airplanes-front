import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from './UserList.module.css';
import useAbly from "@/services/ably";

export const UserList: React.FC = () => {
  const { lobbyChannel, joinRoom } = useAbly();
  const router = useRouter();
  // 房间列表
  const [roomList, setRoomList] = useState<any[]>([]);
  useEffect(() => {
    // 订阅房间列表更新
    lobbyChannel?.subscribe("room-created", (message) => {
      setRoomList((prevList) => [...prevList, message.data]);
    });

    // TODO  离开页面时清理订阅
    // return () => lobbyChannel.detach();
  }, []);

  const joinGame = (roomId: string) => {
    joinRoom(roomId);
    router.push("/startgame");
  };
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>可加入的游戏</h2>
      <div className={styles.userList}>
        {roomList.map((room, index) => (
          <li key={index}>
            房间 ID: {room.roomId}, 创建者: {room.creator}, 筹码: { room.chipAmount } , 状态: {room.status}
            <button onClick={() => joinGame(room.roomId)}>加入</button>
          </li>
        ))}
        {/* {mockUsers.length > 0 ? (
          mockUsers.map((user) => <UserListItem key={user.id} user={user} />)
        ) : (
          <div className={styles.emptyMessage}>暂无可加入的游戏</div>
        )} */}
      </div>
    </div>
  );
};