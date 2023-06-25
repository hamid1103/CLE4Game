import * as ex from 'excalibur'
import {CollisionType, Vector} from 'excalibur';
import {Player} from '../Entities/Player.js';
import {Resources, SpriteResources} from "../resources.js";
import {Coin} from "../Items/Coin.js";


export class ElecPlatform extends ex.Actor {
    PixelplatformSprite = ex.Sprite.from(Resources.ElecPlatSprite)
    PlayersOnIt = {};
    YZINDEX;
    SpawnRowTrigger = false;
    SRTT = false

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

    Seen = false

    setSRTT() {
        this.SRTT = true
    }

    onInitialize(engine) {
        this.on('enterviewport', () => {
            console.log('I BEEN SEEN and im ' + this.SRTT)
            this.Seen = true
            if (this.SRTT === true) {
                this.scene.SpawnMorePlatforms();
                console.log('SPAWNING PLATFORMS')
            }
        })
        this.on('exitviewport', () => {
            if (this.Seen)
                this.kill()
        })

        this.graphics.use(this.PixelplatformSprite)
        this.on('collisionstart', (event) => {
            this.hitSomething(event)
            if (event.other instanceof Player) {
                this.PlayersOnIt[event.other.name] = event.other
            }
        });
        this.on('postcollision', e =>{
            if(e.other instanceof Player){
                if(e.side === ex.Side.Top && this.PlayersOnIt[e.other.name].gotFirstCol !== true){
                    e.other.RemoveHeart()
                }
                this.PlayersOnIt[e.other.name].gotFirstCol = true
            }
        })
        this.on('collisionend', (e) => {
            if (e.other instanceof Player) {
                this.PlayersOnIt[e.other.name].gotFirstCol = false
                delete this.PlayersOnIt[e.other.name]
                if (Object.keys(this.PlayersOnIt).length === 0) {
                    this.body.collisionType = ex.CollisionType.Passive
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
        this.scale = new Vector(0.75, 0.5);

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


