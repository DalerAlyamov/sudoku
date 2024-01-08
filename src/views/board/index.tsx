import React from "react";
import classNames from "classnames";
import styles from "./board.module.scss";

const mission =
  "420003081001000003078015069000600035257000946000009008190284000745306002000150600";

interface ICell {
  x: number;
  y: number;
  active: boolean;
  selected: boolean;
  value: string;
}

const initialCells: ICell[] = [];
for (let y = 0, i = 0; y < 9; y++)
  for (let x = 0; x < 9; x++, i++)
    initialCells.push({
      x,
      y,
      selected: false,
      active: false,
      value: mission[i],
    });

const Board = () => {
  const boardRef = React.useRef<HTMLDivElement>(null);

  const [boardWidth, setBoardWidth] = React.useState<number>();
  const [selectedCell, setSelectedCell] = React.useState([0, 0]);
  const [selectedGroup, setSelectedGroup] = React.useState(0);

  const [cells, setCells] = React.useState<ICell[]>(initialCells);
  const [groups, setGroups] = React.useState<React.ReactNode[]>([]);

  React.useEffect(() => {
    const newCellGroup = [];
    for (let i = 0, k = 0; i < 3; i++)
      for (let j = 0; j < 3; j++, k++) {
        const groupCells = [
          cells[27 * i + 0 + j * 3],
          cells[27 * i + 1 + j * 3],
          cells[27 * i + 2 + j * 3],
          cells[27 * i + 9 + j * 3],
          cells[27 * i + 10 + j * 3],
          cells[27 * i + 11 + j * 3],
          cells[27 * i + 18 + j * 3],
          cells[27 * i + 19 + j * 3],
          cells[27 * i + 20 + j * 3],
        ];
        newCellGroup.push(
          <CellGroup
            key={k}
            active={Boolean(groupCells.find((cell) => cell.selected))}
          >
            {groupCells.map((cell) => (
              <Cell
                group={k}
                cell={cell}
                onClick={(k) => {
                  setSelectedGroup(k);
                  setSelectedCell([cell.x, cell.y]);
                }}
              />
            ))}
          </CellGroup>
        );
      }
    setGroups(newCellGroup);
  }, [selectedGroup, selectedCell, cells]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          setCells((prev) =>
            prev.map((cell, index) => ({
              ...cell,
              value:
                initialCells[index].value !== "0"
                  ? initialCells[index].value
                  : cell.x === selectedCell[0] && cell.y === selectedCell[1]
                  ? e.key
                  : cell.value,
            }))
          );
          break;
      }
    };

    setCells((prev) =>
      prev.map((cell) => ({
        ...cell,
        selected: selectedCell[0] === cell.x && selectedCell[1] === cell.y,
        active: selectedCell[0] === cell.x || selectedCell[1] === cell.y,
      }))
    );

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell]);

  React.useEffect(() => {
    setBoardWidth(boardRef.current?.clientHeight);
  }, [boardRef]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          setSelectedCell((prev) => [Math.max(prev[0] - 1, 0), prev[1]]);
          break;
        case "ArrowRight":
          setSelectedCell((prev) => [Math.min(prev[0] + 1, 8), prev[1]]);
          break;
        case "ArrowUp":
          setSelectedCell((prev) => [prev[0], Math.max(prev[1] - 1, 0)]);
          break;
        case "ArrowDown":
          setSelectedCell((prev) => [prev[0], Math.min(prev[1] + 1, 8)]);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={boardRef}
      className={styles.board}
      style={{ width: boardWidth + "px" }}
    >
      {groups}
    </div>
  );
};

const Cell = ({
  cell,
  group,
  onClick,
}: {
  cell: ICell;
  group: number;
  onClick: (k: number) => void;
}) => (
  <div
    className={classNames(
      styles.cell,
      cell.selected && styles.selected,
      cell.active && styles.active
    )}
    onClick={() => onClick(group)}
  >
    {cell.value !== "0" ? cell.value : ""}
  </div>
);

const CellGroup = ({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) => (
  <div className={classNames(styles.cellGroup, active && styles.active)}>
    {children}
  </div>
);

export default Board;
