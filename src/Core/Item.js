import * as ex from 'excalibur'
import {CollisionType, Sprite, Vector} from 'excalibur';
import {Resources, SpriteResources} from "../resources.js";
import {Player} from "../Entities/Player.js";

export class Item extends ex.Actor {
    ItemTexture;
    ItemSprite;
    Action;

    /**
     *
     * @param x Spawn X
     * @param y Spawn Y
     * @param texture Resources.TextureName
     */
    constructor(x, y, texture, name = 'GenericItem') {
        super({
            name: name,
            pos: ex.vec(x, y),
            collisionType: CollisionType.Passive,
            //collisionGroup: Engine.ItemGroup
        });
        this.ItemTexture = texture
        this.ItemSprite = ex.Sprite.from(this.ItemTexture)
        this.collider.useBoxCollider(this.ItemSprite.width, this.ItemSprite.height)
    }

    Seen = false

    onInitialize(_engine) {
        this.on('enterviewport', () => {
            this.Seen = true
        })
        this.on('exitviewport', () => {
            if (this.Seen) {
                this.kill()
            }
        })
        this.on('collisionstart', (e) => {
            if (e.other instanceof Player) {
                let newInvItem = new InvItem(this.name, this.ItemSprite, this.Action)
                e.other.heldItem = newInvItem
                this.kill()
            }
        })
        this.graphics.add('ItemSprite', this.ItemSprite)
        this.graphics.use('ItemSprite')
    }

}

export class InvItem {
    action;
    name;
    spritepath
    sprite;

    constructor(name, sprite, action) {
        this.action = action
        this.name = name
        this.sprite = sprite
        this.spritepath = this.sprite.image.path
    }

    useItem(player) {
        this.action(player)
    }
}