import * as ex from 'excalibur'
import {CollisionType, Sprite, Vector} from 'excalibur';
import {Resources, SpriteResources} from "../resources.js";

export class Item extends ex.Actor {
    ItemTexture;
    ItemSprite;

    /**
     *
     * @param x Spawn X
     * @param y Spawn Y
     * @param texture Resources.TextureName
     */
    constructor(x, y, texture, Engine) {
        super({
            pos: ex.vec(x, y),
            collisionType: CollisionType.Passive,
            collisionGroup: Engine.ItemGroup
        });
        this.ItemTexture = texture
        this.ItemSprite = ex.Sprite.from(this.ItemTexture)
        this.collider.useBoxCollider(this.ItemSprite.width, this.ItemSprite.height)
    }

    onInitialize(_engine) {
        this.on('collisionstart', (e) => {
            console.log('Collision')
            if (e.other.hasTag('Player')) {
                console.log('Collided with player')
                this.Action(e.other);
                this.kill()
            }
        })
        this.graphics.add('ItemSprite', this.ItemSprite)
        this.graphics.use('ItemSprite')
    }

    Action(player) {

    }

}