import * as ex from 'excalibur'
import {PlayerName} from "../Entities/Player.js";


export class Endscreen extends ex.Scene {
    p1Score;
    p2Score;

    onActivate(_context) {

    }

    onInitialize(_engine) {
        let newPINPUT = new PlayerNameInput(200, -250)
        this.add(newPINPUT)
        this.p1Score = _engine.CurrentGameState.P1Score
        this.p2Score = _engine.CurrentGameState.P2Score
    }


}

export class PlayerNameInput extends ex.ScreenElement {
    PIndex;
    currentnameString = [];
    alphabet = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z'];
    curChar;

    constructor(x, y, P1O2 = PlayerName.Player1, length = 10) {
        super();
        this.PIndex = P1O2;
        this.length = length

        this.curChar = 0
    }

    onInitialize(_engine) {
        switch (this.PIndex) {
            case PlayerName.Player1:
                document.addEventListener("joystick0button5", () => this.Confirm());
                document.addEventListener("joystick0left", () => this.left());
                document.addEventListener("joystick0right", () => this.right());
                document.addEventListener("joystick0up", () => this.up())
                document.addEventListener("joystick0down", () => this.down())
                break;
            case PlayerName.Player2:
                document.addEventListener("joystick1button5", () => this.Confirm());
                document.addEventListener("joystick1left", () => this.left());
                document.addEventListener("joystick1right", () => this.right());
                document.addEventListener("joystick1up", () => this.up())
                document.addEventListener("joystick1down", () => this.down())
                break;
        }
        for (let i = 0; i < length - 1; i++) {
            let newCharLabel = new ex.Label({
                text: '',
                pos: ex.vec(x + (i * 5), y - 12),
                font: new ex.Font({
                    family: 'Press Start 2P',
                    size: 24,
                    unit: ex.FontUnit.Px,
                    color: ex.Color.White
                })
            })
            this.scene.add(newCharLabel)
            let newChar = {
                char: '',
                chardex: 0,
                label: newCharLabel
            }

            this.currentnameString.push(newChar)
        }
    }

    Confirm() {

    }

    SelectCurEditChar(numb) {
        switch (numb) {
            case 1:
                if (this.curChar === this.currentnameString.length - 1) {
                    this.curChar = 0
                } else {
                    this.curChar += 1;
                }
                break;
            case -1:
                if (this.curChar === 0) {
                    this.curChar = this.currentnameString.length - 1
                } else {
                    this.curChar -= 1;
                }
                break;
        }
    }

    EditChar(numb) {
        let thischar = this.currentnameString[this.curChar]
        if (numb < 0) {
            if (thischar.chardex === 0) {
                thischar.chardex = this.alphabet.length - 1;
            } else {
                thischar.chardex -= 1;
            }
        } else {
            if (thischar.chardex === this.alphabet.length - 1) {
                thischar.chardex = 0;
            } else {
                thischar.chardex += 1;
            }
        }
    }

    up() {
        this.EditChar(1)
    }

    down() {
        this.EditChar(-1)
    }

    left() {
        this.SelectCurEditChar(-1)
    }

    right() {
        this.SelectCurEditChar(1)
    }

    update(engine, delta) {
        for (let char in this.currentnameString) {
            this.currentnameString[char].char = this.alphabet[this.currentnameString[char].chardex]
            this.currentnameString[char].label.text = this.currentnameString[char].char
        }
    }

}