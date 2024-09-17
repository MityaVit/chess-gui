"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { MAKE_MOVE } from '../lib/features/gameSlice';
import Chessboard from '../ui/chessboard';
import { isMoveValid } from './MoveValidator';
import { PieceProps } from '../ui/piece';

const PositionManager: React.FC = () => {
    const dispatch = useDispatch();
    const gamePosition = useSelector((state: RootState) => state.game.gamePosition); 
    const currentTurn = useSelector((state: RootState) => state.game.currentTurn);
    const [selectedPiece, setSelectedPiece] = useState<{ position: number; piece?: PieceProps } | null>(null);

    const handleSquareClick = (position: number, piece?: PieceProps) => {
        // If a piece is selected
        if (selectedPiece && selectedPiece.piece) {
            const from = selectedPiece.position;
            const to = position;

            if (isMoveValid(from, to, selectedPiece.piece, gamePosition)) {
                const newGamePosition = { ...gamePosition };

                // If a square is empty or there is a piece of another color
                if (!piece || selectedPiece.piece.color !== piece.color) {
                    newGamePosition[to] = selectedPiece.piece;  // Selected piece goes to the new square
                    delete newGamePosition[from];  // The former square becomes empty

                    // Updating the state of the game
                    dispatch(MAKE_MOVE({ from, to, newGamePosition }));
                }
                setSelectedPiece(null);  // Deselecting the piece
            } else {
                console.log('not valid');
                setSelectedPiece(null);
            }
        }
        // If no piece selected
        else if (!selectedPiece && piece && piece.color === currentTurn) {
            // Checking whose turn it is prior to selecting a piece
            setSelectedPiece({ position, piece });
        }
    };

    // Temporary here for whatever reason
    useEffect(() => {
        if (selectedPiece) {
            console.log(`${selectedPiece.piece?.type}, ${selectedPiece.position}`);
        }
    }, [selectedPiece]);

    return (
        <div>
            <Chessboard gamePosition={gamePosition} onSquareClick={handleSquareClick} />
        </div>
    );
};

export default PositionManager;
