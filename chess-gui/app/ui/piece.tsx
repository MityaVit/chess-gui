'use client';

import React from "react";
import Image from "next/image";

export interface PieceProps {
    type: string,
    color: 'white' | 'black',
}

export const Piece: React.FC<PieceProps> = ({ type, color }) => {
    return(
        <div>
            <Image
                src={`/pieces/${type}-${color}.png`}
                width={75}
                height={75}
                alt={`${color} ${type} piece`}
             />
        </div>
    )
}
