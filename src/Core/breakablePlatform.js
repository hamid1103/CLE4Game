import * as ex from 'excalibur'
import {CollisionType, Vector} from "excalibur";
import {Resources} from "../resources.js";
import {Player} from "../Entities/Player.js";

export class BreakablePlatform extends ex.Actor {
    PixelplatformSprite = ex.Sprite.from(Resources.BreakablePlatformTexture)
    PlayersOnIt = {};
    YZINDEX;
    SpawnRowTrigger = false;
    SRTT = false
    Seen = false;

    constructor(x, y, Engine) {
        super({
            collisionType: CollisionType.Passive,
            pos: ex.vec(x, y),
            collisionGroup: Engine.Platformgroup
        });
        this.body.group = Engine.Platformgroup;
        this.startpos = ex.vec(x, y)
        this.engine = Engine
    }

    setSRTT() {
        this.SRTT = true
    }

    viewIndex;
    onInitialize(engine) {
        this.on('enterviewport', () => {
            console.log('I BEEN SEEN and im ' + this.SRTT)
            this.Seen = true
            if (this.SRTT === true) {
                this.scene.SpawnMorePlatforms();
                console.log('SPAWNING PLATFORMS')
            }
            this.viewIndex = this.scene.viewableBBs.push(this)
        })
        this.on('exitviewport', () => {
            if (this.Seen)
                this.kill()
            delete this.scene.viewableBBs[this.viewIndex]
        })

        this.graphics.use(this.PixelplatformSprite)
        this.on('collisionstart', (event) => {
            this.hitSomething(event)
            if (event.other instanceof Player) {
                this.PlayersOnIt[event.other.name] = event.other
            }
        });
        this.on('collisionend', (e) => {
            if (e.other instanceof Player) {
                delete this.PlayersOnIt[e.other.name]
                if (this.ToDestroy === true) {
                 this.kill()
                }
            }
        })
        this.on('postcollision', (e)=> {
            if(e.other instanceof Player && this.PlayersOnIt[e.other.name].getFirstCol !== true){
                if(e.side === ex.Side.Top){
                    this.PlayersOnIt[e.other.name].getFirstCol = true
                    this.ToDestroy = true
                }
            }

        })
        this.on('precollision', (e) => {
            if (e.other instanceof Player && e.side === ex.Side.Bottom) {
                e.other.body.collisionType = CollisionType.Passive
                setTimeout(() => {
                    e.other.body.collisionType = ex.CollisionType.Active
                }, 25)
            }
        })
        this.scale = new Vector(1.5, 1.8);

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