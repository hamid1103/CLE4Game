import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";
import {Actor} from "excalibur";
import {ShowStar} from "../Entities/ShowStar.js";

export class Star extends Item{
    constructor(x, y, Engine) {
        super(x, y, Resources.Star, Engine);
    }

    //Only executes when a player collides.
    Action = (player) => {
        player.setStar(true)
        player.heldItem = undefined
        let newSR = new ShowStar(player)
        player.setShowSR(newSR)
        this.scene.add(newSR)
    }
}