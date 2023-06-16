import * as ex from 'excalibur'
import {CollisionType, Vector} from 'excalibur';
import {Player} from '../Entities/Player.js';
import {Resources, SpriteResources} from "../resources.js";
import {TestLevel} from "../Levels/TestLevel.js";


export class Platform extends ex.Actor {
    PixelplatformSprite = ex.Sprite.from(Resources.Pixelplatform)

    constructor(x, y, type, Engine) {
        super({
            collisionType: CollisionType.Passive,
            pos: ex.vec(x, y),
            collisionGroup: Engine.Platformgroup
        });
        this.startpos = ex.vec(x, y)
    }

    onInitialize(engine) {
        if (this.type === 0) {
            this.graphics.use(this.PixelplatformSprite)
            this.on('collisionstart', (event) => this.hitSomething(event));
            this.on('postcollision', (e) => {
                if (e.other instanceof Player) {
                    this.PlayersOnIt = true
                }
            })
            this.on('collisionend', (e) => {
                if (e.other instanceof Player) {
                    if (!this.PlayersOnIt)
                        this.body.collisionType = ex.CollisionType.Passive
                    console.log('player ' + e.other.name + ' left')
                }
            })
            this.scale = new Vector(0.2, 0.2);
        } else {
            this.graphics.use(this.PixelplatformSprite)
            this.on('collisionstart', (event) => this.hitSomething(event))
            this.on('postcollision', (e) => {
                if (e.other instanceof Player) {
                    this.PlayersOnIt = true
                }
            })
            this.on('collisionend', (e) => {
                if (e.other instanceof Player) {
                    if (!this.PlayersOnIt)
                        this.body.collisionType = ex.CollisionType.Passive
                    console.log('player left')
                }
            })
            this.scale = new Vector(1.5, 1.8);
        }

        this.collider.useBoxCollider(this.PixelplatformSprite.width, this.PixelplatformSprite.height);
    }


    hitSomething(event) {
        if (event.other instanceof Player) {
            if (event.other.pos.y < this.pos.y) {
                this.body.collisionType = ex.CollisionType.Fixed;
            }
        }

    }

}


