'use client';

import React, { useState, useEffect } from "react";
import Chessboard from "../ui/chessboard";
import { initialClassicalSetup } from "../utils/InitialSetup";
import { PieceProps } from "../ui/piece";

export default function PositionManager() {

    const [gamePosition, setGamePosition] = useState(initialClassicalSetup);
    const [selectedPiece, setSelectedPiece] = useState<{position: string, piece?: PieceProps } | null>(null);

    const handleSquareClick = (position: string, piece?: PieceProps ) => {
        if (selectedPiece && selectedPiece.piece && !piece) {
            const newGamePosition = { ...gamePosition };
            newGamePosition[position] = selectedPiece.piece;
            delete newGamePosition[selectedPiece.position];
            setGamePosition(newGamePosition);
            setSelectedPiece(null);
        }
        else if (piece) {
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