'use client';

import React from "react";
import { Square } from "./square";
import { DARK, LIGHT } from "../utils/colors";
import { Piece } from "./piece";
import { verticalAxis, horizontalAxis } from "../utils/axis";

interface ChessboardProps {
    gamePosition: { [key: string]: { type: string, color: 'white' | 'black' } };
    onSquareClick: (position: string, piece?: { type: string, color: 'white' | 'black'}) => void;
}

export default function Chessboard({gamePosition, onSquareClick} : ChessboardProps) {
    let board = [];

    for (let i = verticalAxis.length - 1; i >= 0; i--) {
        for (let j = 0; j < horizontalAxis.length; j++) {
            const isBlack = (i + j) % 2 === 1;
            const squareColor = isBlack ? DARK : LIGHT;
            const position = `${horizontalAxis[j]}${verticalAxis[i]}`;
            const piece = gamePosition[position];

            board.push(
                <Square
                    key={`${i}-${j}`}
                    color={squareColor}
                    position={position}
                    onClick={() => onSquareClick(position, piece)}
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

    return (
        <div className="grid grid-cols-8 relative shadow-xl ring-1 ring-gray-900/5 mx-auto my-auto w-[600px] h-[600px]">
            {board}
        </div>
    );
}
