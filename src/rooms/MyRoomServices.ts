import {ArraySchema} from "@colyseus/schema";

export class MyRoomServices {
    private static winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    static handleResultValidation(board: ArraySchema<string>) {
        let roundWon = false;

        for (let i = 0; i <= 7; i++) {
            const winCondition = this.winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                return true;
            }
        }
        if (!board.includes('')) return "tie";
        return false;
    }
}