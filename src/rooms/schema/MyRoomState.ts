import {Schema, Context, ArraySchema, type} from "@colyseus/schema";

export class MyRoomState extends Schema {
    @type(['string'])
    board: ArraySchema<string>

    @type('string')
    currentPlayer = 'X'
    @type('string')
    enemyPlayer = 'O';
    @type('string')
    PLAYERX_WON = 'PLAYERX_WON'
    @type('string')
    PLAYERO_WON = 'PLAYERO_WON'
    @type('string')
    TIE = 'TIE'
    @type('string')
    result = ''

    @type('boolean')
    isGameActive = true


    constructor() {
        super();

        this.board = new ArraySchema(
            '', '', '',
            '', '', '',
            '', '', ''
        )
        this.result = ''
        this.currentPlayer = 'X'
        this.enemyPlayer = 'O'
    }
}
