import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";
import {Actor} from "excalibur";
import {ShowNuclear} from "../Entities/ShowNuclear";

export class Nuclear extends Item{
    constructor(x, y) {
        super(x, y, Resources.Nuclear);
    }

    //Only executes when a player collides.
    Action(player) {
        let nuke = new ShowNuclear(player)
        player.scene.add(nuke)

        setTimeout(() => {
            player.invisibility = true
            nuke.kill()
        }, 2000);
        
    }
}