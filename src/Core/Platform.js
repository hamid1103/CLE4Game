import * as ex from 'excalibur'
import {CollisionType, Vector} from 'excalibur';
import {Player} from '../Entities/Player.js';
import {Resources, SpriteResources} from "../resources.js";
import {TestLevel} from "../Levels/TestLevel.js";


export class Platform extends ex.Actor {
    PixelplatformSprite = ex.Sprite.from(Resources.Pixelplatform)
    PlayersOnIt = {};

    constructor(x, y, type, Engine) {
        super({
            collisionType: CollisionType.Passive,
            pos: ex.vec(x, y),
            collisionGroup: Engine.Platformgroup
        });
        this.body.group = Engine.Platformgroup;
        this.startpos = ex.vec(x, y)
    }

    onInitialize(engine) {
        if (this.type === 0) {
            this.graphics.use(this.PixelplatformSprite)
            this.on('collisionstart', (event) => {
                this.hitSomething(event)
                if(event.other instanceof Player){
                    this.PlayersOnIt[event.other.name] = event.other
                }
            });
            this.on('collisionend', (e) => {
                if (e.other instanceof Player) {
                    delete this.PlayersOnIt[e.other.name]
                    if(Object.keys(this.PlayersOnIt).length === 0){
                        this.body.collisionType = ex.CollisionType.Passive
                    }
                    console.log('player ' + e.other.name + ' left')
                }
            })
            this.scale = new Vector(0.2, 0.2);
        } else {
            this.graphics.use(this.PixelplatformSprite)
            this.on('collisionstart', (event) => {
                this.hitSomething(event)
                if(event.other instanceof Player){
                    this.PlayersOnIt[event.other.name] = event.other
                }
            });
            this.on('collisionend', (e) => {
                if (e.other instanceof Player) {
                    delete this.PlayersOnIt[e.other.name]
                    if(Object.keys(this.PlayersOnIt).length === 0){
                        this.body.collisionType = ex.CollisionType.Passive
                    }
                    console.log('player ' + e.other.name + ' left')
                }
            })
            this.on('precollision', (e)=>{
                if(e.other instanceof Player && e.side === ex.Side.Bottom){
                    e.other.body.collisionType = CollisionType.Passive
                    setTimeout(()=>{
                        e.other.body.collisionType = ex.CollisionType.Active
                    }, 25)
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


