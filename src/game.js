import * as ex from 'excalibur'
import {ResourceLoader} from "./resources.js";
import {variants, labels} from '@catppuccin/palette'
import {Physics} from "excalibur";
import {TestLevel} from "./Levels/TestLevel.js";
import { Arcade } from "arcade-game"
import {DevTool} from "@excaliburjs/dev-tools"; //Using catppuccin colors found in this package. Check here for more info https://github.com/catppuccin/catppuccin
import { Platform } from './Core/Platform.js';
import {Player, PlayerName} from "./Entities/Player.js";


const loader = ResourceLoader
export class Game extends ex.Engine {
    state
    #arcade;
    #joystickListener;
    constructor() {
        super({
            width: 1440,
            height: 900,
            antialiasing: false,
            fixedUpdateFps: 60,
            //suppressPlayButton: true,
            pointerScope: ex.Input.PointerScope.Canvas,
            canvasElement: document.getElementById('GC1'),
            backgroundColor: ex.Color.fromHex(variants.mocha.base.hex)
        });
        Physics.acc = ex.vec(0, 800) //Setting gravity
        this.start(loader).then(() => {
            this.startGame();
        })
    }

    startGame(){
        this.#arcade = new Arcade(this, true, true)
        this.#joystickListener = (e) => this.#joyStickFound(e)
        document.addEventListener("joystickcreated",  this.#joystickListener)

        const testLevel = new TestLevel()
        this.addScene('TL', testLevel)
        this.goToScene('TL')

    }

    #joyStickFound(e) {
        let joystick = this.#arcade.Joysticks[e.detail]

        // debug, this shows you the names of the buttons when they are pressed
        for (const buttonEvent of joystick.ButtonEvents) {
            document.addEventListener(buttonEvent, () => console.log(buttonEvent))
        }

        this.update();
    }

    onPreUpdate(_engine, _delta) {
        for (let joystick of this.#arcade.Joysticks) {
            joystick.update()
        }
    }

}

const newGame = new Game();
//const devtool = new DevTool(newGame);