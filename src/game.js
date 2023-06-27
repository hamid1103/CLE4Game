import * as ex from 'excalibur'
import {ResourceLoader} from "./resources.js";
import {variants, labels} from '@catppuccin/palette'
import {Physics} from "excalibur";
import {TestLevel} from "./Levels/TestLevel.js";
import { Arcade } from "arcade-game"
import {DevTool} from "@excaliburjs/dev-tools"; //Using catppuccin colors found in this package. Check here for more info https://github.com/catppuccin/catppuccin
import { Platform } from './Core/Platform.js';
import {Player, PlayerName} from "./Entities/Player.js";
import {Jetpack} from "./Items/Jetpack.js";
import {Nuclear} from "./Items/Nuclear.js";
import {Rocket} from "./Items/Rocket.js";
import {Coin} from "./Items/Coin.js";
import {Star} from "./Items/Star.js";
import {Endscreen} from "./Levels/Endscreen.js";

const loader = ResourceLoader
export class Game extends ex.Engine {
    CurrentGameState = {
        P1Score: 0,
        P2Score: 0,
    }
    #arcade;
    #joystickListener;

    ItemList = [Jetpack, Nuclear, Rocket, Star]

    Enemygroup = ex.CollisionGroupManager.create('enemygroup')
    Playergroup = ex.CollisionGroupManager.create('playergroup')
    Platformgroup = ex.CollisionGroupManager.create('platformgroup')
    ItemGroup = ex.CollisionGroupManager.create('itemgroup')
    PlayersCanCollideWith = ex.CollisionGroup.collidesWith([
        this.Enemygroup,
        this.Playergroup,
        this.Platformgroup,
        this.ItemGroup
    ])

    EnemiesCanCollideWith = ex.CollisionGroup.collidesWith([
        this.Playergroup
    ])

    constructor() {
        super({
            width: 1440,
            height: 900,
            antialiasing: false,
            //fixedUpdateFps: 60,
            //suppressPlayButton: true,
            pointerScope: ex.Input.PointerScope.Canvas,
            canvasElement: document.getElementById('GC1'),
            backgroundColor: ex.Color.fromHex(variants.mocha.base.hex),
            configurePerformanceCanvas2DFallback: {
                allow: false
            }
        });
        Physics.acc = ex.vec(0, 800) //Setting gravity
        this.start(loader).then(() => {
            this.startGame();
        })
    }

    startGame(){
        this.#arcade = new Arcade(this, true, true)
        document.addEventListener("joystickcreated",  (e) => this.#joyStickFound(e))
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