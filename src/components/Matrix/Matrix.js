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
`;

export function Matrix({
  level,
  onLevelClear,
  gameOn,
  onLoseLife,
  lives,
  onGameOn,
  onLost,
  onWon,
  lost,
  won,
}) {
  const chickenSpeed = level > 0 ? 100 : 200;
  const [map, setMap] = useState(matrixes[level]);
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState(
    positions[level].player
  );
  const [currentChickenPosition, setCurrentChickenPosition] = useState(
    positions[level].chicken1
  );
  const [currentChickenPosition2, setCurrentChickenPosition2] = useState(
    positions[level].chicken2
  );
  const [currentChickenPosition3, setCurrentChickenPosition3] = useState(
    positions[level]?.chicken3
  );

  useEffect(() => {
    document.querySelector("#matrix").focus();
  }, [level, gameOn]);

  function checkPossibleMove(currentDirection, currentPosition) {
    if (!gameOn) {
      return;
    }
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

  function resetPositions() {
    setMap(matrixes[level]);
    setCurrentPlayerPosition(positions[level].player);
    setCurrentChickenPosition(positions[level].chicken1);
    setCurrentChickenPosition2(positions[level].chicken2);
    setCurrentChickenPosition3(positions[level]?.chicken3 || null);
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
          if (lives > 1) {
            resetPositions();
            onLoseLife();
          } else {
            onLost();
          }
        } else {
          setChickenPosition(newChickenPosition);
        }
      }
    }
    if (gameOn) {
      const moveChickenInterval = setInterval(() => {
        moveChicken(currentChickenPosition, setCurrentChickenPosition);
        moveChicken(currentChickenPosition2, setCurrentChickenPosition2);
        if (currentChickenPosition3) {
          moveChicken(currentChickenPosition3, setCurrentChickenPosition3);
        }
      }, chickenSpeed);

      return () => {
        clearInterval(moveChickenInterval);
      };
    }
  }, [
    currentChickenPosition,
    currentChickenPosition2,
    currentChickenPosition3,
    currentPlayerPosition,
    lost,
    won,
    gameOn,
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
        if (lives > 1) {
          resetPositions();
          onLoseLife();
        } else {
          onLost();
        }
      } else {
        setMap((prevMap) => {
          const newMap = prevMap.map((row) => [...row]);
          newMap[currentPlayerPosition.y][currentPlayerPosition.x] = 3;
          newMap[newPlayerPosition.y][newPlayerPosition.x] = 5;
          return newMap;
        });

        setCurrentPlayerPosition(newPlayerPosition);
      }
    }
  }

  useEffect(() => {
    setMap(matrixes[level]);
    resetPositions();
  }, [level]);

  useEffect(() => {
    if (map.every((row) => !row.includes(2))) {
      if (level === 2) {
        onWon();
      } else {
        onLevelClear();
        onGameOn();
      }
    }
  }, [map]);

  return (
    <StyledMatrix id="matrix" tabIndex={0} onKeyDown={handleMove}>
      {map.map((row, index) => {
        return (
          <p key={index}>
            {row.map((cell, cellIndex) => {
              if (
                (index === currentChickenPosition.y &&
                  cellIndex === currentChickenPosition.x) ||
                (index === currentChickenPosition2.y &&
                  cellIndex === currentChickenPosition2.x) ||
                (currentChickenPosition3 &&
                  index === currentChickenPosition3.y &&
                  cellIndex === currentChickenPosition3.x)
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
      })}
    </StyledMatrix>
  );
}
