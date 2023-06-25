import * as ex from 'excalibur'
import {Item} from "../Core/Item.js";
import {Resources} from "../resources.js";
import {Actor} from "excalibur";
import {ShowNuclear} from "../Entities/ShowNuclear";

export class Nuclear extends Item{
    constructor(x, y) {
        super(x, y, Resources.Nuclear);
    }
    Action = (player)=> {
        player.setInvisibility(true)
        player.heldItem = undefined
        let nuke = new ShowNuclear(player)
        player.scene.add(nuke)
        setTimeout(()=>{
            player.setInvisibility(false)
            nuke.kill()
        }, 2000)
    }
}