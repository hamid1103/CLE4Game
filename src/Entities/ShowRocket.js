import {Actor} from "excalibur";
import {Resources} from "../resources.js";

export class ShowRocket extends Actor {
    constructor(player) {
        super();
        this.graphics.use(Resources.Rocket.toSprite())
        this.player = player
        this.pos = player.pos
    }
    onPreUpdate(_engine, _delta) {
        this.pos = this.player.pos
    }
}