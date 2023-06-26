import * as ex from 'excalibur'
import {Player, PlayerName} from "../Entities/Player.js";
import {Platform} from "../Core/Platform.js";
import {Enemy} from "../Core/Enemy.js";
import {Background} from "../Core/Area.js";

import {Coin} from "../Items/Coin.js";
import {Jetpack} from "../Items/Jetpack.js";
import {Rocket} from "../Items/Rocket.js";
import {Nuclear} from "../Items/Nuclear.js";
import {Star} from "../Items/Star.js";
import {chunk} from "../Core/chunk.js";
import {ElecPlatform} from "../Core/ElecPlatform.js";
import { healthbar } from '../Core/health.js';
import {BreakablePlatform} from "../Core/breakablePlatform.js";
import {BlockDestroyer} from "../Items/BlockDestroyer.js";


export class TestLevel extends ex.Scene {
    CamSet = false;
    PCam1;
    PCam2;
    curCam;
    canSpawnNewEnemy = true;
    viewableBBs = []

    onInitialize(_engine) {
        this.StartLevel()
        setInterval(()=>{
            console.log(this.viewableBBs)
        }, 1000)
    }
    setCanSpawnEnemy(ToF){
        this.canSpawnNewEnemy = ToF
    }

    onPostUpdate(_engine, _delta) {

    }

    MonsterSpawnerLoop;

