import * as ex from 'excalibur'
import {Resources} from "../resources.js";
import {Shape, Sprite} from "excalibur";

export class Player extends ex.Actor {
    onGround;
    startpos;
    StartHealth = 3;
    CurHealth;
    dead;
    /**
     *
     * @param x x Start coord
     * @param y y Start coord
     */
    constructor(x, y) {
        super({
            name: 'player',
            pos: ex.vec(x, y),
            collisionType: ex.CollisionType.Active,
            collider: ex.Shape.Box(18, 27, ex.Vector.Half, ex.vec(0, 0))
        });
        this.startpos = ex.vec(x, y)
        this.CurHealth = this.StartHealth
    }

    Target = Sprite.from(Resources.TargetIcon)

    onInitialize(_engine) {
        this.graphics.add('Sprite', this.Target)
        this.on('exitviewport', () => {
            this.pos = this.startpos;
        })
        this.on('collisionstart', (e) => this.onFirstCollision)
        this.on('postcollision', (e) => this.postCollision)
        document.addEventListener("joystick0button5", () => console.log('ButtonClicked'));
        document.addEventListener("joystick0left", () => this.setLeft());
        document.addEventListener("joystick0right", () => this.setRight());
        document.addEventListener("joystick0neutral", ()=> this.setNeutral());
    }

    RemoveHeart(){
        if(this.CurHealth > 0) {
            this.CurHealth--
        }else {
            this.dead = true;
        }
    }

    onFirstCollision(e) {

    }

    postCollision(e) {
        if (e.other.side === ex.Side.Top) {
            this.onGround = true
        }
    }

    goLeft = false
    goRight = false;
    setLeft(){
        this.goLeft = true
    }
    setRight(){
        this.goRight = true
    }

    setNeutral(){
        this.goLeft = false;
        this.goRight = false;
    }

    onPreUpdate(_engine, _delta) {
        this.graphics.use('Sprite')


        this.vel.x =0
        if (_engine.input.keyboard.isHeld(ex.Input.Keys.Right) || this.goRight) {
            this.vel.x = 200
        }

        if (_engine.input.keyboard.isHeld(ex.Input.Keys.Left) || this.goLeft) {
            this.vel.x = -200
        }

        if (_engine.input.keyboard.isHeld(ex.Input.Keys.Up) && this.onGround) {
            this.vel.y = -400;
            this.onGround = false;
        }

        if (this.vel.y > 0 || this.vel.y < 0) {
            this.onGround = false
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