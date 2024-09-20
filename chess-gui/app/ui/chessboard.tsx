'use client';

import React, { useMemo } from "react";
import { Square } from "./square";
import { DARK, LIGHT } from "../utils/colors";
import { Piece } from "./piece";
import { generalAxis } from "../types/axis";
import GameSetup from "../types/gameSetup";
import { PieceProps } from "./piece";

interface ChessboardProps {
    gamePosition: GameSetup;
    onSquareClick: (position: number, piece?: PieceProps) => void;
}

const Chessboard = React.memo(({gamePosition, onSquareClick} : ChessboardProps) => {
    const board = useMemo(() => {
        const squares = [];
        const axisLength = generalAxis.length;
        for (let i = axisLength - 1; i >= 0; i--) {
            for (let j = 0; j < axisLength; j++) {
                const isDark = (i + j) % 2 === 1;
                const squareColor = isDark ? DARK : LIGHT;
                const position = generalAxis[j] * 10 + generalAxis[i];
                const piece = gamePosition[position];
                const handleClick = () => onSquareClick(position, piece);

                squares.push(
                    <Square
                        key={`${i}-${j}`}
                        color={squareColor}
                        position={position}
                        onClick={handleClick}
                    >
                        {piece && (
                            <Piece
                                type={piece.type}
                                color={piece.color}
                            />
                        )}
                    </Square>
                );
            }
        }
        return squares;
    }, [gamePosition, onSquareClick]);

    

    return (
        <div className="grid grid-cols-8 relative shadow-xl ring-1 ring-gray-900/5 mx-auto my-auto w-[600px] h-[600px]">
            {board}
        </div>
    );
});

export default Chessboard;
