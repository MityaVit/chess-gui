"use client";

import React, { useCallback, useState } from 'react';
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
    const lastMove = useSelector((state: RootState) => state.game.moveHistory.slice(-1)[0]);
    
    const [selectedPiece, setSelectedPiece] = useState<{ position: number; piece?: PieceProps } | null>(null);

    const handleSquareClick = useCallback((position: number, piece?: PieceProps) => {
        if (selectedPiece) {
            const { position: fromPosition, piece: selected } = selectedPiece;

            if (selected) {
                if (piece && selected.color === piece.color) {
                    setSelectedPiece({ position, piece });
                    return;
                }

                const toPosition = position;

                if (isMoveValid(fromPosition, toPosition, selected, gamePosition, lastMove)) {
                    const newGamePosition = { ...gamePosition };

                    // En passant logic
                    if (selected.type === 'pawn' && lastMove && lastMove.piece.type === 'pawn' && selected.color !== lastMove.piece.color) {
                        const isWhite = selected.color === 'white';
                        const capturePosition = isWhite ? toPosition - 1 : toPosition + 1;
                        delete newGamePosition[capturePosition];
                    }

                    // Move the piece
                    newGamePosition[toPosition] = selected;
                    delete newGamePosition[fromPosition];

                    if (!piece || selected.color !== piece.color) {
                        dispatch(MAKE_MOVE({ from: fromPosition, to: toPosition, newGamePosition }));
                    }
                    setSelectedPiece(null);
                } else {
                    console.log('not valid');
                    setSelectedPiece(null);
                }
            }
        } else if (!selectedPiece && piece && piece.color === currentTurn) {
            setSelectedPiece({ position, piece });
        }
    }, [selectedPiece, gamePosition, currentTurn]);

    return (
        <div>
            <Chessboard gamePosition={gamePosition} onSquareClick={handleSquareClick} />
        </div>
    );
};

export default PositionManager;