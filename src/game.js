import * as ex from 'excalibur'
import {ResourceLoader} from "./resources.js";
import {variants, labels} from '@catppuccin/palette'
import {Physics} from "excalibur";
import {TestLevel} from "./Levels/TestLevel.js"; //Using catppuccin colors found in this package. Check here for more info https://github.com/catppuccin/catppuccin

const loader = ResourceLoader
export class Game extends ex.Engine {
    constructor() {
        super({
            displayMode: ex.DisplayMode.FitScreenAndFill,
            antialiasing: false,
            fixedUpdateFps: 60,
            //suppressPlayButton: true,
            pointerScope: ex.Input.PointerScope.Canvas,
            canvasElement: document.getElementById('GC'),
            backgroundColor: ex.Color.fromHex(variants.mocha.base.hex)
        });
        Physics.acc = ex.vec(0, 800) //Setting gravity
        this.start(loader).then(() => {
            this.startGame();
        })
    }

    startGame(){
        const testLevel = new TestLevel()
        this.addScene('TL', testLevel)
        this.goToScene('TL')
    }

}

const newGame = new Game();
