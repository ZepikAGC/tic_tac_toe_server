import {Room, Client} from "colyseus";
import {MyRoomState} from "./schema/MyRoomState";
import {MyRoomServices} from './MyRoomServices';

export class MyRoom extends Room<MyRoomState> {
    onCreate(options: any) {
        this.setState(new MyRoomState());

        this.onMessage("tile-click", (client, message) => {
            if (this.state.board[message] === '') {
                this.state.board[message] = this.state.currentPlayer;
                let result = MyRoomServices.handleResultValidation(this.state.board);
                if (result) {
                    switch (result) {
                        case true: {
                            this.state.result = this.state.currentPlayer === 'X' ? this.state.PLAYERX_WON : this.state.PLAYERO_WON;
                            break;
                        }
                        case 'tie': {
                            this.state.result = this.state.TIE
                            break;
                        }
                    }
                    this.state.isGameActive = false;
                } else {
                    let tmp = this.state.currentPlayer
                    this.state.currentPlayer = this.state.enemyPlayer;
                    this.state.enemyPlayer = tmp;
                }
            } else {
                //todo: ошибка ввода - ячейка занята
            }
        })

        this.onMessage("reset", (client, message) => {
            this.setState(new MyRoomState());
        })

    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
