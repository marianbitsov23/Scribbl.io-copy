import React, { useState } from 'react';
import DrawingBoard from 'react-drawing-board';

export default function DrawingCanvas() {
    const [operations, setOperations] = useState([]);

    return(
        <>
            <DrawingBoard
                userId="user1" // identify for different players.
                operations={operations}
                onChange={(newOperation, afterOperation) => {
                    console.log(newOperation);
                    setOperations(afterOperation);
                }}
            />
        </>
    )
}
