"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../lib/store';
import { MAKE_MOVE } from '../lib/features/gameSlice';
import Chessboard from '../ui/chessboard';
import { isMoveValid } from './MoveValidator';
import { PieceProps } from '../ui/piece';

const PositionManager: React.FC = () => {
    const dispatch = useDispatch();
    const gamePosition = useSelector((state: RootState) => state.game.gamePosition); // Current state of the game: pieces and their positions
    const currentTurn = useSelector((state: RootState) => state.game.currentTurn); // State to control whose turn it is
    const [selectedPiece, setSelectedPiece] = useState<{ position: number; piece?: PieceProps } | null>(null);
    const lastMove = useSelector((state: RootState) => state.game.moveHistory.slice(-1)[0]);

    const handleSquareClick = (position: number, piece?: PieceProps) => {
        // If a piece is selected
        if (selectedPiece && selectedPiece.piece) {
            if (piece && selectedPiece.piece.color === piece.color) {
                setSelectedPiece({position, piece});
                return;
            }
            const from = selectedPiece.position;
            const to = position;

            if (isMoveValid(from, to, selectedPiece.piece, gamePosition, lastMove)) {
                const newGamePosition = { ...gamePosition };

                // En passant logic
                if (selectedPiece.piece.type === 'pawn' &&
                    lastMove &&
                    lastMove.piece.type === 'pawn' &&
                    selectedPiece.piece.color !== lastMove.piece.color) {
                        const isWhite = selectedPiece.piece.color === 'white';
                        const capturePosition = isWhite ? to - 1 : to + 1;
                        delete newGamePosition[capturePosition];
                    }

                newGamePosition[to] = selectedPiece.piece;
                delete newGamePosition[from];

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

    return (
        <div>
            <Chessboard gamePosition={gamePosition} onSquareClick={handleSquareClick} />
        </div>
    );
};

export default PositionManager;
