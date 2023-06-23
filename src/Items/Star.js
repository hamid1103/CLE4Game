import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";
import {ShowStar} from "../Entities/ShowStar.js";

export class Star extends Item{
    constructor(x, y, Engine) {
        super(x, y, Resources.Star, Engine);
    }

    //Only executes when a player collides.
    Action = (player) => {
        player.setStar(true)
        let ShowSR = new ShowStar(player)
        player.scene.add(ShowSR)
        setTimeout(()=>{
            player.setStar(false)
            ShowSR.kill()
        })
    }
}