import * as ex from 'excalibur'
import {Resources} from "../resources.js";


import {ExitViewPortEvent, Shape, Sprite, Vector} from "excalibur";

import {CameraFollow} from "./CameraFollow.js";
import {healthbar} from '../Core/health.js';
import {Endscreen} from "../Levels/Endscreen.js";

export var PlayerName = {
    Player1: 'Player1',
    Player2: 'Player2'
}

export class Player extends ex.Actor {
    engine;
    onGround;
    ShowSR;
    startpos;
    StartHealth = 3;
    points = 0;
    CurHealth;
    dead;
    playername;
    heldItem;
    invisibility = false;

    camFollowObj;

    JetPacking = false

    FlyRocket = false

    Star = false
    amount = 0;

    

    curPlayerKeys;

    shootDirectionY;
    canShoot;
    isShooting;
    counter;

    PlayerTexture
    pointsLabel;

    hpb;



    /**
     *
     * @param x x Start coord
     * @param y y Start coord
     * @param playername of type PlayerName/ Determins what control scheme to use.
     */
    constructor(x, y, playername = PlayerName.Player1, Engine) {
        super({
            name: playername,
            pos: ex.vec(x, y),
            collisionType: ex.CollisionType.Active,
            collisionGroup: Engine.Playergroup
        });
        this.startpos = ex.vec(x, y)
        this.CurHealth = this.StartHealth
        this.hpb = new healthbar(this.CurHealth)
        this.playername = playername
        this.scale = ex.vec(2.5, 2.5)
        this.PlayerTexture = Sprite.from(Resources.TargetIcon)
        this.collider.useBoxCollider(this.PlayerTexture.width, this.PlayerTexture.height)
        this.camFollowObj = new CameraFollow(this);

        this.pointsLabel = new ex.Label({
            text: `points: ${this.points}`,
            pos: ex.vec(400, 700),
            font: new ex.Font(20, "sans-serif"),
            color: ex.Color.White
        });
    }

    remEvs(){
        switch (this.playername) {
            case PlayerName.Player1:
                document.removeEventListener("joystick0button4", () => this.useItem());
                document.removeEventListener("joystick0button5", () => this.setUp());
                document.removeEventListener("joystick0left", () => this.setLeft());
                document.removeEventListener("joystick0right", () => this.setRight());
                document.removeEventListener("joystick0neutral", () => this.setNeutral());
                break;
            case PlayerName.Player2:
                document.removeEventListener("joystick1button4", () => this.useItem());
                document.removeEventListener("joystick1button5", () => this.setUp());
                document.removeEventListener("joystick1left", () => this.setLeft());
                document.removeEventListener("joystick1right", () => this.setRight());
                document.removeEventListener("joystick1neutral", () => this.setNeutral());
                break;
        }
    }

    onInitialize(engine) {
        this.engine = engine
        this.MakeItemHolderUI()
        this.scene.add(this.camFollowObj)
        this.scene.add(this.pointsLabel);

        switch (this.playername) {
            case PlayerName.Player1:
                this.curPlayerKeys = {
                    Left: ex.Input.Keys.Left,
                    Right: ex.Input.Keys.Right,
                    Up: ex.Input.Keys.Up
                }
                document.addEventListener("joystick0button4", () => this.useItem());
                document.addEventListener("joystick0button5", () => this.setUp());
                document.addEventListener("joystick0left", () => this.setLeft());
                document.addEventListener("joystick0right", () => this.setRight());
                document.addEventListener("joystick0neutral", () => this.setNeutral());
                break;
            case PlayerName.Player2:
                this.PlayerTexture = Sprite.from(Resources.TargetIcon2)
                this.curPlayerKeys = {
                    Left: ex.Input.Keys.A,
                    Right: ex.Input.Keys.D,
                    Up: ex.Input.Keys.W
                }
                document.addEventListener("joystick1button4", () => this.useItem());
                document.addEventListener("joystick1button5", () => this.setUp());
                document.addEventListener("joystick1left", () => this.setLeft());
                document.addEventListener("joystick1right", () => this.setRight());
                document.addEventListener("joystick1neutral", () => this.setNeutral());
                break;

        }

        this.graphics.add('Sprite', this.PlayerTexture)
        this.on('exitviewport', () => {
            this.pos = this.startpos;
        })
        this.on('collisionstart', (e) => this.onFirstCollision(e))
        this.on('postcollision', (e) => this.postCollision(e))
        this.on('ExitCollision', (e) => {
            this.exitCollision(e)
        })
        this.addTag('Player')
        this.graphics.use('Sprite')

        this.addChild(this.hpb)


  
        this.on("exitviewport", (event) => {

            //teleport on other player instead random location on the viewport

            if (this.playername === PlayerName.Player1) {
                this.pos = this.scene.player2.pos;
            }else{
                this.pos = this.scene.player.pos
            }

            // the player get minus 1 hearth
            this.RemoveHeart();


        })




  

        









     

    }

