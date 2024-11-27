interface PlaneShape {
  body: number[];
  wings: number[];
  tail: number[];
}

export const placePlane = (
  board: Cell[][],
  row: number,
  col: number,
  direction: "horizontal" | "vertical"
): Cell[][] => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  const planeShape: PlaneShape = {
    body: [0, -1, 1, -2, 2],
    wings: [-1, 1],
    tail: [-1, 0, 1]
  };

  // 设置机头
  newBoard[row][col].value = 2;

  // 布局机身
  planeShape.body.forEach((offset) => {
    const r = direction === "vertical" ? row + offset : row;
    const c = direction === "horizontal" ? col + offset : col;
    if (isValid(r, c, newBoard)) newBoard[r][c].value = 1;
  });

  // 布局机翼
  planeShape.wings.forEach((offset) => {
    const r = direction === "horizontal" ? row + offset : row;
    const c = direction === "vertical" ? col + offset : col;
    if (isValid(r, c, newBoard)) newBoard[r][c].value = 1;
  });

  // 布局尾部
  planeShape.tail.forEach((offset) => {
    const r = direction === "vertical" ? row + 1 : row + offset;
    const c = direction === "horizontal" ? col + 1 : col + offset;
    if (isValid(r, c, newBoard)) newBoard[r][c].value = 1;
  });

  return newBoard;
};

const isValid = (row: number, col: number, board: Cell[][]): boolean => {
  return (
    row >= 0 && col >= 0 && row < 16 && col < 16 && board[row][col].value === 0
  );
};
