import Ably from "ably";
import { usePlayerStore } from "@/store/playerStore";
import { useAccount } from "wagmi";

export default function useAbly() {
  // run service
  const { setRoomInfo } = usePlayerStore();
  const { address } = useAccount();
  const ably = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY || "your-api-key",
    clientId: address || "UNCONNECT"
  });
  // 公共频道
  const lobbyChannel = ably.channels.get("lobby");
  // 生成房间id
  const roomId = Math.random().toString(36).substr(2, 9);

  /**
   * @description 创建房间
   */
  const createRoom = (creator: string, chipAmount: string | number) => {
    lobbyChannel.publish("room-created", {
      roomId,
      creator, // TODO 应该是玩家钱包地址
      player2: null,
      chipAmount,
      status: "waiting" // 房间状态
    });

    // 存储数据
    setRoomInfo({
      roomId,
      creator, // 通过其他方式获取，例如从房间列表中查找
      player2: null,
      chipAmount,
      status: "waiting"
    });

    console.log(`房间已创建，ID: ${roomId}`);
  };

  /**
   * @description 加入房间
   */
  const joinRoom = (roomId: string) => {
    const roomChannel = ably.channels.get(roomId);
    roomChannel.presence.enter({ player: address });
    // lobbyChannel.publish("room-created", {
    //   roomId,
    //   player2: player,
    //   status: "in-game"
    // });
    console.log(`已加入房间: ${roomId}`);
  };

  /**
   * @description 获取房间频道
   */
  const getRoomChannel = (roomId: string) => ably.channels.get(roomId);
  return {
    ably,
    lobbyChannel,
    createRoom,
    joinRoom,
    getRoomChannel
  };
}
