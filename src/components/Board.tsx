"use client";

import React, { useState, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";

interface Cell {
  id: number;
  value: number; // 0: 空, 1: 飞机部分, 2: 机头
}

interface Plane {
  id: number;
  head: { row: number; col: number };
  direction: "horizontal" | "vertical";
}

const generateBoard = (): Cell[][] => {
  const board: Cell[][] = [];
  for (let i = 0; i < 16; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < 16; j++) {
      row.push({ id: i * 16 + j, value: 0 });
    }
    board.push(row);
  }
  return board;
};

// 获取飞机占用的格子
const getPlaneCells = (
  plane: Plane
): { row: number; col: number; value: number }[] => {
  const cells = [];
  const { head, direction } = plane;

  const offsets = {
    body: [0, -1, 1, -2, 2],
    wings: [0, -1, 1, -2, 2],
    tail: [-1, 0, 1]
  };

  offsets.body.forEach((offset) => {
    const row = direction === "vertical" ? head.row + offset : head.row;
    const col = direction === "horizontal" ? head.col + offset : head.col;
    cells.push({ row, col, value: 1 });
  });

  offsets.wings.forEach((offset) => {
    const row = direction === "horizontal" ? head.row + offset : head.row;
    const col = direction === "vertical" ? head.col + offset : head.col;
    cells.push({ row, col, value: 1 });
  });

  offsets.tail.forEach((offset) => {
    const row = direction === "vertical" ? head.row + 2 : head.row + offset;
    const col = direction === "horizontal" ? head.col + 2 : head.col + offset;
    cells.push({ row, col, value: 1 });
  });

  return cells;
};

const PlaneComponent: React.FC<{ plane: Plane }> = ({ plane }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "plane",
    item: plane,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {/* 这里可以自定义飞机的外观 */}
      <div style={{ width: 30, height: 30, backgroundColor: "blue" }}></div>
    </div>
  );
};

const Board: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>(generateBoard());
  const [planes, setPlanes] = useState<Plane[]>([]);
  const [selectedPlane, setSelectedPlane] = useState<number | null>(null);

  // 初始化随机飞机
  useEffect(() => {
    const newPlanes: Plane[] = [
      { id: 1, head: { row: 3, col: 3 }, direction: "horizontal" },
      { id: 2, head: { row: 6, col: 8 }, direction: "vertical" },
      { id: 3, head: { row: 12, col: 4 }, direction: "horizontal" }
    ];
    setPlanes(newPlanes);

    // let updatedBoard = generateBoard();
    // newPlanes.forEach((plane) => {
    //   getPlaneCells(plane).forEach(({ row, col, value }) => {
    //     if (row >= 0 && row < 16 && col >= 0 && col < 16) {
    //       // updatedBoard[row][col].value = value;
    //     }
    //   });
    // });
    // setBoard(updatedBoard);
  }, []);

 const [, dropRef] = useDrop({
  accept: "plane",
  drop: (item: Plane, monitor) => {
    const offset = monitor.getSourceClientOffset();
    if (!offset) return;

    const newHeadRow = Math.floor(offset.y / 30);
    const newHeadCol = Math.floor(offset.x / 30);

    const draggedPlane = { ...item, head: { row: newHeadRow, col: newHeadCol } };

    // 检查飞机是否超出边界
    const planeCells = getPlaneCells(draggedPlane);
    const isOutOfBounds = planeCells.some(({ row, col }) => row < 0 || row >= 16 || col < 0 || col >= 16);

    if (isOutOfBounds) {
      return; // 不更新飞机位置
    }

    const newPlanes = planes.map((plane) =>
      plane.id === item.id ? draggedPlane : plane
    );

    let updatedBoard = generateBoard();
    newPlanes.forEach((plane) => {
      getPlaneCells(plane).forEach(({ row, col, value }) => {
        if (row >= 0 && row < 16 && col >= 0 && col < 16) {
          updatedBoard[row][col].value = value;
        }
      });
    });

    setPlanes(newPlanes);
    setBoard(updatedBoard);
  }
});

  const rotatePlane = () => {
    if (selectedPlane === null) return;

    const newPlanes = planes.map((plane) =>
      plane.id === selectedPlane
        ? {
            ...plane,
            direction:
              plane.direction === "horizontal" ? "vertical" : "horizontal"
          }
        : plane
    );

    let updatedBoard = generateBoard();
    newPlanes.forEach((plane) => {
      getPlaneCells(plane).forEach(({ row, col }) => {
        if (row >= 0 && row < 16 && col >= 0 && col < 16) {
          updatedBoard[row][col].value = 1;
        }
      });
    });

    setPlanes(newPlanes);
    setBoard(updatedBoard);
  };

  const handleCell = (cell: Cell) => {
    console.log("Cell", cell);
  };

  return (
    <>
      <div
        ref={dropRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(16, 30px)"
        }}
      >
        {board.flat().map((cell) => (
          <div
            key={cell.id}
            style={{
              width: 30,
              height: 30,
              border: "1px solid #ccc",
              backgroundColor:
                cell.value === 2 ? "red" : cell.value === 1 ? "red" : "white"
            }}
            onClick={() => handleCell(cell)}
          >
            {planes.map(
              (plane) =>
                getPlaneCells(plane).some(
                  (pCell) =>
                    pCell.row === Math.floor(cell.id / 16) &&
                    pCell.col === cell.id % 16
                ) && <PlaneComponent key={plane.id} plane={plane} />
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10 }}>
        <button onClick={rotatePlane} disabled={selectedPlane === null}>
          旋转选中飞机
        </button>
      </div>
    </>
  );
};

export default Board;
