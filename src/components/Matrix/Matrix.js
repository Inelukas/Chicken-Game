import { useEffect, useState } from "react";
import styled from "styled-components";
import { matrixes, positions } from "../../lib/data";

const StyledMatrix = styled.div`
  display: grid;
  position: absolute;
  place-content: center;
  width: 100%;
  height: 100%;
  font-size: 40px;
  background: green;

  .game-end {
    display: grid;
    place-content: center;
    font-size: 70px;
  }
`;

export function Matrix({ level, onLevelClear }) {
  const chickenSpeed = 100;
  const [map, setMap] = useState(matrixes[level - 1]);

  const [currentPlayerPosition, setCurrentPlayerPosition] = useState(
    positions[level - 1].player
  );
  const [currentChickenPosition, setCurrentChickenPosition] = useState(
    positions[level - 1].chicken1
  );
  const [currentChickenPosition2, setCurrentChickenPosition2] = useState(
    positions[level - 1].chicken2
  );

  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);

  useEffect(() => {
    setMap(matrixes[level - 1]);
    setCurrentPlayerPosition(positions[level - 1].player);
    setCurrentChickenPosition(positions[level - 1].chicken1);
    setCurrentChickenPosition2(positions[level - 1].chicken2);
    document.querySelector("#matrix").focus();
  }, [level]);

  function checkPossibleMove(currentDirection, currentPosition) {
    return (
      (currentDirection === "ArrowRight" &&
        map[currentPosition.y][currentPosition.x + 1] !== 1) ||
      (currentDirection === "ArrowLeft" &&
        map[currentPosition.y][currentPosition.x - 1] !== 1) ||
      (currentDirection === "ArrowUp" &&
        map[currentPosition.y - 1][currentPosition.x] !== 1) ||
      (currentDirection === "ArrowDown" &&
        map[currentPosition.y + 1][currentPosition.x] !== 1)
    );
  }

  function getNewPosition(currentDirection, currentPosition) {
    return currentDirection === "ArrowRight"
      ? { x: currentPosition.x + 1, y: currentPosition.y }
      : currentDirection === "ArrowLeft"
      ? { x: currentPosition.x - 1, y: currentPosition.y }
      : currentDirection === "ArrowUp"
      ? { x: currentPosition.x, y: currentPosition.y - 1 }
      : currentDirection === "ArrowDown"
      ? { x: currentPosition.x, y: currentPosition.y + 1 }
      : null;
  }

  useEffect(() => {
    function moveChicken(chickenPosition, setChickenPosition) {
      if (lost || won) return;

      const randomNumber = Math.floor(Math.random() * 4);
      const directionMap = ["ArrowRight", "ArrowUp", "ArrowLeft", "ArrowDown"];
      const currentChickenDirection = directionMap[randomNumber];

      const possibleMove = checkPossibleMove(
        currentChickenDirection,
        chickenPosition
      );

      if (possibleMove) {
        const newChickenPosition = getNewPosition(
          currentChickenDirection,
          chickenPosition
        );

        if (
          newChickenPosition.x === currentPlayerPosition.x &&
          newChickenPosition.y === currentPlayerPosition.y
        ) {
          setLost(true);
        } else {
          setChickenPosition(newChickenPosition);
        }
      }
    }
    const moveChickenInterval = setInterval(() => {
      moveChicken(currentChickenPosition, setCurrentChickenPosition);
      moveChicken(currentChickenPosition2, setCurrentChickenPosition2);
    }, chickenSpeed);

    return () => {
      clearInterval(moveChickenInterval);
    };
  }, [
    currentChickenPosition,
    currentChickenPosition2,
    currentPlayerPosition,
    lost,
    won,
  ]);

  function handleMove(event) {
    const currentKey = event.key;

    const possibleMove = checkPossibleMove(currentKey, currentPlayerPosition);

    if (possibleMove) {
      const newPlayerPosition = getNewPosition(
        currentKey,
        currentPlayerPosition
      );

      if (
        (newPlayerPosition.x === currentChickenPosition.x &&
          newPlayerPosition.y === currentChickenPosition.y) ||
        (newPlayerPosition.x === currentChickenPosition2.x &&
          newPlayerPosition.y === currentChickenPosition2.y)
      ) {
        setLost(true);
      } else {
        setMap((prevMap) => {
          const newMap = [...prevMap];
          newMap[currentPlayerPosition.y][currentPlayerPosition.x] = 3;
          newMap[newPlayerPosition.y][newPlayerPosition.x] = 5;
          return newMap;
        });

        setCurrentPlayerPosition(newPlayerPosition);
      }
    }
  }

  useEffect(() => {
    if (map.every((row) => !row.includes(2))) {
      if (level === 2) {
        setWon(true);
      } else {
        onLevelClear();
      }
    }
  }, [map]);

  return (
    <StyledMatrix id="matrix" tabIndex={0} onKeyDown={handleMove}>
      {!lost && !won ? (
        map.map((row, index) => {
          return (
            <p key={index}>
              {row.map((cell, cellIndex) => {
                if (
                  (index === currentChickenPosition.y &&
                    cellIndex === currentChickenPosition.x) ||
                  (index === currentChickenPosition2.y &&
                    cellIndex === currentChickenPosition2.x)
                ) {
                  return " 🐓 ";
                }
                return cell === 1
                  ? " 🟫 "
                  : cell === 2
                  ? " 💊 "
                  : cell === 3
                  ? " 🟩 "
                  : " 🌝 ";
              })}
            </p>
          );
        })
      ) : (
        <div className="game-end">{lost ? "🐓Game Over🐓" : "Game Won 🌝"}</div>
      )}
    </StyledMatrix>
  );
}
