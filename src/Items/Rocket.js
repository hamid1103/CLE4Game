import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";
// import { ShowRocket } from "../Entities/ShowRocket.js";

export class Rocket extends Item{
    constructor(x, y, Engine) {
        super(x, y, Resources.Rocket, Engine);
    }

    //Only executes when a player collides.
    Action(player) {
        player.setFlyRocket(true)
        setTimeout(()=>{
            player.setFlyRocket(false)
        }, 1500)
    }
}