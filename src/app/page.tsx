"use client";

import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "../components/Board";

const Home: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true); // 确保代码只在客户端运行
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {isClient ? (
        <DndProvider backend={HTML5Backend}>
          <Board />
        </DndProvider>
      ) : (
        "SSR..."
      )}
    </div>
  );
};

export default Home;
