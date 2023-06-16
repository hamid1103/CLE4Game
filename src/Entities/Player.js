import * as ex from 'excalibur'
import {Resources} from "../resources.js";
import {Shape, Sprite} from "excalibur";
import {CameraFollow} from "./CameraFollow.js";

export var PlayerName = {
    Player1: 'Player1',
    Player2: 'Player2'
}

export class Player extends ex.Actor {
    onGround;
    startpos;
    StartHealth = 3;
    points = 0;
    CurHealth;
    dead;
    playername;

    camFollowObj;

    JetPacking = false

    curPlayerKeys;

    PlayerTexture

    /**
     *
     * @param x x Start coord
     * @param y y Start coord
     * @param playername of type PlayerName/ Determins what control scheme to use.
     */
    constructor(x, y, playername = PlayerName.Player1) {
        super({
            name: 'player',
            pos: ex.vec(x, y),
            collisionType: ex.CollisionType.Active,
        });
        this.startpos = ex.vec(x, y)
        this.CurHealth = this.StartHealth
        this.playername = playername
        this.scale = ex.vec(2.5, 2.5)
        this.PlayerTexture = Sprite.from(Resources.TargetIcon)
        this.collider.useBoxCollider(this.PlayerTexture.width, this.PlayerTexture.height)
        this.camFollowObj = new CameraFollow(this);
    }


    onInitialize(_engine) {

        this.addChild(this.camFollowObj)

        switch (this.playername){
            case PlayerName.Player1:
                this.curPlayerKeys = {
                    Left:ex.Input.Keys.Left,
                    Right:ex.Input.Keys.Right,
                    Up:ex.Input.Keys.Up
                }
                document.addEventListener("joystick0button5", () => this.setUp());
                document.addEventListener("joystick0left", () => this.setLeft());
                document.addEventListener("joystick0right", () => this.setRight());
                document.addEventListener("joystick0neutral", () => this.setNeutral());
                break;
            case PlayerName.Player2:
                this.curPlayerKeys = {
                    Left:ex.Input.Keys.A,
                    Right:ex.Input.Keys.D,
                    Up:ex.Input.Keys.W
                }
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
        this.on('ExitCollision', (e) =>{this.exitCollision(e)
        })
        this.addTag('Player')
        this.graphics.use('Sprite')

    }

    RemoveHeart() {
        if (this.CurHealth > 0) {
            this.CurHealth--
        } else {
            this.dead = true;
        }
    }

    onFirstCollision(e) {

    }
    setJetPacking(ToF = true){
        this.JetPacking = ToF
    }

    exitCollision(e){
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
    setNeutral() {
        this.goLeft = false;
        this.goRight = false;
    }
    setUp(){
        if(this.onGround)
            this.goUp = true
    }

    onPreUpdate(_engine, _delta) {
        this.vel.x = 0
        if (_engine.input.keyboard.isHeld(this.curPlayerKeys.Right) || this.goRight) {
            this.vel.x = 200
        }

        if (_engine.input.keyboard.isHeld(this.curPlayerKeys.Left) || this.goLeft) {
            this.vel.x = -200
        }
        if(this.JetPacking){
            this.vel.y =- 400
            return
        }

        if ((_engine.input.keyboard.isHeld(this.curPlayerKeys.Up) || this.goUp) && this.onGround) {
            this.vel.y = -400;
            this.onGround = false;
            if(this.goUp){
                this.goUp = false
            }
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

    }

}