'use client';

import React from "react";
import Image from "next/image";

export interface PieceProps {
    type: 'pawn' | 'rook' | 'king' | 'queen' | 'knight' | 'bishop',
    color: 'white' | 'black',
}

export const Piece: React.FC<PieceProps> = React.memo(({ type, color }) => {
    return(
        <div>
            <Image
                src={`/pieces/${type}-${color}.png`}
                width={75}
                height={75}
                alt={`${color} ${type} piece`}
             />
        </div>
    );
});