    StartLevel() {
        let background = new Background()
        this.add(background)
        //starterchunk is 600 height
        //spawn first non-starter chunk at 0, -600
        //non-starter chunk is 211 height
        let nbgc = new chunk(-600)
        this.add(nbgc)

        this.player = new Player(744, 790, PlayerName.Player1, this.engine)
        this.add(this.player)
        this.PCam1 = this.player.camFollowObj
        this.curCam = this.PCam1

        this.player2 = new Player(744, 790, PlayerName.Player2, this.engine)
        this.add(this.player2)
        this.PCam2 = this.player2.camFollowObj

        let testEnemy = new Enemy(700, 700, this.engine)
        this.add(testEnemy)
        
        // let TestCoin2 = new Coin(750, 850, this.engine)
        // this.add(TestCoin2)

        let platform = new Platform(744, 857, 0, this.engine)
        this.add(platform)

        // let star = new Star(650, 800, 0, this.engine)
        // this.add(star)

        this.platforms = [];
        this.prefabs =
            [
                [1, 0, 1, 1, 0, 1, 0, 0, 1, 0],
                [0, 1, 0, 0, 1, 3, 1, 1, 0, 1],
                [1, 0, 0, 1, 1, 0, 0, 1, 1, 0],
                [0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
                [1, 1, 0, 1, 1, 0, 1, 1, 0, 0],
                [1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
                [0, 1, 0, 0, 0, 0, 1, 1, 0, 1],
                [0, 0, 1, 0, 1, 0, 1, 3, 0, 1],
                [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 1, 1, 0, 0, 0, 1, 1, 0],
                [0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
                [0, 1, 1, 0, 0, 0, 1, 1, 0, 0],
                [0, 0, 1, 0, 1, 3, 1, 1, 0, 0],
                [0, 1, 0, 0, 0, 0, 1, 1, 0, 0],
                [1, 1, 0, 0, 1, 0, 0, 0, 1, 0],
                [1, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
                [1, 1, 0, 3, 0, 0, 1, 1, 1, 1],
                [0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
                [0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
                [0, 0, 1, 0, 1, 0, 0, 1, 0, 1],
                [1, 0, 1, 0, 0, 0, 0, 1, 0, 0],
                [0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                [0, 1, 0, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 3, 0, 1, 1, 0, 0, 0, 0],
                [1, 0, 3, 0, 0, 0, 0, 1, 1, 0],
                [0, 1, 1, 0, 1, 1, 0, 0, 1, 0],
                [1, 1, 0, 0, 0, 1, 1, 0, 1, 0],
                [0, 0, 1, 1, 0, 1, 0, 1, 1, 0],
                [1, 0, 0, 1, 1, 0, 1, 0, 0, 1],
                [1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
                [0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
                [1, 0, 0, 0, 3, 0, 1, 0, 1, 1],
                [0, 0, 1, 1, 0, 1, 1, 0, 0, 1],
                [1, 1, 0, 1, 0, 0, 0, 1, 1, 0],
                [0, 1, 0, 0, 1, 1, 0, 0, 1, 1],
                [1, 0, 1, 1, 0, 0, 1, 1, 0, 0],
                [0, 1, 1, 0, 3, 1, 1, 0, 1, 0],
                [1, 0, 1, 0, 1, 1, 0, 0, 1, 0],
                [0, 1, 0, 1, 0, 1, 1, 0, 0, 1],
                [1, 0, 1, 0, 0, 1, 1, 0, 1, 0],
                [0, 1, 0, 1, 1, 0, 0, 1, 0, 1],
                [1, 2, 0, 0, 0, 1, 0, 1, 1, 0],
                [0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 1, 1, 0, 1, 1, 0, 1, 0],
                [1, 0, 0, 0, 1, 2, 0, 1, 1, 0],
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 1, 1, 0, 1, 1, 0, 1, 0],
                [1, 0, 0, 0, 1, 1, 0, 1, 1, 0],
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 1, 1, 0, 1, 0],
                [0, 0, 1, 1, 0, 1, 1, 0, 1, 0],
                [1, 0, 0, 0, 1, 1, 0, 1, 1, 0],
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
                [0, 0, 1, 0, 1, 1, 1, 0, 3, 0],
                [0, 0, 1, 1, 0, 1, 1, 0, 1, 0],
                [1, 0, 1, 0, 0, 1, 0, 1, 1, 0],
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 2, 1, 0, 1, 0],
                [0, 0, 1, 1, 0, 1, 1, 0, 1, 0],
                [1, 0, 1, 0, 2, 1, 0, 1, 1, 0],
                [1, 1, 1, 0, 2, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 1, 1, 2, 1, 0],
                [0, 0, 2, 1, 0, 1, 1, 2, 1, 0],
                [1, 0, 1, 0, 1, 1, 0, 1, 2, 0],
                [1, 1, 1, 0, 0, 0, 1, 1, 1, 0],
            ]

        this.numRows = 50;
        this.numCols = 10;

        let startarray = [1, 1, 1, 1, 0, 1, 1, 1, 1, 1]
        this.platforms.push(startarray)

        for (let row = 0; row < this.numRows; row++) {
            let random = Math.floor(Math.random() * this.prefabs.length);
            this.platforms.push(this.prefabs[random]);
            const emptyRow = Array(this.numCols).fill(0);
            this.platforms.push(emptyRow);
        }
        this.lastrow = false;
        // 1440 breedte
        for (let i = 0; i < this.platforms.length; i++) {
            let CINDEX = i;
            if (CINDEX === this.platforms.length - 3) {
                this.lastrow = true
                console.log(CINDEX + ' TRUE')
            }
            let j = 855;
            let posy = j - (i * 45)
            let curRow = this.platforms[i]
            for (let k = 0; k < curRow.length; k++) {
                let b = 1440
                let posx = (b / curRow.length) + 150 * k
                if (curRow[k] === 1) {
                    let newplatform = new Platform(posx, posy, 0, this.engine)
                    console.log(this.lastrow + 'CHECK NOW')
                    if (this.lastrow === true) {
                        console.log('Set on ')
                        newplatform.setSRTT()
                        this.lastrow = false
                    }
                    this.add(newplatform)
                } else if (curRow[k] == 0) {
                    if (Math.floor(Math.random() * 12) === 3) {
                        let newItem
                        let Rand = Math.floor(Math.random() * 100)
                        if (Rand >= 2 && Rand < 10) {
                            newItem = new Jetpack(posx, posy, this.engine)
                        } else if (Rand >= 19 && Rand < 23) {
                            newItem = new Star(posx, posy, this.engine)
                        } else if (Rand >= 23 && Rand < 25) {
                            newItem = new Nuclear(posx, posy, this.engine)
                        }else if (Rand >= 25 && Rand < 28) {
                            newItem = new BlockDestroyer(posx, posy, this.engine)
                        }
                        if (newItem !== undefined)
                            this.add(newItem)
                    }
                } else if(curRow[k] === 2){
                    let newElectPlatform = new ElecPlatform(posx, posy, this.engine)
                    if (this.lastrow === true) {
                        console.log('Set on ')
                        newElectPlatform.setSRTT()
                        this.lastrow = false
                    }
                    this.add(newElectPlatform)
                } else if(curRow[k] === 3) {
                    let newBrokoPlatform = new BreakablePlatform(posx, posy, this.engine)
                    if (this.lastrow === true) {
                        console.log('Set on ')
                        newBrokoPlatform.setSRTT()
                        this.lastrow = false
                    }
                    this.add(newBrokoPlatform)
                }
            }
        }
        this.CTAI = this.platforms.length
        this.MonsterSpawnerLoop = setInterval(()=> {
            if(this.canSpawnNewEnemy){
                this.canSpawnNewEnemy = false
                let newEnemyYVec = this.curCam.pos.y - 300
                let newEnemy = new Enemy(this.curCam.pos.x, newEnemyYVec, this.engine)
                newEnemy.on('exitviewport', e=>{
                    this.setCanSpawnEnemy(true)
                })
                newEnemy.onPostKill = () => {this.setCanSpawnEnemy(true)}
                this.add(newEnemy)
                setTimeout(()=>{
                    let secondNewEnemy = new Enemy(this.curCam.pos.x, newEnemyYVec - 250, this.engine)
                    secondNewEnemy.vel = ex.vec(-150, 0)
                    this.add(secondNewEnemy)
                    secondNewEnemy.onPostKill = () => {this.setCanSpawnEnemy(true)}
                }, 740)
            }
        }, 3500)
    }

    onDeactivate(_context) {
        clearInterval(this.MonsterSpawnerLoop)
    }

    SpawnMorePlatforms() {
        this.lastrow = false;
        for (let newrowS = 0; newrowS < this.numRows; newrowS++) {
            let random = Math.floor(Math.random() * this.prefabs.length);
            this.platforms.push(this.prefabs[random]);
            const emptyRow = Array(this.numCols).fill(0);
            this.platforms.push(emptyRow);
            console.log(this.prefabs[random])
        }
        this.CTAI -= 2
        for (this.CTAI < (this.platforms.length - 1); this.CTAI++;) {
            let j = 855;
            let posy = j - (this.CTAI * 45)
            if (this.CTAI === (this.platforms.length - 7)) {
                this.lastrow = true
            }
            console.log(this.platforms[this.CTAI - 1])
            let curRow = this.platforms[this.CTAI - 1]
            if (curRow === undefined) {
                return
            }
            for (let k = 0; k < curRow.length; k++) {
                let b = 1440
                let posx = (b / curRow.length) + 150 * k
                if (curRow[k] == 1) {
                    let newplatform = new Platform(posx, posy, 0, this.engine)
                    if (this.lastrow === true) {
                        newplatform.setSRTT()
                        this.lastrow = false
                    }
                    this.add(newplatform)
                } else if (curRow[k] == 0) {
                    if (Math.floor(Math.random() * 12) === 3) {
                        let newItem
                        let Rand = Math.floor(Math.random() * 100)
                        if (Rand >= 2 && Rand < 10) {
                            newItem = new Jetpack(posx, posy, this.engine)
                        } else if (Rand >= 19 && Rand < 23) {
                            newItem = new Star(posx, posy, this.engine)
                        } else if (Rand >= 23 && Rand < 25) {
                            newItem = new Nuclear(posx, posy, this.engine)
                        }else if (Rand >= 25 && Rand < 28) {
                            newItem = new BlockDestroyer(posx, posy, this.engine)
                        }
                        if (newItem !== undefined)
                            this.add(newItem)
                    }
                } else if(curRow[k] === 2){
                    let newElectPlatform = new ElecPlatform(posx, posy, this.engine)
                    if (this.lastrow === true) {
                        console.log('Set on ')
                        newElectPlatform.setSRTT()
                        this.lastrow = false
                    }
                    this.add(newElectPlatform)
                } else if(curRow[k] === 3) {
                    let newBrokoPlatform = new BreakablePlatform(posx, posy, this.engine)
                    if (this.lastrow === true) {
                        console.log('Set on ')
                        newBrokoPlatform.setSRTT()
                        this.lastrow = false
                    }
                    this.add(newBrokoPlatform)
                }
            }
        }
    }

    onPreUpdate(_engine, _delta) {
        _engine.CurrentGameState.P1Score = this.player.points
        _engine.CurrentGameState.P2Score = this.player2.points

        if (!this.CamSet) {
            this.camera.clearAllStrategies()
            this.camera.strategy.elasticToActor(this.curCam, 0.9, 0.9)
            this.CamSet = true
        }

        if (this.PCam1.pos.y < this.PCam2.pos.y) {
            if (this.curCam !== this.PCam1) {
                this.curCam = this.PCam1
                this.CamSet = false
            }
        } else {
            if (this.curCam !== this.PCam2) {
                this.curCam = this.PCam2
                this.CamSet = false
            }
        }

    }

}