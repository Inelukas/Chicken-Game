import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { matrixes, positions } from "../../lib/data";

const StyledMatrix = styled.div`
  display: grid;
  place-content: center;
  width: 100vw;
  height: 100vh;
  font-size: 40px;
  overflow: hidden;

  @media (max-width: 1200px) {
    font-size: 36px;
  }

  @media (max-width: 900px) {
    font-size: 30px;
  }

  @media (max-width: 600px) {
    padding-bottom: 40%;
    font-size: 22px;
  }
`;

const StyledButtons = styled.div`
  position: absolute;
  right: 10vw;
  bottom: 40vh;
  font-size: 50px;

  div {
    position: relative;
    width: 150px;
    height: 150px;

    button {
      width: 50px;
      height: 50px;
      position: absolute;
    }

    .up {
      top: 0px;
      left: 50px;
    }

    .down {
      bottom: 0px;
      left: 50px;
    }

    .left {
      top: 50px;
      left: 0px;
    }

    .right {
      top: 50px;
      right: 0px;
    }
  }

  @media (max-width: 1200px) {
    transform: scale(0.8);
    right: 2vw;
  }

  @media (max-width: 900px) {
    transform: scale(0.9);
    bottom: 7vh;
    right: 5vw;
  }

  @media (max-width: 600px) {
    transform: scale(1.2);
    bottom: 23vh;
    right: 37vw;
  }
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
  const chickenSpeed = level > 0 ? 80 : 100;
  const [map, setMap] = useState(matrixes[level]);
  const [currentPlayerPosition, setCurrentPlayerPosition] = useState(
    positions[level].player
  );
  const [currentChickenPositions, setCurrentChickenPositions] = useState({
    chicken1: positions[level].chicken1,
    chicken2: positions[level].chicken2,
    chicken3: positions[level].chicken3 || null,
  });

  const [currentChickenLastPositions, setCurrentChickenLastPositions] =
    useState({
      chicken1: { x: -1, y: -1 },
      chicken2: { x: -1, y: -1 },
      chicken3: { x: -1, y: -1 },
    });

  const matrixRef = useRef(null);

  useEffect(() => {
    if (matrixRef.current) {
      matrixRef.current.focus();
    }
  }, [level, gameOn]);

  useEffect(() => {
    function handleBlur() {
      if (matrixRef.current) {
        matrixRef.current.focus();
      }
    }

    const playerElement = matrixRef.current;
    if (playerElement) {
      playerElement.addEventListener("blur", handleBlur);
    }

    return () => {
      if (playerElement) {
        playerElement.removeEventListener("blur", handleBlur);
      }
    };
  }, []);

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
    setCurrentChickenPositions({
      chicken1: positions[level].chicken1,
      chicken2: positions[level].chicken2,
      chicken3: positions[level]?.chicken3 || null,
    });
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
    const resetInterval = setInterval(() => {
      setCurrentChickenLastPositions({
        chicken1: { x: -1, y: -1 },
        chicken2: { x: -1, y: -1 },
        chicken3: { x: -1, y: -1 },
      });
    }, 2000);

    return () => clearInterval(resetInterval);
  }, []);

  useEffect(() => {
    function moveChicken(
      chickenPosition,
      setChickenPosition,
      chickenLastPosition,
      setChickenLastPosition
    ) {
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
        } else if (
          newChickenPosition.x !== chickenLastPosition.x ||
          newChickenPosition.y !== chickenLastPosition.y
        ) {
          setChickenLastPosition({
            x: chickenPosition.x,
            y: chickenPosition.y,
          });
          setChickenPosition(newChickenPosition);
        }
      }
    }
    if (gameOn) {
      const moveChickenInterval = setInterval(() => {
        moveChicken(
          currentChickenPositions.chicken1,
          (newPos) =>
            setCurrentChickenPositions((prevPositions) => ({
              ...prevPositions,
              chicken1: newPos,
            })),
          currentChickenLastPositions.chicken1,
          (lastPos) =>
            setCurrentChickenLastPositions((prevLastPos) => ({
              ...prevLastPos,
              chicken1: lastPos,
            }))
        );
        moveChicken(
          currentChickenPositions.chicken2,
          (newPos) =>
            setCurrentChickenPositions((prevPositions) => ({
              ...prevPositions,
              chicken2: newPos,
            })),
          currentChickenLastPositions.chicken2,
          (lastPos) =>
            setCurrentChickenLastPositions((prevLastPos) => ({
              ...prevLastPos,
              chicken2: lastPos,
            }))
        );
        if (currentChickenPositions.chicken3) {
          moveChicken(
            currentChickenPositions.chicken3,
            (newPos) =>
              setCurrentChickenPositions((prevPositions) => ({
                ...prevPositions,
                chicken3: newPos,
              })),
            currentChickenLastPositions.chicken3,
            (lastPos) =>
              setCurrentChickenLastPositions((prevLastPos) => ({
                ...prevLastPos,
                chicken3: lastPos,
              }))
          );
        }
      }, chickenSpeed);

      return () => {
        clearInterval(moveChickenInterval);
      };
    }
  }, [
    currentChickenPositions,
    currentPlayerPosition,
    currentChickenLastPositions,
    lost,
    won,
    gameOn,
    lives,
    chickenSpeed,
    onLost,
    onLoseLife,
  ]);

  function handleMove(event) {
    const currentKey = typeof event === "string" ? event : event.key;

    const possibleMove = checkPossibleMove(currentKey, currentPlayerPosition);
    if (possibleMove) {
      const newPlayerPosition = getNewPosition(
        currentKey,
        currentPlayerPosition
      );

      if (
        (newPlayerPosition.x === currentChickenPositions.chicken1.x &&
          newPlayerPosition.y === currentChickenPositions.chicken1.y) ||
        (newPlayerPosition.x === currentChickenPositions.chicken2.x &&
          newPlayerPosition.y === currentChickenPositions.chicken2.y) ||
        (currentChickenPositions.chicken3 &&
          newPlayerPosition.x === currentChickenPositions.chicken3.x &&
          newPlayerPosition.y === currentChickenPositions.chicken3.y)
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
    <>
      <StyledMatrix ref={matrixRef} tabIndex={0} onKeyDown={handleMove}>
        {map.map((row, index) => {
          return (
            <p key={index}>
              {row.map((cell, cellIndex) => {
                if (
                  (index === currentChickenPositions.chicken1.y &&
                    cellIndex === currentChickenPositions.chicken1.x) ||
                  (index === currentChickenPositions.chicken2.y &&
                    cellIndex === currentChickenPositions.chicken2.x) ||
                  (currentChickenPositions.chicken3 &&
                    index === currentChickenPositions.chicken3.y &&
                    cellIndex === currentChickenPositions.chicken3.x)
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
      <StyledButtons>
        <div>
          <button className="up" onClick={() => handleMove("ArrowUp")}>
            ↑
          </button>
          <button className="left" onClick={() => handleMove("ArrowLeft")}>
            ←
          </button>
          <button className="right" onClick={() => handleMove("ArrowRight")}>
            →
          </button>
          <button className="down" onClick={() => handleMove("ArrowDown")}>
            ↓
          </button>
        </div>
      </StyledButtons>
    </>
  );
}
