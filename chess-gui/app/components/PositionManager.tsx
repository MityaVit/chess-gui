'use client';

import React, { useState, useEffect } from "react";
import Chessboard from "../ui/chessboard";
import { initialClassicalSetup } from "../utils/InitialSetup";
import { PieceProps } from "../ui/piece";
import { isMoveValid } from "./MoveValidator";

export default function PositionManager() {

    const [gamePosition, setGamePosition] = useState(initialClassicalSetup);
    const [selectedPiece, setSelectedPiece] = useState<{position: number, piece?: PieceProps } | null>(null);

    const handleSquareClick = (position: number, piece?: PieceProps ) => {
        if (selectedPiece && selectedPiece.piece) {
            const from = selectedPiece.position;
            const to = position;
            if (isMoveValid(from, to, selectedPiece.piece, gamePosition)) {
                const newGamePosition = { ...gamePosition };

                if (!piece || selectedPiece.piece.color !== piece.color) {
                    newGamePosition[position] = selectedPiece.piece;
                    delete newGamePosition[from];
                    setGamePosition(newGamePosition);
                }

                setSelectedPiece(null);
            }
            else {
                console.log('not valid')
                setSelectedPiece(null);
            }
        }
        else if (!selectedPiece && piece) {
            setSelectedPiece({position, piece});
        }
    }

    useEffect(() => {
        if (selectedPiece) {
            console.log(`${selectedPiece.piece?.type}, ${selectedPiece.position}`);
        }
    }, [selectedPiece])

    return(
        <div>
            <Chessboard gamePosition={gamePosition} onSquareClick={handleSquareClick} />
        </div>
    )
}