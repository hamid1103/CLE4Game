import { Actor, SpriteSheet, Vector } from "excalibur";
import { Resources } from "../resources";

export class healthbar extends Actor {
    spritesheet;
    state;

    constructor(curHealth) {
        super();
        this.state = curHealth;
        this.hindex = 3 -curHealth;
    }

    onInitialize() {
        this.spritesheet = SpriteSheet.fromImageSource({
            image: Resources.Health,
            grid: {
                rows: 4,
                columns: 1,
                spriteWidth: 432,
                spriteHeight: 144
            }
        });

        this.pos = new Vector(700, 700);
        this.graphics.use(this.spritesheet.getSprite(0, this.hindex));
    }

    onHealthUpdate(updatedHealth) {
        this.graphics.use(this.spritesheet.getSprite(0, updatedHealth));
    }
}