    ItemHolderUI

    MakeItemHolderUI() {
        let overlay = document.getElementById('overlay')
        this.ItemHolderUI = document.createElement('div')
        this.ItemHolderUI.classList.add('ItemHolder')
        this.ItemHolderUI.IMGHold = document.createElement('img')
        this.ItemHolderUI.appendChild(this.ItemHolderUI.IMGHold)
        switch (this.playername) {
            case PlayerName.Player1:
                this.ItemHolderUI.id = 'p1'
                this.ItemHolderUI.IMGHold.id = 'IMGP1'
                break;
            case PlayerName.Player2:
                this.ItemHolderUI.id = 'p2'
                this.ItemHolderUI.IMGHold.id = 'IMGP2'
                break;
        }
        overlay.appendChild(this.ItemHolderUI)
    }


    RemoveHeart() {
        if (this.invisibility == false) {

            if (this.CurHealth > 0) {

                this.CurHealth--
                this.hpb.onHealthUpdate(3 - this.CurHealth)
            } else {
                this.dead = true;
                let endsc = new Endscreen();
                this.scene.engine.addScene('ED', endsc)
                this.scene.engine.goToScene('ED')
            }
        }

    }

    useItem() {
        if (this.heldItem !== undefined)
            if (this.heldItem.useItem !== undefined)
                this.heldItem.useItem(this)
    }


    onFirstCollision(e) {

    }

    setJetPacking(ToF = true) {
        this.JetPacking = ToF
    }

    setFlyRocket(ToF = true) {
        this.FlyRocket = ToF
    }

    setStar(ToF = true) {
        this.Star = ToF
    }

    setInvisibility(ToF = true) {
        this.invisibility = ToF
    }

    exitCollision(e) {
        this.onGround = false
    }

    postCollision(e) {
        if (e.side === ex.Side.Bottom) {
            this.onGround = true
        }
    }

    goLeft = false
    goRight = false;
    goUp = false

    setLeft() {
        this.goLeft = true
    }

    setRight() {
        this.goRight = true
    }

setShowSR(SR){
    this.ShowSR = SR
}

    setNeutral() {
        this.goLeft = false;
        this.goRight = false;
    }

    setUp() {
        if(!this.goUp)
        this.goUp = true
    }
    jumps = 0

    onPreUpdate(_engine, _delta) {

        if (this.heldItem !== undefined) {
            this.ItemHolderUI.IMGHold.style.display = 'block'
            this.ItemHolderUI.IMGHold.src = this.heldItem.spritepath
        } else {
            this.ItemHolderUI.IMGHold.src = ''
            this.ItemHolderUI.IMGHold.style.display = 'hidden'
        }

        this.pointsLabel.text = `points: ${this.points}`

        this.vel.x = 0
        if (_engine.input.keyboard.isHeld(this.curPlayerKeys.Right) || this.goRight) {
            this.vel.x = 200
        }

        if (_engine.input.keyboard.isHeld(this.curPlayerKeys.Left) || this.goLeft) {
            this.vel.x = -200
        }
        if (this.JetPacking) {
            this.vel.y = -400
            return
        }
        if (this.FlyRocket) {
            this.vel.y = -800
            return
        }

     
        if ((_engine.input.keyboard.isHeld(this.curPlayerKeys.Up) || this.goUp) ) {
            if (this.goUp) {
                this.goUp = false
            }
            if(this.onGround){
                this.vel.y = -400;
                this.onGround = false;
                
            } else if(this.Star === true){
                    if(!this.onGround)
                        this.jumps++
                    this.vel.y = -400;
                }
        }

        if(this.jumps === 1){
            this.jumps = 0
            this.Star = false
            this.ShowSR.kill()
        }

        if (_engine.input.keyboard.wasPressed(ex.Input.Keys.C)) {
            this.useItem()
        }

        if (this.onGround) {
            if (this.vel.x > 0) {

            } else if (this.vel.x < 0) {

            } else if (this.vel.x === 0) {

            }
        } else {
            if (this.vel.y > 0 || this.vel.y < 0) {

            }
        }
        this.pointsLabel.pos.y = this.pos.y
    }

    

}